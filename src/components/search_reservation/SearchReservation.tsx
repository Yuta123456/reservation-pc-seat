import { useIsPc } from "@/Hooks/useIsPc";
import { userState } from "@/state/user";
import { confirmAccessToken } from "@/utils/confirmAccessToken";
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Card,
  CardBody,
  Stack,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRecoilState } from "recoil";
import {
  DisplayPeriod,
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
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [result, setResult] = useState<
    ReservationScheduleWithAuth[] | undefined
  >();
  const onClickSearch = async () => {
    setIsLoading(true);
    await confirmAccessToken(setUser);
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
        setResult(targetReservation);
      })
      .catch((e) => {
        toast({
          title: "検索に失敗しました",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
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
          <InputGroup paddingBottom="10px">
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
            <Button onClick={onClickSearch} isLoading={isLoading}>
              検索
            </Button>
          </InputGroup>
          {result && (
            <Box>
              <Stack spacing="4" paddingBottom="15px">
                {result.map((reservation) => {
                  return (
                    <Card key={reservation.id} bg="gray.100">
                      <CardBody>
                        <Text pt="2" fontSize="sm" fontWeight={600}>
                          {DisplayPeriod[reservation.period]} の PC
                          {reservation.seat + 1}を予約しています。
                        </Text>
                      </CardBody>
                    </Card>
                  );
                })}
                {result.length === 0 && (
                  <Box>
                    <Text pt="2" fontSize="sm">
                      予約が見つかりませんでした。
                    </Text>
                  </Box>
                )}
              </Stack>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
