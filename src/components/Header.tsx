"use client";
import { useIsPc } from "@/Hooks/useIsPc";
import { Box, Button, IconButton, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRecoilState } from "recoil";
import { userState } from "@/state/user";
import { FC, useState } from "react";
import { usePathname } from "next/navigation";
import { SearchReservationModal } from "./search_reservation/SearchReservation";
import { AiOutlineSearch } from "react-icons/ai";

export const Header = () => {
  const isPc = useIsPc(undefined);
  const [user, _] = useRecoilState(userState);
  const pathname = usePathname();
  const [isOpenSearchReservation, setIsOpenSearchReservation] = useState(false);
  const isHiddenButton =
    (user.id !== "" && user.role !== "") || pathname === "/login";
  if (isPc === undefined) {
    return <></>;
  }
  return (
    <>
      {isPc ? (
        <PCHeader
          isHiddenButton={isHiddenButton}
          setIsOpenSearchReservation={() =>
            setIsOpenSearchReservation((prev) => !prev)
          }
        ></PCHeader>
      ) : (
        <SPHeader
          isHiddenButton={isHiddenButton}
          setIsOpenSearchReservation={() =>
            setIsOpenSearchReservation((prev) => !prev)
          }
        ></SPHeader>
      )}
      {isOpenSearchReservation && (
        <SearchReservationModal
          isOpen={isOpenSearchReservation}
          onClose={() => setIsOpenSearchReservation(false)}
        />
      )}
    </>
  );
};

type HeaderProps = {
  isHiddenButton: boolean;
  setIsOpenSearchReservation: () => void;
};
const PCHeader: FC<HeaderProps> = ({
  isHiddenButton,
  setIsOpenSearchReservation,
}) => {
  return (
    <Box
      bg="teal.700"
      w="100%"
      color="white"
      h="100px"
      alignItems="center"
      display={"flex"}
    >
      <Box
        maxW={"90vw"}
        w="100%"
        margin={"auto"}
        display={"flex"}
        alignItems="center"
      >
        <Text fontSize={"1.5rem"} fontFamily="fantasy" whiteSpace={"nowrap"}>
          <Link as={NextLink} href={"/"}>
            Learning Commons PC 予約
          </Link>
        </Text>
        <Box w="100%" display={"flex"} justifyContent="flex-end">
          {!isHiddenButton ? (
            <Button
              colorScheme="red"
              variant="putline"
              display="flex"
              justifyContent={"flex-end"}
              size="lg"
            >
              <Link as={NextLink} href={"/login"}>
                Login
              </Link>
            </Button>
          ) : (
            <IconButton
              aria-label="search"
              icon={<AiOutlineSearch />}
              onClick={setIsOpenSearchReservation}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
const SPHeader: FC<HeaderProps> = ({
  isHiddenButton,
  setIsOpenSearchReservation,
}) => {
  return (
    <Box
      bg="teal.700"
      w="100vw"
      color="white"
      h="70px"
      display={"flex"}
      alignItems="center"
    >
      <Box maxW={"90vw"} w="100%" margin={"auto"} display={"flex"}>
        <Box display={"flex"} alignItems="center">
          <Text
            fontSize={"1rem"}
            fontFamily="fantasy"
            alignItems="center"
            whiteSpace={"nowrap"}
          >
            <Link as={NextLink} href={"/"}>
              Learning Commons PC 予約
            </Link>
          </Text>
        </Box>
        <Box justifyContent={"flex-end"} display="flex" w="100%">
          {!isHiddenButton ? (
            <Button colorScheme="red" variant="putline">
              <Link as={NextLink} href={"/login"}>
                Login
              </Link>
            </Button>
          ) : (
            <IconButton
              aria-label="search"
              icon={<AiOutlineSearch />}
              onClick={setIsOpenSearchReservation}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
