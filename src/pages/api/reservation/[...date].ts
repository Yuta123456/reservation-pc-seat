// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { ReservationSchedule } from "@/components/reservation_table/ReservationTable";
import { utcToZonedTime } from "date-fns-tz";

type Data = {
  reservationSchedule: ReservationSchedule[][];
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();
  await getHandler(req, res, prisma)
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
 * 予約API GET
 * 今日一日の予定を返す
 * @param {string} - 日付
 * @return {ReservationSchedule} -
 */
const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  prisma: PrismaClient
) => {
  const { date } = req.query;
  if (date === undefined || typeof date === "string" || date.length !== 3) {
    return res.status(400).end();
  }
  const [year, monthIndex, day] = date;
  // ここはTimeZoneの変換がいらない。リクエストの時点で日本時間になっているから
  const today = new Date(Number(year), Number(monthIndex), Number(day));

  // 今日にされた予約を全て取得
  const todayReservation = await prisma.reservation.findMany({
    where: {
      date: {
        gte: today,
      },
    },
    select: {
      id: true,
      seat: true,
      period: true,
      ReservationStudent: {
        select: {
          student: {
            select: {
              studentId: true,
            },
          },
        },
      },
    },
  });

  const reservationList: ReservationSchedule[] = todayReservation.map((res) => {
    return {
      id: res.id,
      seat: res.seat,
      period: res.period,
      studentIds: res.ReservationStudent.map((rs) => rs.student.studentId),
    };
  });

  // TODO: マジックナンバー削除。PC席の個数
  const reservationSchedule = [...Array(5)].map((_, i) => {
    const reservationInSeatI = reservationList.filter((tr) => tr.seat === i);
    reservationInSeatI.sort((a, b) => {
      if (a.period > b.period) {
        return 1;
      } else {
        return -1;
      }
    });
    return reservationInSeatI;
  });

  // TODO: データの形式が絶対に正しくない
  res.status(200).json({ reservationSchedule });
};
