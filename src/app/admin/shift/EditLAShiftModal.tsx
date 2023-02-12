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
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
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

type EditLAShiftModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const EditLAShiftModal: FC<EditLAShiftModalProps> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();
  const nameRef = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const [startDate, setStartDate] = useState(
    new Date("Mon Feb 13 2023 11:00:00")
  );
  const [endDate, setEndDate] = useState(new Date("Mon Feb 13 2023 13:00:00"));
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>シフト修正</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display={"flex"} flexDirection="row" alignItems={"center"}>
            <Text whiteSpace={"nowrap"} paddingRight="10px">
              月曜日
            </Text>
            <ShiftTimeEdit
              date={startDate}
              setDate={(date: Date) => {
                setStartDate(date);
              }}
            />
            <Text>～</Text>
            <ShiftTimeEdit
              date={endDate}
              setDate={(date: Date) => {
                setEndDate(date);
              }}
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button color={"white"} bg="teal.700">
            保存する
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const formatDateToDisplay = (date: Date) => {
  return `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};

type ShiftTimeEditProps = {
  date: Date;
  setDate: (date: Date) => void;
};
const ShiftTimeEdit: FC<ShiftTimeEditProps> = ({ date, setDate }) => {
  return (
    <FormControl>
      <NumberInput min={0} max={24} value={formatDateToDisplay(date)}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper
            onClick={() => {
              // Deep copy
              const newDate = new Date(JSON.parse(JSON.stringify(date)));
              newDate.setMinutes(newDate.getMinutes() + 30);
              setDate(newDate);
            }}
          />
          <NumberDecrementStepper
            onClick={() => {
              // Deep copy
              const newDate = new Date(JSON.parse(JSON.stringify(date)));
              newDate.setMinutes(newDate.getMinutes() - 30);
              setDate(newDate);
            }}
          />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
};
