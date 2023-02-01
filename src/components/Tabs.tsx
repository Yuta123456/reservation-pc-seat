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
import { usePathname, useRouter } from "next/navigation";

const urls = ["/", "/shift", "/event"];

const tabStyle = {
  fontSize: "1.2rem",
  fontWeight: "600",
  fontcolor: "gray.200",
};
export const Navbar = () => {
  const pathname = usePathname();
  const [tabIndex, setTabIndex] = useState(0);

  // NOTE: この辺かなり危うい。urlsに入っていないpathに入るときもこのuseEffectが走る
  //       今はurlsに入っていない場合はstateを更新しないことで二つ目のuseEffectが発火しないようにしている。
  useEffect(() => {
    const newTabIndex = urls.indexOf(pathname || "/");
    if (newTabIndex !== -1) {
      setTabIndex(newTabIndex);
    }
  }, [pathname]);
  const router = useRouter();
  useEffect(() => {
    router.push(urls[tabIndex]);
  }, [tabIndex, router]);
  if (!pathname || !urls.includes(pathname)) {
    return <></>;
  }
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
        index={tabIndex}
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
