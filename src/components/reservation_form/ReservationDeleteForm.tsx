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
  Text,
  Input,
} from "@chakra-ui/react";

import { FC, useState } from "react";
import { useIsPc } from "@/Hooks/useIsPc";
import { userState } from "../../state/user";
import { useRecoilState } from "recoil";
import { confirmAccessToken } from "@/utils/confirmAccessToken";

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
  const [user, setUser] = useRecoilState(userState);
  const [deleteKey, setDeleteKey] = useState("");
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
            <Text>
              {DisplayPeriod[period]}のPC{seat + 1}席の予約を削除しますか？
              <br />
              予約時の学籍番号のうちの一つか管理者番号を入力してください
            </Text>
            <Input
              marginBottom={"5px"}
              marginTop={"5px"}
              placeholder="学籍番号か管理者番号を入力"
              onChange={(e) => setDeleteKey(e.target.value)}
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={isLoading}
            colorScheme="red"
            isDisabled={deleteKey.length === 0}
            onClick={async () => {
              setIsLoading(true);
              await confirmAccessToken(setUser);
              fetch("api/auth/reservation", {
                method: "DELETE",
                body: JSON.stringify({ id, deleteKey }),
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
                    title: "削除しました",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                  });
                  onClose();
                })
                .catch((e) => {
                  console.log(e);
                  toast({
                    title: e.message,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                  });
                })
                .finally(() => {
                  setIsLoading(false);
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
