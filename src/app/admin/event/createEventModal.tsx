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
import { createEvent } from "@/utils/event";

// model Event {
//   id          Int      @id @default(autoincrement())
//   name        String
//   eventImgUrl String
//   description String
//   startDate   DateTime
//   endDate     DateTime
// }

type CreateEventModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateEventModal: FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();
  const nameRef = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const startDate = useRef<HTMLInputElement>(null);
  const endDate = useRef<HTMLInputElement>(null);

  const register = () => {
    // TODO: バリデーション
    createEvent(
      nameRef.current?.value,
      description.current?.value,
      startDate.current?.value,
      endDate.current?.value
    )
      .then(() => {
        toast({
          title: "イベントを作成しました",
          status: "success",
          duration: 2000,
        });
        onClose();
      })
      .catch((e) => {
        console.log(e);
        toast({
          title: "イベントの作成に失敗しました",
          status: "error",
          duration: 2000,
        });
      });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>イベント作成</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <FormControl>
              <FormLabel>イベント名</FormLabel>
              <Input
                marginBottom={"5px"}
                placeholder="イベント名"
                ref={nameRef}
              />
              <FormLabel>イベントの説明</FormLabel>
              <Textarea placeholder="イベントの説明" ref={description} />
              <FormLabel>開始日</FormLabel>
              <Input type="date" ref={startDate}></Input>
              <FormLabel>終了日</FormLabel>
              <Input type="date" ref={endDate}></Input>
            </FormControl>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button color={"white"} bg="teal.700" onClick={register}>
            登録する
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
