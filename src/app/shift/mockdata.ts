export type LearningAssistantInfo = {
  id: number;
  studentId: string;
  name: string;
  avatarURL: string;
  description: string;
  expert: string[];
  hobby: string[];
};
export const mockdata: LearningAssistantInfo[] = [
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
    name: "黒河内廉人",
    avatarURL: "",
    description: "相談を聞くのが上手です。優しく教えます。",
    expert: ["情報科学"],
    hobby: ["野球"],
  },
];
