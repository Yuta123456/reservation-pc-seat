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
import { ReservationState } from "@/mockData/ReservationData";
import { FC } from "react";
import useSWR from "swr";
import { useRecoilState } from "recoil";
import { userState } from "@/state/user";

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

const fetcher = ([url, accessToken]: [string, string | undefined]) =>
  fetch(url, {
    // headers: {
    //   Authorization: "Bearer " + accessToken,
    // },
  })
    .then(async (res) => await res.json())
    .then((res) => res.reservationSchedule);

export const ReservationTable: FC<ReservationTableProps> = ({
  onCellClick,
}) => {
  const isPc = useIsPc(undefined);
  const [user, _] = useRecoilState(userState);
  // TODO: ここ、頑張らないと予約の書き換えが起こる
  const { data, error } = useSWR(
    [
      // `api/${
      //   user.accessToken ? "auth/reservation/today" : "reservation/today"
      // }`,
      "api/resercation/today",
      user.accessToken,
    ],
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  if (isPc === undefined || data === undefined || error) {
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
          reservationSchedule={data}
        />
      ) : (
        <SPReservationTable
          onCellClick={onCellClick}
          reservationSchedule={data}
        />
      )}
    </>
  );
};

const reservationStateStyle: Record<ReservationState, {}> = {
  available: {
    bgColor: "teal.200",
    color: "white",
  },
  isReserved: {
    bgColor: "gray.500",
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
    <Box maxW={"90vw"} margin="auto" textAlign={"center"}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>
                <Text fontSize={"1.5em"}>1時限目</Text>
              </Th>
              <Th>
                <Text fontSize={"1.5em"}>2時限目</Text>
              </Th>
              <Th>
                <Text fontSize={"1.5em"}>昼休み</Text>
              </Th>
              <Th>
                <Text fontSize={"1.5em"}>3時限目</Text>
              </Th>
              <Th>
                <Text fontSize={"1.5em"}>4時限目</Text>
              </Th>
              <Th>
                <Text fontSize={"1.5em"}>5時限目</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {reservationSchedule.map((resForPeriod, seat) => {
              return (
                <Tr key={seat}>
                  <>
                    <Th>
                      <Text fontSize={"1.5em"}>PC{seat + 1}</Text>
                    </Th>
                    {/* TODO: マジックナンバー削除。6はperiodのかず */}
                    {[...Array(6)].map((_, period) => {
                      const isReserved: boolean =
                        resForPeriod.find((r) => r.period === period) !==
                        undefined;
                      return (
                        <Th
                          key={period}
                          sx={{
                            height: "100px",
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
                            {
                              reservationStateText[
                                isReserved ? "isReserved" : "available"
                              ]
                            }
                          </Text>
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
    <Box maxW={"95vw"} textAlign={"center"}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>
                <Text>1時限目</Text>
              </Th>
              <Th>
                <Text>2時限目</Text>
              </Th>
              <Th>
                <Text>昼休み</Text>
              </Th>
              <Th>
                <Text>3時限目</Text>
              </Th>
              <Th>
                <Text>4時限目</Text>
              </Th>
              <Th>
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
                          height: "60px",
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
                        <Text>
                          {
                            reservationStateText[
                              isReserved ? "isReserved" : "available"
                            ]
                          }
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
