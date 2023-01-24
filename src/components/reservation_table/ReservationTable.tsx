import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Text,
  Box,
} from "@/app/common/components";
import { useIsPc } from "@/Hooks/useIsPc";
import { reservationData, ReservationState } from "@/mockData/ReservationData";
import { FC } from "react";

type ReservationTableProps = {
  onCellClick: (period: number, seat: number) => void;
};
export const ReservationTable: FC<ReservationTableProps> = ({
  onCellClick,
}) => {
  const isPc = useIsPc(undefined);
  if (isPc === undefined) {
    return <></>;
  }
  return (
    <>
      {isPc ? (
        <PCReservationTable onCellClick={onCellClick} />
      ) : (
        <SPReservationTable onCellClick={onCellClick} />
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
const PCReservationTable: FC<ReservationTableProps> = ({ onCellClick }) => {
  return (
    <Box minW={"900px"} maxW={"1100px"} margin="auto" textAlign={"center"}>
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
            {reservationData.map((resForPeriod, seat) => {
              return (
                <Tr key={seat}>
                  <>
                    <Th>
                      <Text fontSize={"1.5em"}>PC{seat + 1}</Text>
                    </Th>
                    {/* TODO: マジックナンバー削除。6はperiodのかず */}
                    {[...Array(6)].map((_, period) => {
                      const isExist: boolean =
                        resForPeriod.find((r) => r.period === period) !==
                        undefined;
                      return (
                        <Th
                          key={period}
                          sx={{
                            height: "100px",
                            ...reservationStateStyle[
                              isExist ? "isReserved" : "available"
                            ],
                          }}
                          {...(!isExist && {
                            onClick: () => {
                              onCellClick(seat, period);
                            },
                          })}
                        >
                          <Text fontSize={"1.5em"}>
                            {
                              reservationStateText[
                                isExist ? "isReserved" : "available"
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

const SPReservationTable: FC<ReservationTableProps> = ({ onCellClick }) => {
  return (
    <Box maxW={"100vw"} textAlign={"center"}>
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
            {reservationData.map((resForPeriod, seat) => {
              return (
                <Tr key={seat}>
                  <Th>
                    <Text>PC{seat + 1}</Text>
                  </Th>
                  {[...Array(6)].map((_, period) => {
                    const isExist: boolean =
                      resForPeriod.find((r) => r.period === period) !==
                      undefined;
                    return (
                      <Th
                        key={period}
                        sx={{
                          height: "60px",
                          ...reservationStateStyle[
                            isExist ? "isReserved" : "available"
                          ],
                        }}
                        {...(!isExist && {
                          onClick: () => {
                            onCellClick(seat, period);
                          },
                        })}
                      >
                        <Text>
                          {
                            reservationStateText[
                              isExist ? "isReserved" : "available"
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
