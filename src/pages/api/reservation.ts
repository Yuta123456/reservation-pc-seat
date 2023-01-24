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
  switch (req.method) {
    case "POST":
      const prisma = new PrismaClient();
      postHandler(req, res, prisma)
        .then(async () => {
          await prisma.$disconnect();
        })
        .catch(async (e) => {
          console.error(e);
          await prisma.$disconnect();
          res.status(500).end();
        });
      break;
    // case "GET"
    default:
      console.warn("No handler for this method.");
      res.status(400).end();
      break;
  }
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
