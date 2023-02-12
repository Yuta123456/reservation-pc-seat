"use client";

import { PCLAIntroCard, SPLAIntroCard } from "@/components/LaIntrocard";
import { pageHeadline } from "@/style/style";
import {
  Box,
  Card,
  CardBody,
  Container,
  Heading,
  Text,
  Avatar,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FC } from "react";
import { mockdata } from "./mockdata";

export default function Home() {
  // NOTE: lg以上であれば描画するコンポーネントを変更するHooks
  const LAIntroCardLayout = useBreakpointValue({ base: "sp", lg: "pc" });

  if (LAIntroCardLayout === undefined) {
    return;
  }
  return (
    <Container maxW={"90vw"} margin="auto" padding="3.5rem 0">
      <Heading fontSize={pageHeadline}>勤務中のLA</Heading>
      <Stack paddingTop="15px">
        {LAIntroCardLayout === "sp"
          ? mockdata.map((laInfo) => (
              <SPLAIntroCard key={laInfo.id} {...laInfo} />
            ))
          : mockdata.map((laInfo) => (
              <PCLAIntroCard key={laInfo.id} {...laInfo} />
            ))}
      </Stack>
    </Container>
  );
}
