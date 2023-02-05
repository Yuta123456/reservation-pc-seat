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
  Textarea,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import { FC, useRef, useState } from "react";
import { useIsPc } from "@/Hooks/useIsPc";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useRecoilState } from "recoil";
import { userState } from "@/state/user";
import { createEvent, updateEvent } from "@/utils/event";
import { EventDetail } from "@/app/event/mockdata";

// model Event {
//   id          Int      @id @default(autoincrement())
//   name        String
//   eventImgUrl String
//   description String
//   startDate   DateTime
//   endDate     DateTime
// }

type UpdateEventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  eventDetail: EventDetail | undefined;
};

export const UpdateEventModal: FC<UpdateEventModalProps> = ({
  isOpen,
  onClose,
  eventDetail,
}) => {
  const toast = useToast();
  const [name, setName] = useState(eventDetail?.name);
  const [description, setDescription] = useState(eventDetail?.description);
  const [startDate, setStartDate] = useState(
    getDateString(new Date(eventDetail?.startDate || ""))
  );
  const [endDate, setEndDate] = useState(
    getDateString(new Date(eventDetail?.endDate || ""))
  );

  const update = () => {
    // TODO: バリデーション
    updateEvent(eventDetail?.id, name, description, startDate, endDate)
      .then(() => {
        toast({
          title: "イベントを更新しました",
          status: "success",
          duration: 2000,
        });
        onClose();
      })
      .catch((e) => {
        console.log(e);
        toast({
          title: "イベントの更新に失敗しました",
          status: "error",
          duration: 2000,
        });
      });
  };
  if (eventDetail === undefined) {
    return <></>;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>イベント変更</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <FormControl>
              <FormLabel>イベント名</FormLabel>
              <Input
                marginBottom={"5px"}
                placeholder="イベント名"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <FormLabel>イベントの説明</FormLabel>
              <Textarea
                placeholder="イベントの説明"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <FormLabel>開始日</FormLabel>
              <Input
                type="date"
                onChange={(e) => {
                  const newStartDate = getDateString(new Date(e.target.value));
                  setStartDate(newStartDate);
                }}
                value={startDate || ""}
              ></Input>
              <FormLabel>終了日</FormLabel>
              <Input
                type="date"
                value={endDate || ""}
                onChange={(e) => {
                  const newEndDate = getDateString(new Date(e.target.value));
                  setEndDate(newEndDate);
                }}
              ></Input>
            </FormControl>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button color={"white"} bg="teal.700" onClick={update}>
            変更する
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

function getDateString(originalDate: Date | undefined) {
  if (originalDate === undefined) {
    return "";
  }
  console.log(typeof originalDate);
  const year = originalDate.getFullYear();
  const month = originalDate.getMonth() + 1;
  const date = originalDate.getDate();
  const dateString =
    new String(year) +
    "-" +
    ("00" + new String(month)).slice(-2) +
    "-" +
    ("00" + new String(date)).slice(-2);
  return dateString;
}
