"use client";
import { useIsPc } from "@/Hooks/useIsPc";
import { Box, Button, Text } from "../app/common/components";

export const Header = () => {
  const isPc = useIsPc(undefined);
  if (isPc === undefined) {
    return <></>;
  }
  return <>{isPc ? <PCHeader></PCHeader> : <SPHeader></SPHeader>}</>;
};

const PCHeader = () => {
  return (
    <Box
      bg="teal"
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
        <Text fontSize={"1.5rem"}>Learning Commons PC Reservation</Text>
      </Box>
    </Box>
  );
};
const SPHeader = () => {
  return (
    <Box
      bg="teal.200"
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
          Learning Commons PC 予約
        </Text>
      </Box>
      <Box alignItems={"right"}>
        <Button colorScheme="red" variant="putline">
          Login
        </Button>
      </Box>
    </Box>
  );
};
