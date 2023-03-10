"use client";
import { Tabs, TabList, Tab, Box } from "@chakra-ui/react";
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
  const newTabIndex = urls.indexOf(pathname || "/");
  const [tabIndex, setTabIndex] = useState(
    newTabIndex === -1 ? 0 : newTabIndex
  );
  const router = useRouter();
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
        onChange={(index) => {
          setTabIndex(index);
          router.push(urls[index]);
        }}
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
