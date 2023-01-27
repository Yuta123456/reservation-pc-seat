import { userState } from "@/state/user";
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRecoilState } from "recoil";
import {
  DisplayPriod,
  ReservationScheduleWithAuth,
} from "../reservation_table/ReservationTable";
export const SearchReservation = () => {
  const [studentId, setStudentId] = useState("");
  const [user, _] = useRecoilState(userState);
  const [result, setResult] = useState<
    ReservationScheduleWithAuth[] | undefined
  >();
  const onClickSearch = () => {
    fetch("api/auth/reservation/today", {
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    })
      .then((res) => res.json())
      .then((res) => res.reservationSchedule)
      .then((res: ReservationScheduleWithAuth[][]) => {
        const targetReservation = res
          .flat()
          .filter((res) => res.studentIds.includes(studentId));
        if (targetReservation.length === 0) {
          return;
        }
        setResult(targetReservation);
      });
  };
  return (
    <Box width={"100%"} textAlign="center" padding={"15px"}>
      <Text>学籍番号検索</Text>
      <InputGroup>
        <InputLeftElement children={<AiOutlineSearch color="gray.300" />} />
        <Input
          type="text"
          value={studentId}
          onChange={(e) => {
            setStudentId(e.target.value);
          }}
        />
        <Button onClick={onClickSearch}>検索</Button>
      </InputGroup>
      {result && (
        <Card>
          <CardHeader>
            <Heading size="md">予約一覧</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              {result.map((reservation) => {
                return (
                  <Box key={reservation.id}>
                    <Text pt="2" fontSize="sm">
                      {DisplayPriod[reservation.period]} の PC
                      {reservation.seat + 1}を予約しています。
                    </Text>
                  </Box>
                );
              })}
            </Stack>
          </CardBody>
        </Card>
      )}
    </Box>
  );
};
