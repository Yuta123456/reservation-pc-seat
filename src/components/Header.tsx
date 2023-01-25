"use client";
import { useIsPc } from "@/Hooks/useIsPc";
import { Box, Button, Link, Text } from "../app/common/components";
import NextLink from "next/link";
import { useRecoilState } from "recoil";
import { userState } from "@/state/user";
import { FC } from "react";
import { usePathname } from "next/navigation";

export const Header = () => {
  const isPc = useIsPc(undefined);
  const [user, _] = useRecoilState(userState);
  const pathname = usePathname();
  const isHiddenButton =
    (user.id !== "" && user.role !== "") || pathname === "/login";
  console.log(pathname);
  if (isPc === undefined) {
    return <></>;
  }
  return (
    <>
      {isPc ? (
        <PCHeader isHiddenButton={isHiddenButton}></PCHeader>
      ) : (
        <SPHeader isHiddenButton={isHiddenButton}></SPHeader>
      )}
    </>
  );
};

type HeaderProps = {
  isHiddenButton: boolean;
};
const PCHeader: FC<HeaderProps> = ({ isHiddenButton }) => {
  return (
    <Box
      bg="teal.700"
      w="100vw"
      color="white"
      h="100px"
      alignItems="center"
      display={"flex"}
    >
      <Box
        maxW={"900px"}
        w="100%"
        margin={"auto"}
        display={"flex"}
        alignItems="center"
      >
        <Text fontSize={"1.5rem"} fontFamily="fantasy">
          <Link as={NextLink} href={"/"}>
            Learning Commons PC 予約
          </Link>
        </Text>
        {!isHiddenButton && (
          <Box alignItems={"right"}>
            <Button colorScheme="red" variant="putline">
              <Link as={NextLink} href={"/login"}>
                Login
              </Link>
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
const SPHeader: FC<HeaderProps> = ({ isHiddenButton }) => {
  return (
    <Box
      bg="teal.700"
      w="100vw"
      color="white"
      h="50px"
      alignItems="center"
      display={"flex"}
    >
      <Box
        maxW={"900px"}
        w="100%"
        margin={"auto"}
        display={"flex"}
        justifyContent="center"
      >
        <Text fontSize={"1rem"} fontFamily="fantasy">
          <Link as={NextLink} href={"/"}>
            Learning Commons PC 予約
          </Link>
        </Text>
      </Box>
      {!isHiddenButton && (
        <Box alignItems={"right"}>
          <Button colorScheme="red" variant="putline">
            <Link as={NextLink} href={"/login"}>
              Login
            </Link>
          </Button>
        </Box>
      )}
    </Box>
  );
};
