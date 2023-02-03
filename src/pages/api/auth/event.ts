// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "./supabase";
import { PrismaClient } from "@prisma/client";
import { EventDetail } from "@/app/event/mockdata";

type Data = {
  event: EventDetail;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name, description, startDate, endDate } = JSON.parse(req.body);
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

  const prisma = new PrismaClient();

  const event = await prisma.event.create({
    data: {
      name,
      description,
      startDate,
      endDate,
      // 仮の値
      eventImgUrl:
        "https://2.bp.blogspot.com/-hAjA900tGaQ/W-0hIg_ntVI/AAAAAAABQPk/IVHe1IC_H2YHgoikFKHPXmKqPDLJmxYegCLcBGAs/s400/syourai_sekkei_woman.png",
    },
  });
  res.status(200).json({ event });
}
