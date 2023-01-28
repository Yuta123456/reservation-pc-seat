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
  useToast,
} from "@chakra-ui/react";

import { FC, useState } from "react";
import { useIsPc } from "@/Hooks/useIsPc";
import { userState } from "../../state/user";
import { useRecoilState } from "recoil";

type ReservationFormProps = {
  isOpen: boolean;
  onClose: () => void;
  seat: number;
  period: number;
  id: number;
};

const DisplayPeriod: Record<number, string> = {
  0: "1時限目",
  1: "2時限目",
  2: "お昼休み",
  3: "3時限目",
  4: "4時限目",
  5: "5時限目",
};

export const ReservationDeleteForm: FC<ReservationFormProps> = ({
  isOpen,
  onClose,
  seat,
  period,
  id,
}) => {
  const toast = useToast();
  const isPc = useIsPc(undefined);
  const [isLoading, setIsLoading] = useState(false);
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
        <ModalHeader>予約削除フォーム</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            {DisplayPeriod[period]}のPC{seat + 1}席の予約を削除しますか？
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={isLoading}
            colorScheme="red"
            onClick={() => {
              setIsLoading(true);
              fetch("api/auth/reservation", {
                method: "DELETE",
                body: JSON.stringify({ id }),
                // TODO: もうちょいいい感じに。
                headers: {
                  authorization: "Bearer " + user.session?.access_token || "",
                },
              })
                .then(async (res) => {
                  setIsLoading(false);
                  onClose();
                  toast({
                    title: "削除しました",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                  });
                })
                .catch((e) => {
                  console.log(e);
                  toast({
                    title: "削除に失敗しました",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                  });
                });
            }}
          >
            削除する
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
