import { ReservationTable } from "@/components/reservation_table/ReservationTable";
import { Box } from "../app/common/components";
export default function Home() {
  return (
    <main>
      <Box maxW={"900px"} margin="auto">
        <ReservationTable />
      </Box>
    </main>
  );
}
