"use client";

import { ReservationDeleteForm } from "@/components/reservation_form/ReservationDeleteForm";
import { ReservationForm } from "@/components/reservation_form/ReservationForm";
import {
  ReservationSchedule,
  ReservationTable,
} from "@/components/reservation_table/ReservationTable";
import { userState } from "@/state/user";
import { useCallback, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Container, useToast, Heading } from "@chakra-ui/react";
import { login } from "@/utils/login";
import { DisplayTime } from "@/components/display_time/DisplayTime";
import { pageHeadline } from "@/style/style";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export default function Home() {
  const [user, setUser] = useRecoilState(userState);
  const [isOpenReservationForm, setIsOpenReservationForm] = useState(false);
  const [isOpenReservationDeleteForm, setIsOpenReservationDeleteForm] =
    useState(false);
  const [seat, setSeat] = useState(0);
  const [period, setPeriod] = useState(0);
  const [reservationId, setReservationId] = useState<number | undefined>(
    undefined
  );
  const toast = useToast();
  // TODO: ここ、頑張らないと予約の書き換えが起こる
  const { data, error, isLoading, mutate } = useSWR<{
    reservationSchedule: ReservationSchedule[][];
  }>("api/reservation/today", {
    refreshInterval: 5000,
  });

  useEffect(() => {
    login(undefined, setUser).catch((e) => {
      console.log("access token login failed");
    });
  }, [setUser]);
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
    [toast, user.user]
  );
  return (
    <main>
      <Container maxW={"90vw"} margin="auto" padding="3.5rem 0">
        <Heading fontSize={pageHeadline}>PC席予定表</Heading>
        <ReservationTable
          onCellClick={handleClick}
          data={data}
          isLoading={isLoading}
          error={error}
        />

        {isOpenReservationForm && (
          <ReservationForm
            isOpen={isOpenReservationForm}
            onClose={() => {
              setIsOpenReservationForm(false);
              mutate();
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
              mutate();
            }}
            seat={seat}
            period={period}
            id={reservationId}
          />
        )}
      </Container>
    </main>
  );
}
