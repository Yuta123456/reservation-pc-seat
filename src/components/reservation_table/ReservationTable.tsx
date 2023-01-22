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

export const ReservationTable = () => {
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
                  {resForPeriod.map((resInfo, index) => {
                    console.log(resInfo);
                    return (
                      <Th key={index} sx={{ height: "100px" }}>
                        <Text fontSize={"2rem"}>
                          {resInfo.isReserve ? "使用中" : "空き"}
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
