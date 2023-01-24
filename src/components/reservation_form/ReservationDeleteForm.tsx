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
} from "../../app/common/components";

import { FC, useState } from "react";
import { useIsPc } from "@/Hooks/useIsPc";

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
              fetch("api/reservation", {
                method: "DELETE",
                body: JSON.stringify({ id }),
              }).then(async (res) => {
                setIsLoading(false);
                onClose();
                toast({
                  title: "削除しました",
                  status: "success",
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
