import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@/app/common/components";
import { reservationData } from "@/mockData/ReservationData";

export const ReservationTable = () => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>1</Th>
            <Th>2</Th>
            <Th>昼休み</Th>
            <Th>3</Th>
            <Th>4</Th>
            <Th>5</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reservationData.map((resForPeriod, index) => {
            return (
              <Tr key={index}>
                <>
                  <Th>PC{index + 1}</Th>
                  {resForPeriod.map((resInfo, index) => {
                    console.log(resInfo);
                    return (
                      <Th key={index}>
                        {resInfo.isReserve ? "予約済み" : "空き"}
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
