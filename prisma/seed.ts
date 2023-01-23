import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const posts: any = [];

for (let i = 0; i < 100; i++) {
  posts.push({ title: `title ${i + 1}` });
}

async function main() {
  const students = await prisma.student.create({
    data: {
      studentId: "5418070",
    },
  });

  const today = new Date();
  const date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const reservation = await prisma.reservation.create({
    data: {
      seat: 1,
      period: 5,
      date: today,
    },
  });

  console.log({ students, reservation });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
