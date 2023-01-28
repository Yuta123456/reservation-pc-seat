import { useIsPc } from "@/Hooks/useIsPc";
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
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRecoilState } from "recoil";
import {
  DisplayPriod,
  ReservationScheduleWithAuth,
} from "../reservation_table/ReservationTable";

type SearchReservationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export const SearchReservationModal: FC<SearchReservationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [studentId, setStudentId] = useState("");
  const [user, _] = useRecoilState(userState);
  const [result, setResult] = useState<
    ReservationScheduleWithAuth[] | undefined
  >();
  const onClickSearch = () => {
    fetch("api/auth/reservation/today", {
      headers: {
        Authorization: "Bearer " + user.session?.access_token,
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
  const isPc = useIsPc(undefined);
  if (isPc === undefined) {
    return <></>;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
      <ModalOverlay />
      <ModalContent
        {...(!isPc && {
          maxW: "90vw",
        })}
      >
        <ModalHeader>学籍番号検索</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup>
            <InputLeftElement>
              <AiOutlineSearch color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="学籍番号"
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
