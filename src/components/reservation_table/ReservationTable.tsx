"use client";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Text,
  Center,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { useIsPc } from "@/Hooks/useIsPc";
import { FC } from "react";
import useSWR from "swr";
import { useRecoilState } from "recoil";
import { userState } from "@/state/user";
import IsReserved from "../../../public/IsReserved.svg";
import Image from "next/image";
import { PCImagePath } from "@/constants/imagePath";
export type ReservationScheduleWithAuth = {
  id: number;
  seat: number;
  period: number;
  studentIds: string[];
};

export type ReservationSchedule = {
  id: number;
  seat: number;
  period: number;
};

type ReservationTableProps = {
  onCellClick: (
    period: number,
    seat: number,
    isReserved: boolean,
    reservationId: number | undefined
  ) => void;
};

export const ReservationTable: FC<ReservationTableProps> = ({
  onCellClick,
}) => {
  const isPc = useIsPc(undefined);
  const [user, _] = useRecoilState(userState);
  // TODO: ここ、頑張らないと予約の書き換えが起こる
  const { data, error, isLoading } = useSWR<{
    reservationSchedule: ReservationSchedule[][];
  }>("api/reservation/today", {
    refreshInterval: 1000,
  });

  if (isPc === undefined || isLoading || error || !data) {
    return (
      <Center>
        <Spinner
          thickness="4px"
          speed="1.0s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }
  return (
    <>
      {isPc ? (
        <PCReservationTable
          onCellClick={onCellClick}
          reservationSchedule={data.reservationSchedule}
        />
      ) : (
        <SPReservationTable
          onCellClick={onCellClick}
          reservationSchedule={data.reservationSchedule}
        />
      )}
    </>
  );
};
export type ReservationState = "isReserved" | "available" | "occupied";
export const DisplayPeriod = [
  "1時限目",
  "2時限目",
  "昼休み",
  "3時限目",
  "4時限目",
  "5時限目",
];
const reservationStateStyle: Record<ReservationState, {}> = {
  available: {
    bgColor: "yellow.100",
    color: "white",
  },
  isReserved: {
    bgColor: "gray.200",
    color: "white",
  },
  occupied: {
    bgColor: "teal.500",
    color: "white",
  },
};
const reservationStateText: Record<ReservationState, string> = {
  available: "予約可",
  isReserved: "予約済",
  occupied: "使用中",
};
const PCReservationTable: FC<
  ReservationTableProps & { reservationSchedule: ReservationSchedule[][] }
> = ({ onCellClick, reservationSchedule }) => {
  return (
    <Box textAlign={"center"}>
      <TableContainer>
        <Table variant="simple" w="">
          <Thead>
            <Tr>
              <Th textAlign={"center"} w="100px"></Th>
              <Th textAlign={"center"} w="100px">
                <Text fontSize={"1.5em"}>1時限目</Text>
              </Th>
              <Th textAlign={"center"} w="100px">
                <Text fontSize={"1.5em"}>2時限目</Text>
              </Th>
              <Th textAlign={"center"} w="100px">
                <Text fontSize={"1.5em"}>昼休み</Text>
              </Th>
              <Th textAlign={"center"} w="100px">
                <Text fontSize={"1.5em"}>3時限目</Text>
              </Th>
              <Th textAlign={"center"} w="100px">
                <Text fontSize={"1.5em"}>4時限目</Text>
              </Th>
              <Th textAlign={"center"} w="100px">
                <Text fontSize={"1.5em"}>5時限目</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {reservationSchedule.map((resForPeriod, seat) => {
              return (
                <Tr key={seat}>
                  <>
                    <Th textAlign={"center"} w="200px">
                      <Text fontSize={"1.5em"}>
                        {toSeatImagePath(seat) ? (
                          <Image
                            src={toSeatImagePath(seat)}
                            alt={seat + "席のイラスト"}
                            width="110"
                            height="110"
                          />
                        ) : (
                          <Text>PC{seat + 1}</Text>
                        )}
                      </Text>
                    </Th>
                    {/* TODO: マジックナンバー削除。6はperiodのかず */}
                    {[...Array(6)].map((_, period) => {
                      const isReserved: boolean =
                        resForPeriod.find((r) => r.period === period) !==
                        undefined;
                      return (
                        <Th
                          key={period}
                          w="200px"
                          sx={{
                            height: "200px",

                            ...reservationStateStyle[
                              isReserved ? "isReserved" : "available"
                            ],
                          }}
                          onClick={() => {
                            onCellClick(
                              seat,
                              period,
                              isReserved,
                              resForPeriod.find((r) => r.period === period)?.id
                            );
                          }}
                        >
                          {isReserved ? (
                            toImagePath(seat, isReserved) ? (
                              <Image
                                src={toImagePath(seat, isReserved)}
                                width="110"
                                height="110"
                                alt="is-reserved"
                              />
                            ) : (
                              <Text>予約済み</Text>
                            )
                          ) : toImagePath(seat, isReserved) ? (
                            <Image
                              src={toImagePath(seat, isReserved)}
                              width="110"
                              height="110"
                              alt="reservable"
                            />
                          ) : (
                            <Text>予約可</Text>
                          )}
                        </Th>
                      );
                    })}
                  </>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const SPReservationTable: FC<
  ReservationTableProps & { reservationSchedule: ReservationSchedule[][] }
> = ({ onCellClick, reservationSchedule }) => {
  return (
    <Box textAlign={"center"}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th textAlign={"center"}>
                <Text>1時限目</Text>
              </Th>
              <Th textAlign={"center"}>
                <Text>2時限目</Text>
              </Th>
              <Th textAlign={"center"}>
                <Text>昼休み</Text>
              </Th>
              <Th textAlign={"center"}>
                <Text>3時限目</Text>
              </Th>
              <Th textAlign={"center"}>
                <Text>4時限目</Text>
              </Th>
              <Th textAlign={"center"}>
                <Text>5時限目</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {reservationSchedule.map((resForPeriod, seat) => {
              return (
                <Tr key={seat}>
                  <Th>
                    <Text>PC{seat + 1}</Text>
                  </Th>
                  {[...Array(6)].map((_, period) => {
                    const isReserved: boolean =
                      resForPeriod.find((r) => r.period === period) !==
                      undefined;
                    return (
                      <Th
                        key={period}
                        sx={{
                          height: "100px",
                          width: "100px",
                          ...reservationStateStyle[
                            isReserved ? "isReserved" : "available"
                          ],
                        }}
                        onClick={() => {
                          onCellClick(
                            seat,
                            period,
                            isReserved,
                            resForPeriod.find((r) => r.period === period)?.id
                          );
                        }}
                      >
                        <Text fontSize={"1.5em"} textAlign="center">
                          {isReserved ? <IsReserved /> : "予約可"}
                        </Text>
                      </Th>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const toImagePath = (seat: number, isReserved: boolean) => {
  if (seat === 0) {
    return isReserved ? "/pupu-is-reserved.svg" : "/pupu-is-reservable.svg";
  } else if (seat === 1) {
    return isReserved ? "/purple-is-reserved.svg" : "/purple-is-reservable.svg";
  } else if (seat === 2) {
    return isReserved ? "/bipper-is-reserved.svg" : "/bipper-is-reservable.svg";
  } else if (seat === 3) {
    return isReserved ? "/o-dori-is-reserved.svg" : "/o-dori-is-reservable.svg";
  } else if (seat === 4) {
    return isReserved
      ? "/unknown-is-reserved.svg"
      : "/unknown-is-reservable.svg";
  } else {
    return "";
  }
};

const toSeatImagePath = (seat: number) => {
  if (seat === 0) {
    return "/sushi-seat.svg";
  } else if (seat === 1) {
    return "/bread-seat.svg";
  } else if (seat === 2) {
    return "/donuts-seat.svg";
  } else if (seat === 3) {
    return "/yuzu-seat.svg";
  } else if (seat === 4) {
    return "";
  } else {
    return "";
  }
  // export const PCImagePath = ["sushi-seat.svg", "bread-seat.svg"];
};
