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
import { reservationData } from "@/mockData/ReservationData";
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
                          sx={{ height: "100px" }}
                          onClick={() => {
                            onCellClick(String(index), String(j));
                          }}
                        >
                          <Text fontSize={"1.5em"}>
                            {resInfo.reservationState}
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
                          sx={{ height: "40px" }}
                          onClick={() => {
                            onCellClick(String(index), String(j));
                          }}
                        >
                          <Text>{resInfo.reservationState}</Text>
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
