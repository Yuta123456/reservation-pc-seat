import { LearningAssistantInfo } from "@/app/shift/mockdata";

export const laInfo: LearningAssistantInfo[] = [
  {
    id: 1,
    studentId: "6122M21",
    name: "田中勇太",
    avatarURL: "",
    description: "話が面白いです",
    expert: ["情報科学"],
    hobby: ["音楽", "服", "サッカー"],
  },
  {
    id: 2,
    studentId: "6122M22",
    name: "織田尚哉",
    avatarURL: "",
    description: "レポートの添削を頑張ります",
    expert: ["情報科学", "教育学"],
    hobby: ["サッカー"],
  },
  {
    id: 3,
    studentId: "6122M23",
    name: "黒河内廉人",
    avatarURL: "",
    description: "相談を聞くのが上手です。優しく教えます。",
    expert: ["情報科学"],
    hobby: ["野球"],
  },
  {
    id: 4,
    studentId: "6122M23",
    name: "原田唯衣",
    avatarURL: "",
    description: "相談を聞くのが上手です。優しく教えます。",
    expert: ["情報科学", "化学"],
    hobby: ["甘いもの"],
  },
  {
    id: 5,
    studentId: "6122M23",
    name: "武和磨",
    avatarURL: "",
    description: "レポートとかいけます",
    expert: ["ドイツ語"],
    hobby: ["サッカー"],
  },
  {
    id: 6,
    studentId: "6122M23",
    name: "加藤楽人",
    avatarURL: "",
    description: "数学が得意です",
    expert: ["数学", "教職"],
    hobby: ["数学"],
  },
];

type ShiftInfo = {
  startDate: Date;
  endDate: Date;
};
export const shiftData: ShiftInfo[] = [
  {
    startDate: new Date("Tue Feb 14 2023 11:00:00"),
    endDate: new Date("Tue Feb 14 2023 13:00:00"),
  },
  {
    startDate: new Date("Fri Feb 17 2023 11:00:00"),
    endDate: new Date("Fri Feb 17 2023 13:00:00"),
  },
  {
    startDate: new Date("Sun Feb 19 2023 11:00:00"),
    endDate: new Date("Sun Feb 19 2023 13:00:00"),
  },
];
