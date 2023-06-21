// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ReservationScheduleWithAuth } from "@/components/reservation_table/ReservationTable";
import { prisma } from "../../prisma";
type Data = {
  reservationSchedule?: ReservationScheduleWithAuth[][];
  message?: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(500).end();
  }
  const { id, editKey }: { id: string; editKey: string } = JSON.parse(req.body);
  const isAdmin = process.env.ADMIN_KEY === editKey;
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

  if (!isAdmin && !studentIds.includes(editKey)) {
    res.status(400).json({
      message: "キーが間違っています",
    });
    return;
  }
  res.status(200).end();
}
