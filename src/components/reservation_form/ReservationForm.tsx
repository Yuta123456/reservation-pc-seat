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
  IconButton,
  useToast,
} from "../../app/common/components";

import { AddIcon, MinusIcon } from "@chakra-ui/icons";

import { FC, useState } from "react";

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
  const toast = useToast();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>予約フォーム</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            {DisplayPeriod[period]}のPC{seat + 1}席を予約しますか？
            {[...Array(numberOfForm)].map((_, i) => {
              return (
                <Input
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
            <Box display={"flex"} justifyContent="flex-end">
              <IconButton
                aria-label="Search database"
                icon={<AddIcon />}
                onClick={() => {
                  setNumberOfForm((n) => {
                    return n + 1;
                  });
                  setStudentsIds((prevStudentIds) => {
                    const newStudentIds = [...prevStudentIds];
                    newStudentIds.push("");
                    return newStudentIds;
                  });
                }}
              />
              <IconButton
                aria-label="Search database"
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
              />
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            isDisabled={studentsIds.some((v) => v.length === 0)}
            onClick={() => {
              onClose();
              toast({
                title: "予約しました",
                status: "success",
                duration: 2000,
                isClosable: true,
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
