// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "./supabase";
import { User, Session } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";

type Data = {
  isAdmin: boolean;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();
  checkAdmin(req, prisma)
    .then((r: boolean) => {
      res.status(200).json({
        isAdmin: r,
      });
    })
    .catch(() => {
      res.status(500).end();
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

const checkAdmin = async (req: NextApiRequest, prisma: PrismaClient) => {
  const { id } = JSON.parse(req.body);

  const users = await prisma.users.findMany({
    where: {
      id,
      is_admin: true,
    },
  });
  if (users.length > 0) {
    return true;
  }
  return false;
};
