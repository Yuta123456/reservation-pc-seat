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

import { AddIcon } from "@chakra-ui/icons";

import { FC, useState } from "react";
type ReservationFormProps = {
  isOpen: boolean;
  onClose: () => void;
  seat: string;
  period: string;
};
export const ReservationForm: FC<ReservationFormProps> = ({
  isOpen,
  onClose,
  seat,
  period,
}) => {
  const [studentsIds, setStudentsIds] = useState<string[]>([]);
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
            {period}時限目の{seat}席を予約しますか？
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
            <IconButton
              aria-label="Search database"
              icon={<AddIcon />}
              onClick={() => {
                setNumberOfForm((n) => {
                  return n + 1;
                });
              }}
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
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
