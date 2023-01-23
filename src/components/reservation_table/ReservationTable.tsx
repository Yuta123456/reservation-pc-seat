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
import { useIsPc } from "@/Hooks/isPc";
import { reservationData, ReservationState } from "@/mockData/ReservationData";
import { FC } from "react";

type ReservationTableProps = {
  onCellClick: (period: string, seat: string) => void;
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
    <Box minW={"900px"} maxW={"1100px"} margin="auto">
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
            {reservationData.map((resForPeriod, index) => {
              return (
                <Tr key={index}>
                  <>
                    <Th>
                      <Text fontSize={"1.5em"}>PC{index + 1}</Text>
                    </Th>
                    {resForPeriod.map((resInfo, j) => {
                      return (
                        <Th
                          key={j}
                          sx={{
                            height: "100px",
                            ...reservationStateStyle[resInfo.reservationState],
                          }}
                          {...(resInfo.reservationState === "available" && {
                            onClick: () => {
                              onCellClick(String(index), String(j));
                            },
                          })}
                        >
                          <Text fontSize={"1.5em"}>
                            {reservationStateText[resInfo.reservationState]}
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
    <Box maxW={"100vw"}>
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
            {reservationData.map((resForPeriod, index) => {
              return (
                <Tr key={index}>
                  <>
                    <Th>
                      <Text>PC{index + 1}</Text>
                    </Th>
                    {resForPeriod.map((resInfo, j) => {
                      return (
                        <Th
                          key={j}
                          sx={{
                            height: "60px",
                            ...reservationStateStyle[resInfo.reservationState],
                          }}
                          {...(resInfo.reservationState === "available" && {
                            onClick: () => {
                              onCellClick(String(index), String(j));
                            },
                          })}
                        >
                          <Text>
                            {reservationStateText[resInfo.reservationState]}
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
