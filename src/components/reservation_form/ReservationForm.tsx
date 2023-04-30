"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Input,
  useToast,
  IconButton,
} from "@chakra-ui/react";

import { FC, useState } from "react";
import { useIsPc } from "@/Hooks/useIsPc";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useRecoilState } from "recoil";
import { userState } from "@/state/user";
import { validateStudentId } from "@/utils/validation";

const DisplayPeriod: Record<number, string> = {
  0: "1時限目",
  1: "2時限目",
  2: "お昼休み",
  3: "3時限目",
  4: "4時限目",
  5: "5時限目",
};

type ReservationFormProps = {
  isOpen: boolean;
  onClose: () => void;
  seat: number;
  period: number;
};
export const ReservationForm: FC<ReservationFormProps> = ({
  isOpen,
  onClose,
  seat,
  period,
}) => {
  const [studentsIds, setStudentsIds] = useState<string[]>([""]);
  const [numberOfForm, setNumberOfForm] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const isPc = useIsPc(undefined);
  const [user, _] = useRecoilState(userState);

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
        <ModalHeader>予約フォーム</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            {DisplayPeriod[period]}のPC{seat + 1}席を予約しますか？
            {[...Array(numberOfForm)].map((_, i) => {
              return (
                <Input
                  marginBottom={"5px"}
                  key={i + 1}
                  placeholder="学籍番号"
                  onChange={(e) => {
                    setStudentsIds((prevStudentIds) => {
                      const newStudentIds = [...prevStudentIds];
                      newStudentIds[i] = e.target.value;
                      return newStudentIds;
                    });
                  }}
                />
              );
            })}
            <Box
              display={"flex"}
              justifyContent="flex-start"
              marginTop={"10px"}
            >
              <IconButton
                aria-label="minus"
                icon={<MinusIcon />}
                isDisabled={studentsIds.length <= 1}
                onClick={() => {
                  setNumberOfForm((n) => {
                    return n - 1;
                  });
                  setStudentsIds((prevStudentIds) => {
                    const newStudentIds = [...prevStudentIds];
                    newStudentIds.pop();
                    return newStudentIds;
                  });
                }}
                marginRight="5px"
              />
              <IconButton
                aria-label="add"
                icon={<AddIcon />}
                isDisabled={studentsIds.length >= 6}
                onClick={() => {
                  setNumberOfForm((n) => {
                    return n + 1;
                  });
                  // TODO: disable追加
                  setStudentsIds((prevStudentIds) => {
                    const newStudentIds = [...prevStudentIds];
                    newStudentIds.push("");
                    return newStudentIds;
                  });
                }}
              />
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={isLoading}
            colorScheme="blue"
            isDisabled={studentsIds.some((v) => v.length === 0)}
            onClick={() => {
              if (!validateStudentId(studentsIds)) {
                toast({
                  title: "正しくない学生証番号が含まれています",
                  status: "error",
                  duration: 2000,
                  isClosable: true,
                });
                return;
              }
              setIsLoading(true);
              fetch("api/auth/reservation", {
                method: "POST",
                body: JSON.stringify({ seat, period, studentsIds }),
                // TODO: もうちょいいい感じに。
                headers: {
                  authorization: "Bearer " + user.session?.access_token || "",
                },
              })
                .then(async (res) => {
                  if (!res.ok) {
                    const { message } = await res.json();
                    throw new Error(message);
                  }
                  toast({
                    title: "予約しました",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                  });
                })
                .catch((e) => {
                  toast({
                    title: e.message,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                  });
                })
                .finally(() => {
                  setIsLoading(false);
                  onClose();
                });
            }}
          >
            予約する
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
