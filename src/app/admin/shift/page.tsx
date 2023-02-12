"use client";

import { EventDetail } from "@/app/event/mockdata";
import { imageSizeStyle, pageHeadline } from "@/style/style";
import {
  Box,
  Card,
  CardBody,
  Container,
  Heading,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import useSWR from "swr";
import { FC, useState } from "react";

export default function Home() {
  const LAIntroCardLayout = useBreakpointValue({ base: "sp", lg: "pc" });

  if (LAIntroCardLayout === undefined) {
    return;
  }
  return (
    <>
      <Container maxW={"90vw"} margin="auto" padding="3.5rem 0">
        <Box display={"flex"}>
          <Heading fontSize={pageHeadline} whiteSpace="nowrap">
            LA一覧
          </Heading>
          <Stack paddingTop="15px">
            {LAIntroCardLayout === "sp"
              ? mockdata.map((laInfo) => (
                  <SPLAIntroCard key={laInfo.id} {...laInfo} />
                ))
              : mockdata.map((laInfo) => (
                  <PCLAIntroCard key={laInfo.id} {...laInfo} />
                ))}
          </Stack>
        </Box>
      </Container>
    </>
  );
}
