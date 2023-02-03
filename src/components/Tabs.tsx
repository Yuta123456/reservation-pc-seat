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
  fontWeight: "600",
  color: "gray.200",
  fontSize: {
    base: "14px",
    xl: "16px",
  },
};

const tabsName = ["PC席予約", "シフト", "イベント"];
export const Navbar = () => {
  const pathname = usePathname();
  const [tabIndex, setTabIndex] = useState<number | undefined>(0);

  // NOTE: この辺かなり危うい。urlsに入っていないpathに入るときもこのuseEffectが走る
  //       今はurlsに入っていない場合はstateを更新しないことで二つ目のuseEffectが発火しないようにしている。
  //       routerが更新されたときも発火するのできつい
  useEffect(() => {
    const newTabIndex = urls.indexOf(pathname || "/");
    if (newTabIndex !== -1) {
      setTabIndex(undefined);
    }
  }, [pathname]);
  const router = useRouter();
  useEffect(() => {
    if (tabIndex) {
      router.push(urls[tabIndex]);
    }
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
      paddingTop="10px"
      paddingBottom={"5px"}
    >
      <Tabs
        onChange={(index) => setTabIndex(index)}
        w={"100%"}
        colorScheme="whatsapp"
        index={tabIndex}
        color="gray.100"
      >
        <TabList borderBottom={"none"}>
          {tabsName.map((name, i) => (
            <Tab key={i} {...tabStyle}>
              {name}
            </Tab>
          ))}
        </TabList>
      </Tabs>
    </Box>
  );
};
