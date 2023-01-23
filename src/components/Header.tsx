import { Box, Text } from "../app/common/components";

export const Header = () => {
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
