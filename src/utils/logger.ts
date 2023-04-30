import { prisma } from "@/pages/api/prisma";

type Log = "Error" | "Log" | "Warning";

export const logger = async (
  method: string | undefined,
  content: string,
  status: number,
  level: Log
) => {
  const message = `${method}: ${content} ${status}`;
  await prisma.log.create({
    data: {
      message,
      level,
    },
  });
};
