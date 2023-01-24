import { ReservationSchedule } from "../pages/api/reservation/[...date]";
export type ReservationState = "isReserved" | "available" | "occupied";

// 日付に対してfetchするはず
export const reservationData: ReservationSchedule[][] = [
  [{ id: 8, seat: 0, period: 2, studentIds: ["aiueo"] }],
  [
    { id: 6, seat: 1, period: 0, studentIds: [] },
    { id: 5, seat: 1, period: 2, studentIds: [] },
    { id: 1, seat: 1, period: 5, studentIds: ["5418070", "aiueo"] },
  ],
  [],
  [],
  [
    { id: 7, seat: 4, period: 0, studentIds: [] },
    { id: 9, seat: 4, period: 1, studentIds: [] },
  ],
];
