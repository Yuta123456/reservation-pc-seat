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
  await prisma.event.createMany({
    data: [
      {
        id: 1,
        name: "習字やろう",
        eventImgUrl:
          "https://1.bp.blogspot.com/-hh25Wsc41m8/VsGsWoJpl-I/AAAAAAAA3_4/zlDvS5vM94M/s400/syuuji_syodou_man.png",
        description:
          "みなさん、書初めなんて中学生以来していないんじゃないですか？初心忘るべからずでぜひ挑戦してみましょう！",
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        id: 2,
        name: "今年の抱負を書こう",
        eventImgUrl:
          "https://illust8.com/wp-content/uploads/2022/09/shodou_shuuji_boy_17246.png",
        description:
          "みなさん、書初めなんて中学生以来していないんじゃないですか？初心忘るべからずでぜひ挑戦してみましょう！",
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        id: 3,
        name: "クリスマス",
        eventImgUrl:
          "https://2.bp.blogspot.com/-C0tgnFFp_FM/UZYlZ5K5aZI/AAAAAAAATOc/vIvr0Dzm9_U/s400/christmas_tree.png",
        description:
          "もうすぐクリスマスですね。何か予定がある人もそうでない人も、ケーキでも食べて一休みしましょう。",
        startDate: new Date(),
        endDate: new Date(),
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
