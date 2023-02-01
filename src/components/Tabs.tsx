"use client";
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  useColorModeValue,
  Box,
  useFocusEffect,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const urls = ["/", "shift", "event"];

const tabStyle = {
  fontSize: "1.2rem",
  fontWeight: "600",
  fontcolor: "gray.200",
};
export const Navbar = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const router = useRouter();
  useEffect(() => {
    router.push(urls[tabIndex]);
  }, [tabIndex, router]);
  return (
    <Box
      w="100%"
      alignItems="center"
      display={"flex"}
      maxW={"90vw"}
      margin={"auto"}
      padding="10px 0"
    >
      <Tabs
        onChange={(index) => setTabIndex(index)}
        w={"100%"}
        colorScheme="teal"
      >
        <TabList>
          <Tab {...tabStyle}>PC席予約</Tab>
          <Tab {...tabStyle}>シフト</Tab>
          <Tab {...tabStyle}>イベント</Tab>
        </TabList>
      </Tabs>
    </Box>
  );
};
