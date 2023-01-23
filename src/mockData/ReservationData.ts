type ReservationState = "isReserved" | "available" | "occupied";

type ReservationInfo = {
  reservationState: ReservationState;
  studentIds: string[];
};

// NOTE: 時間に対して仕様と思ったが、HTMLの表示上の関係でPC席に対して取得
//       どっちでもよかったのでこのように実装したが、本来であれば表示の事を考慮してデータ構造を変えるべきでない
type ReservationForPCSeat = ReservationInfo[];
// 日付に対してfetchするはず
export const reservationData: ReservationForPCSeat[] = [
  [
    { reservationState: "available", studentIds: ["5418070"] },
    { reservationState: "available", studentIds: [] },
    { reservationState: "available", studentIds: [] },
    { reservationState: "isReserved", studentIds: [] },
    { reservationState: "available", studentIds: [] },
    { reservationState: "isReserved", studentIds: ["5418070"] },
  ],
  [
    { reservationState: "available", studentIds: ["5418070"] },
    { reservationState: "available", studentIds: [] },
    { reservationState: "available", studentIds: [] },
    { reservationState: "isReserved", studentIds: [] },
    { reservationState: "available", studentIds: [] },
    { reservationState: "isReserved", studentIds: ["5418070"] },
  ],
  [
    { reservationState: "available", studentIds: ["5418070"] },
    { reservationState: "isReserved", studentIds: [] },
    { reservationState: "available", studentIds: [] },
    { reservationState: "isReserved", studentIds: [] },
    { reservationState: "available", studentIds: [] },
    { reservationState: "isReserved", studentIds: ["5418070"] },
  ],
  [
    { reservationState: "available", studentIds: ["5418070"] },
    { reservationState: "available", studentIds: [] },
    { reservationState: "occupied", studentIds: [] },
    { reservationState: "isReserved", studentIds: [] },
    { reservationState: "available", studentIds: [] },
    { reservationState: "isReserved", studentIds: ["5418070"] },
  ],
  [
    { reservationState: "available", studentIds: ["5418070"] },
    { reservationState: "available", studentIds: [] },
    { reservationState: "available", studentIds: [] },
    { reservationState: "isReserved", studentIds: [] },
    { reservationState: "available", studentIds: [] },
    { reservationState: "isReserved", studentIds: ["5418070"] },
  ],
];

// 1限→the first period

// これに従い、２限からは…

// ２限→second
// ３限→third
// ４限→fourth
// ５限→fifth

// reservationData.map((resFP) => {return <div> {resFP.} </div>})
