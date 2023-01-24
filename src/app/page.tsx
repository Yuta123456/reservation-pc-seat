"use client";
import { DisplayTime } from "@/components/display_time/DisplayTime";
import { ReservationDeleteForm } from "@/components/reservation_form/ReservationDeleteForm";
import { ReservationForm } from "@/components/reservation_form/ReservationForm";
import { ReservationTable } from "@/components/reservation_table/ReservationTable";
import { useState } from "react";
export default function Home() {
  const [isOpenReservationForm, setIsOpenReservationForm] = useState(false);
  const [isOpenReservationDeleteForm, setIsOpenReservationDeleteForm] =
    useState(false);
  const [seat, setSeat] = useState(0);
  const [period, setPeriod] = useState(0);
  const [reservationId, setReservationId] = useState<number | undefined>(
    undefined
  );
  return (
    <main>
      <DisplayTime />
      <ReservationTable
        onCellClick={(i, j, isReserved, reservationId) => {
          if (isReserved) {
            setIsOpenReservationDeleteForm(true);
          } else {
            setIsOpenReservationForm(true);
          }
          setSeat(i);
          setPeriod(j);
          setReservationId(reservationId);
        }}
      />

      {isOpenReservationForm && (
        <ReservationForm
          isOpen={isOpenReservationForm}
          onClose={() => {
            setIsOpenReservationForm(false);
          }}
          seat={seat}
          period={period}
        />
      )}
      {isOpenReservationDeleteForm && reservationId && (
        <ReservationDeleteForm
          isOpen={isOpenReservationDeleteForm}
          onClose={() => {
            setIsOpenReservationDeleteForm(false);
          }}
          seat={seat}
          period={period}
          id={reservationId}
        />
      )}
    </main>
  );
}
