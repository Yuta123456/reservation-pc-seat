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
  Stack,
} from "@chakra-ui/react";

import { FC, useRef, useState } from "react";
import { shiftData } from "./mockdata";

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
  const [shiftArray, setShiftArray] = useState(shiftData);

  // 命名がゴミすぎる
  // もうちょい上手くやれそうな気はする
  const updateShiftArray = (i: number, startDate: Date, endDate: Date) => {
    const newShiftArray = JSON.parse(JSON.stringify(shiftArray)).map(
      (str: { startDate: string; endDate: string }) => {
        return {
          startDate: new Date(str.startDate),
          endDate: new Date(str.endDate),
        };
      }
    );
    newShiftArray[i] = { startDate, endDate };
    setShiftArray(newShiftArray);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>シフト修正</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {shiftArray.map((shift, i) => {
            return (
              <Stack paddingTop={"15px"} paddingBottom="40px" key={i}>
                <ShiftTimeInputForm
                  i={i}
                  shift={shift}
                  onDateUpdate={(i, startDate, endDate) => {
                    updateShiftArray(i, startDate, endDate);
                  }}
                />
              </Stack>
            );
          })}
        </ModalBody>
        <ModalFooter>
          <Button color={"white"} bg="teal.700" onClick={onClose}>
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
  onChange: (date: Date) => void;
};
const ShiftTimeEdit: FC<ShiftTimeEditProps> = ({ date, onChange }) => {
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
              onChange(newDate);
            }}
          />
          <NumberDecrementStepper
            onClick={() => {
              // Deep copy
              const newDate = new Date(JSON.parse(JSON.stringify(date)));
              newDate.setMinutes(newDate.getMinutes() - 30);
              onChange(newDate);
            }}
          />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
};

type ShiftTimeInputForm = {
  i: number;
  shift: {
    startDate: Date;
    endDate: Date;
  };
  onDateUpdate: (i: number, startDate: Date, endDate: Date) => void;
};
const ShiftTimeInputForm: FC<ShiftTimeInputForm> = ({
  i,
  shift,
  onDateUpdate,
}) => {
  return (
    <Box display={"flex"} flexDirection="row" alignItems={"center"}>
      <Text whiteSpace={"nowrap"} paddingRight="10px">
        {getShiftTimeInputForm(shift.startDate)}
      </Text>
      <ShiftTimeEdit
        date={shift.startDate}
        onChange={(date: Date) => {
          onDateUpdate(i, date, shift.endDate);
        }}
      />
      <Text>～</Text>
      <ShiftTimeEdit
        date={shift.endDate}
        onChange={(date: Date) => {
          onDateUpdate(i, shift.startDate, date);
        }}
      />
    </Box>
  );
};

const getShiftTimeInputForm = (date: Date) => {
  return `${date.getMonth() + 1}/${date.getDate()} ${
    displayWeekDayStr[date.getDay()]
  }`;
};
const displayWeekDayStr = [
  "日曜日",
  "月曜日",
  "火曜日",
  "水曜日",
  "木曜日",
  "金曜日",
  "土曜日",
];
