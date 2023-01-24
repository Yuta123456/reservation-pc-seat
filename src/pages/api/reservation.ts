// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Reservation, Student } from "@prisma/client";
import { utcToZonedTime } from "date-fns-tz";

type Data = {
  reservation: Reservation;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();
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
  handler
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      res.status(500).end();
    });
}

/**
 * 予約API POST
 * @param {number} seat 取りたい席
 * @param {number} period 時間帯
 * @param {string[]} studentIds 使う生徒の台帳番号または学籍番号
 * @return {string} - [Hello + name]という形式で戻る。
 */
const postHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  prisma: PrismaClient
) => {
  const { seat, period, studentsIds } = JSON.parse(req.body);
  // TODO: 既に予約がある場合はこれを弾く必要がある。
  const reservationResult = await prisma.reservation.create({
    data: {
      seat,
      period,
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
  res: NextApiResponse<Data>,
  prisma: PrismaClient
) => {
  const { id } = JSON.parse(req.body);

  // 中間テーブルから削除
  const reservationStudentQuery = prisma.reservationStudent.deleteMany({
    where: {
      reservationId: id,
    },
  });

  // 予約の削除
  const reservationQuery = prisma.reservation.delete({
    where: {
      id,
    },
  });

  // トランザクション実行
  await prisma.$transaction([reservationStudentQuery, reservationQuery]);
  res.status(200);
};
