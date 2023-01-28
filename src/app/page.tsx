"use client";

import { ReservationDeleteForm } from "@/components/reservation_form/ReservationDeleteForm";
import { ReservationForm } from "@/components/reservation_form/ReservationForm";
import { ReservationTable } from "@/components/reservation_table/ReservationTable";
import { userState } from "@/state/user";
import { useCallback, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useToast } from "@chakra-ui/react";
import { login } from "@/utils/login";
import { LoginInfo } from "../utils/login";

export default function Home() {
  const [isOpenReservationForm, setIsOpenReservationForm] = useState(false);
  const [isOpenReservationDeleteForm, setIsOpenReservationDeleteForm] =
    useState(false);
  const [seat, setSeat] = useState(0);
  const [period, setPeriod] = useState(0);
  const [reservationId, setReservationId] = useState<number | undefined>(
    undefined
  );

  const toast = useToast();
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    login(undefined, setUser);
  }, []);
  const handleClick = useCallback(
    (
      i: number,
      j: number,
      isReserved: boolean,
      reservationId: number | undefined
    ) => {
      if (!user.user) {
        toast({
          title: "予約を変更したい場合はログインが必要です",
          status: "info",
          duration: 2000,
        });
        return;
      }
      if (isReserved) {
        setIsOpenReservationDeleteForm(true);
      } else {
        setIsOpenReservationForm(true);
      }
      setSeat(i);
      setPeriod(j);
      setReservationId(reservationId);
    },
    [user]
  );
  return (
    <main>
      {/* <DisplayTime /> */}
      <ReservationTable onCellClick={handleClick} />

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
