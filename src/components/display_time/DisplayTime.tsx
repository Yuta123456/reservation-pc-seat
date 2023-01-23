import { useTime } from "@/Hooks/useTime";
import { Text, Box } from "../../app/common/components";
import dayjs from "dayjs";
export const DisplayTime = () => {
  const time = useTime(1000);
  return (
    <Box width={"100%"} textAlign="center" padding={"15px"}>
      <Text fontSize={"1.5rem"}>{dayjs(time).format("M月D日 HH:mm")}</Text>
    </Box>
  );
};
