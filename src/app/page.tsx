import Image from "next/image";
import { Inter } from "@next/font/google";
import { ReservationTable } from "@/components/reservation_table/ReservationTable";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <ReservationTable />
    </main>
  );
}
