type ReservationInfo = {
  isReserve: boolean;
  studentIds: string[];
};

// NOTE: 時間に対して仕様と思ったが、HTMLの表示上の関係でPC席に対して取得
//       どっちでもよかったのでこのように実装したが、本来であれば表示の事を考慮してデータ構造を変えるべきでない
type ReservationForPCSeat = ReservationInfo[];
// 日付に対してfetchするはず
export const reservationData: ReservationForPCSeat[] = [
  [
    { isReserve: true, studentIds: ["5418070"] },
    { isReserve: false, studentIds: [] },
    { isReserve: false, studentIds: [] },
    { isReserve: false, studentIds: [] },
    { isReserve: false, studentIds: [] },
    { isReserve: true, studentIds: ["5418070"] },
  ],
  [
    { isReserve: true, studentIds: ["5418070"] },
    { isReserve: true, studentIds: ["5417830", "5418073"] },
    { isReserve: false, studentIds: [] },
    { isReserve: false, studentIds: [] },
    { isReserve: false, studentIds: [] },
    { isReserve: true, studentIds: ["5418070"] },
  ],
  [
    { isReserve: true, studentIds: ["5418070"] },
    { isReserve: true, studentIds: ["5417830", "5418073"] },
    { isReserve: false, studentIds: [] },
    { isReserve: false, studentIds: [] },
    { isReserve: false, studentIds: [] },
    { isReserve: true, studentIds: ["5418070"] },
  ],
  [
    { isReserve: true, studentIds: ["5418070"] },
    { isReserve: true, studentIds: ["5417830", "5418073"] },
    { isReserve: false, studentIds: [] },
    { isReserve: false, studentIds: [] },
    { isReserve: false, studentIds: [] },
    { isReserve: true, studentIds: ["5418070"] },
  ],
  [
    { isReserve: true, studentIds: ["5418070"] },
    { isReserve: true, studentIds: ["5417830"] },
    { isReserve: true, studentIds: ["5417830"] },
    { isReserve: false, studentIds: [] },
    { isReserve: false, studentIds: [] },
    { isReserve: true, studentIds: ["5418070"] },
  ],
];

// 1限→the first period

// これに従い、２限からは…

// ２限→second
// ３限→third
// ４限→fourth
// ５限→fifth

// reservationData.map((resFP) => {return <div> {resFP.} </div>})
