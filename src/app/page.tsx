"use client";
import { DisplayTime } from "@/components/display_time/DisplayTime";
import { ReservationForm } from "@/components/reservation_form/ReservationForm";
import { ReservationTable } from "@/components/reservation_table/ReservationTable";
import { useState } from "react";
export default function Home() {
  const [isOpenReservationForm, setIsOpenReservationForm] = useState(false);
  const [seat, setSeat] = useState(0);
  const [period, setPeriod] = useState(0);
  return (
    <main>
      <DisplayTime />
      <ReservationTable
        onCellClick={(i, j) => {
          setIsOpenReservationForm(true);
          setSeat(i);
          setPeriod(j);
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
    </main>
  );
}
