import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Text,
} from "@/app/common/components";
import { reservationData } from "@/mockData/ReservationData";
import { FC } from "react";

type ReservationTableProps = {
  onCellClick: (period: string, seat: string) => void;
};
export const ReservationTable: FC<ReservationTableProps> = ({
  onCellClick,
}) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>
              <Text fontSize={"1rem"}>1時限目</Text>
            </Th>
            <Th>
              <Text fontSize={"1rem"}>2時限目</Text>
            </Th>
            <Th>
              <Text fontSize={"1rem"}>昼休み</Text>
            </Th>
            <Th>
              <Text fontSize={"1rem"}>3時限目</Text>
            </Th>
            <Th>
              <Text fontSize={"1rem"}>4時限目</Text>
            </Th>
            <Th>
              <Text fontSize={"1rem"}>5時限目</Text>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {reservationData.map((resForPeriod, index) => {
            return (
              <Tr key={index}>
                <>
                  <Th>
                    <Text fontSize={"1rem"}>PC{index + 1}</Text>
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
                        <Text fontSize={"2rem"}>
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
  );
};
