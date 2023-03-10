"use client";
import { Tabs, TabList, Tab, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import NextLink from "next/link";
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
        }}
        w={"100%"}
        colorScheme="whatsapp"
        index={tabIndex}
        color="gray.100"
      >
        <TabList borderBottom={"none"}>
          {tabsName.map((name, i) => {
            return (
              <Tab key={i} {...tabStyle}>
                <NextLink href={urls[i]}>{name}</NextLink>
              </Tab>
            );
          })}
        </TabList>
      </Tabs>
    </Box>
  );
};
