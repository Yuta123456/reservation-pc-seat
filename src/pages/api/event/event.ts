// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { EventDetail } from "@/app/event/mockdata";

type Data = {
  events: EventDetail[];
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();

  // TODO: 条件決める
  const events: EventDetail[] = await prisma.event.findMany();
  if (!events) {
    return res.status(500).end();
  }
  return res.status(200).json({ events });
}
