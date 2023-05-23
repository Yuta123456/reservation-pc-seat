// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Reservation, Student } from "@prisma/client";
import { utcToZonedTime } from "date-fns-tz";
import { supabase } from "./supabase";
import { prisma } from "../prisma";
import { logger } from "@/utils/logger";

type Data = {
  reservation: Reservation;
};

type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const jwt = req.headers.authorization?.slice(7);
  if (typeof jwt !== "string") {
    return res.status(400).end();
  }

  if (supabase === "" || supabase === undefined) {
    return res.status(500).end();
  }
  const {
    data: { user },
  } = await supabase.auth.getUser(jwt);

  if (!user) {
    // accessTokenが無効
    return res.status(401).json({ message: "再度やり直して下さい" });
  }

  let handler = undefined;
  switch (req.method) {
    case "POST":
      handler = postHandler(req, res, prisma);
      break;
    case "DELETE":
      handler = deleteHandler(req, res, prisma);
    default:
      break;
  }
  if (handler === undefined) {
    console.warn("No handler for this method.");
    res.status(400).end();
    return;
  }
  await handler
    .then(async () => {
      logger(req.method, req.body, 200, "Log");
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      logger(req.method, req.body + e?.message, 500, "Error");
      await prisma.$disconnect();
      res.status(500).end();
    });
}

/**
 * 予約API POST
 * @param {number} seat 取りたい席
 * @param {number} period 時間帯
 * @param {string[]} studentIds 使う生徒の台帳番号または学籍番号
 */
const postHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>,
  prisma: PrismaClient
) => {
  const {
    seat,
    period,
    studentsIds,
  }: { seat: string; period: string; studentsIds: string[] } = JSON.parse(
    req.body
  );

  const reservationsFromIds = await Promise.all(
    studentsIds.map(async (id: string) => {
      const today = new Date(new Date().setHours(0, 0, 0, 0));
      const reservationFromId = await prisma.reservationStudent.findMany({
        where: {
          student: {
            is: {
              studentId: id,
            },
          },
          reservation: {
            date: {
              gte: today,
            },
          },
        },
        select: {
          reservationId: true,
        },
      });
      return reservationFromId.length >= 2;
    })
  );
  // もし、予約者の中に一人でも今日予約を二回行っている人がいた場合
  if (reservationsFromIds.some((v) => v)) {
    res.status(400).json({ message: "予約制限に達しています" });
    return;
  }
  // TODO: 既に予約がある場合はこれを弾く必要がある。
  const reservationResult = await prisma.reservation.create({
    data: {
      seat: Number(seat),
      period: Number(period),
      date: utcToZonedTime(new Date(), "Asia/Tokyo"),
    },
  });

  // 予約IDを取得
  const reservationId = reservationResult.id;

  // NOTE: studentsIdsに入っているそれぞれの値が
  //       1. StudentTableに無い場合
  //       2. 学籍番号 | 台帳番号の場合
  //       がある
  //       そのため、全てを学籍番号に統一

  // TODO: 関数実装
  // const studentIdsOnly = studentsIds.map((id) => convert(id));

  // 現状は、全て学籍番号だとして話を進める

  // 学籍番号が無い場合には、新しく作る。
  // TODO: await 出来てなさそう
  const query = studentsIds.map((id: string) => {
    return prisma.student.upsert({
      where: {
        studentId: id,
      },
      update: {},
      create: {
        studentId: id,
      },
    });
  });

  // queryをトランザクションで実行することで高速化。ちょっとよく分からない。
  const students: Student[] = await prisma.$transaction([...query]);
  await prisma.reservationStudent.createMany({
    data: students.map(({ id }) => {
      return {
        reservationId,
        studentId: id,
      };
    }),
  });
  res.status(200).json({ reservation: reservationResult });
};

/*
 * 予約削除API
 */
const deleteHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>,
  prisma: PrismaClient
) => {
  const { id, deleteKey }: { id: string; deleteKey: string } = JSON.parse(
    req.body
  );
  // 消そうとした予約が、deleteKeyの物を含んでいるか？あるいは管理者か？
  const isAdmin = process.env.ADMIN_KEY === deleteKey;
  const studentIds = await prisma.reservationStudent
    .findMany({
      where: {
        reservationId: Number(id),
      },
      select: {
        student: {
          select: {
            studentId: true,
          },
        },
      },
    })
    .then((res) => {
      return res.map((r) => r.student.studentId);
    });

  if (!isAdmin && !studentIds.includes(deleteKey)) {
    res.status(400).json({
      message: "キーが間違っています",
    });
    return;
  }
  // 中間テーブルから削除
  const reservationStudentQuery = prisma.reservationStudent.deleteMany({
    where: {
      reservationId: Number(id),
    },
  });

  // 予約の削除
  const reservationQuery = prisma.reservation.delete({
    where: {
      id: Number(id),
    },
  });

  // トランザクション実行
  await prisma.$transaction([reservationStudentQuery, reservationQuery]);
  res.status(200).end();
};
