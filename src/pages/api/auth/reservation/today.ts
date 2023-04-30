// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { ReservationScheduleWithAuth } from "@/components/reservation_table/ReservationTable";
import { supabase } from "../supabase";
import { prisma } from "../../prisma";
import { logger } from "@/utils/logger";
type Data = {
  reservationSchedule: ReservationScheduleWithAuth[][];
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await getHandler(req, res, prisma)
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
    return res.status(401).end();
  }
  const today = new Date(new Date().setHours(0, 0, 0, 0));

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

  const reservationList: ReservationScheduleWithAuth[] = todayReservation.map(
    (res) => {
      return {
        id: res.id,
        seat: res.seat,
        period: res.period,
        studentIds: res.ReservationStudent.map((rs) => rs.student.studentId),
      };
    }
  );

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
