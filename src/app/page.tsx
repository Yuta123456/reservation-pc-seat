"use client";
import { ReservationForm } from "@/components/reservation_form/ReservationForm";
import { ReservationTable } from "@/components/reservation_table/ReservationTable";
import { useState } from "react";
import { Box } from "../app/common/components";
export default function Home() {
  const [isOpenReservationForm, setIsOpenReservationForm] = useState(false);
  const [seat, setSeat] = useState("0");
  const [period, setPeriod] = useState("0");
  return (
    <main>
      <Box maxW={"900px"} margin="auto">
        <ReservationTable
          onCellClick={(i, j) => {
            setIsOpenReservationForm(true);
            setSeat(i);
            setPeriod(j);
          }}
        />
      </Box>
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
