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
  IconButton,
} from "@chakra-ui/react";

import { FC, useEffect, useState } from "react";
import { useIsPc } from "@/Hooks/useIsPc";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { validateStudentId } from "@/utils/validation";
import { ReservationScheduleWithAuth } from "../reservation_table/ReservationTable";
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

export const ReservationEditForm: FC<ReservationFormProps> = ({
  isOpen,
  onClose,
  seat,
  period,
  id,
}) => {
  const isPc = useIsPc(undefined);
  const [isAbleEdit, setIsAbleEdit] = useState(false);
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
        <ModalHeader>予約変更フォーム</ModalHeader>
        <ModalCloseButton />
        {!isAbleEdit && (
          <ConfirmUser
            period={period}
            seat={seat}
            id={id}
            setIsAbleEdit={(isAbleEdit) => setIsAbleEdit(isAbleEdit)}
          />
        )}
        {isAbleEdit && (
          <EditReservation
            period={period}
            seat={seat}
            id={id}
            onClose={onClose}
          />
        )}
      </ModalContent>
    </Modal>
  );
};

type ConfirmUserProps = {
  period: number;
  seat: number;
  id: number;
  setIsAbleEdit: (isAbleEdit: boolean) => void;
};
const ConfirmUser: FC<ConfirmUserProps> = ({
  period,
  seat,
  setIsAbleEdit,
  id,
}) => {
  const [editKey, setEditKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  return (
    <>
      <ModalBody>
        <Box>
          <Text>
            {DisplayPeriod[period]}のPC{seat + 1}席の予約を変更しますか？
            <br />
            予約時の学籍番号のうちの一つか管理者番号を入力してください
          </Text>
          <Input
            marginBottom={"5px"}
            marginTop={"5px"}
            placeholder="学籍番号か管理者番号を入力"
            onChange={(e) => setEditKey(e.target.value)}
          />
        </Box>
      </ModalBody>

      <ModalFooter>
        <Button
          isLoading={isLoading}
          colorScheme="blue"
          isDisabled={editKey.length === 0}
          onClick={async () => {
            setIsLoading(true);
            fetch("api/auth/reservation/edit-confirm", {
              method: "POST",
              body: JSON.stringify({ id, editKey }),
            })
              .then(async (res) => {
                if (!res.ok) {
                  const { message } = await res.json();
                  throw new Error(message);
                }
                toast({
                  title: "認証しました",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                });
                setIsAbleEdit(true);
              })
              .catch((e) => {
                console.log(e);
                toast({
                  title: "認証に失敗しました",
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
          変更する
        </Button>
      </ModalFooter>
    </>
  );
};

type EditReservationProps = {
  period: number;
  seat: number;
  id: number;
  onClose: () => void;
};
const EditReservation: FC<EditReservationProps> = ({
  period,
  seat,
  id,
  onClose,
}) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [studentsIds, setStudentsIds] = useState<string[]>([""]);
  const [numberOfForm, setNumberOfForm] = useState<number>(1);
  useEffect(() => {
    fetch("api/auth/reservation/today")
      .then((res) => res.json())
      .then((res) => res.reservationSchedule)
      .then((res: ReservationScheduleWithAuth[][]) => {
        const targetReservations = res[seat].filter(
          (r) => r.seat === seat && r.period === period
        );
        if (targetReservations.length !== 1) {
          throw new Error("予約情報がおかしい");
        }
        setNumberOfForm(targetReservations[0].studentIds.length);
        setStudentsIds(targetReservations[0].studentIds);
        setIsFetched(true);
      })
      .catch((e) => {
        toast({
          title: "データの取得に失敗しました",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      {isFetched ? (
        <>
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
                    value={studentsIds[i]}
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
              onClick={async () => {
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
                  method: "PUT",
                  body: JSON.stringify({ id, studentsIds }),
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
                    // 成功した時のみ閉じる
                    onClose();
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
                  });
              }}
            >
              予約する
            </Button>
            <Button
              isLoading={isLoading}
              colorScheme="red"
              onClick={async () => {
                setIsLoading(true);
                fetch("api/auth/reservation", {
                  method: "DELETE",
                  body: JSON.stringify({ id }),
                })
                  .then(async (res) => {
                    if (!res.ok) {
                      throw new Error("失敗しました");
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
              ml="3"
            >
              削除する
            </Button>
          </ModalFooter>
        </>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};
