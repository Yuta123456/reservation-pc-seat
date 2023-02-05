"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Input,
  useToast,
  IconButton,
  Stack,
  Card,
  Text,
  CardBody,
} from "@chakra-ui/react";

import { FC, useEffect, useState } from "react";
import { useIsPc } from "@/Hooks/useIsPc";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useRecoilState } from "recoil";
import { userState } from "@/state/user";
import useSWR from "swr";
import { ReservationScheduleWithAuth } from "@/components/reservation_table/ReservationTable";

const DisplayPeriod: Record<number, string> = {
  0: "1時限目",
  1: "2時限目",
  2: "お昼休み",
  3: "3時限目",
  4: "4時限目",
  5: "5時限目",
};

type ReservationInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  seat: number;
  period: number;
};
export const ReservationInfoModal: FC<ReservationInfoModalProps> = ({
  isOpen,
  onClose,
  seat,
  period,
}) => {
  const [studentsIds, setStudentsIds] = useState<string[]>([""]);
  const [numberOfForm, setNumberOfForm] = useState<number>(1);
  const isPc = useIsPc(undefined);
  const [user, _] = useRecoilState(userState);
  const [reservations, setReservations] = useState<
    ReservationScheduleWithAuth | undefined
  >(undefined);

  useEffect(() => {
    fetch("/api/auth/reservation/today", {
      headers: {
        Authorization: "Bearer " + user.session?.access_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const newReservation: ReservationScheduleWithAuth =
          res.reservationSchedule
            .flat()
            .filter(
              (res: ReservationScheduleWithAuth) =>
                res.seat === seat && res.period === period
            )[0];
        setReservations(newReservation);
      });
  }, [user.session?.access_token, seat, period]);

  if (isPc === undefined) {
    return <></>;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
      <ModalOverlay />
      <ModalContent
        {...(!isPc && {
          maxW: "90vw",
        })}
      >
        <ModalHeader>予約情報</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Stack spacing="4" paddingBottom="15px">
              {reservations &&
                reservations.studentIds &&
                reservations.studentIds.map((id) => {
                  return (
                    <Card key={id} bg="gray.100">
                      <CardBody>
                        <Text pt="2" fontSize="sm" fontWeight={600}>
                          {id}
                        </Text>
                      </CardBody>
                    </Card>
                  );
                })}
            </Stack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
