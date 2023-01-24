import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.student.createMany({
    data: [
      {
        studentId: "5418071",
      },
      {
        studentId: "5418072",
      },
      {
        studentId: "5418073",
      },
    ],
  });

  const today = new Date();
  await prisma.reservation.createMany({
    data: [
      {
        seat: 1,
        period: 5,
        date: today,
      },
      {
        seat: 1,
        period: 5,
        date: today,
      },
    ],
  });
  await prisma.reservationStudent.createMany({
    data: [
      {
        studentId: 1,
        reservationId: 1,
      },
      {
        studentId: 2,
        reservationId: 1,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
