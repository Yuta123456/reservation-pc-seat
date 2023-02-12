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
import { mockdata } from "./mockdata";
import { PCLAIntroCard, SPLAIntroCard } from "@/components/LaIntrocard";
import { EditLAShiftModal } from "./EditLAShiftModal";

export default function Home() {
  const LAIntroCardLayout = useBreakpointValue({ base: "sp", lg: "pc" });
  const [showShiftEditModal, setShowShiftEditModal] = useState(false);
  const onCardClick = (key: number) => {
    setShowShiftEditModal(true);
  };
  if (LAIntroCardLayout === undefined) {
    return;
  }
  return (
    <>
      <Container maxW={"90vw"} margin="auto" padding="3.5rem 0">
        <Heading fontSize={pageHeadline}>勤務中のLA</Heading>
        <Stack paddingTop={"15px"} paddingBottom="40px">
          {LAIntroCardLayout === "sp"
            ? mockdata
                .slice(0, 2)
                .map((laInfo) => (
                  <SPLAIntroCard
                    key={laInfo.id}
                    laInfo={laInfo}
                    onClick={onCardClick}
                  />
                ))
            : mockdata
                .slice(0, 2)
                .map((laInfo) => (
                  <PCLAIntroCard
                    key={laInfo.id}
                    laInfo={laInfo}
                    onClick={onCardClick}
                  />
                ))}
        </Stack>
        <Heading fontSize={pageHeadline}>LA一覧</Heading>
        <Stack paddingTop="px">
          {LAIntroCardLayout === "sp"
            ? mockdata.map((laInfo) => (
                <SPLAIntroCard
                  key={laInfo.id}
                  laInfo={laInfo}
                  onClick={onCardClick}
                />
              ))
            : mockdata.map((laInfo) => (
                <PCLAIntroCard
                  key={laInfo.id}
                  laInfo={laInfo}
                  onClick={onCardClick}
                />
              ))}
        </Stack>
        {showShiftEditModal && (
          <EditLAShiftModal
            isOpen={showShiftEditModal}
            onClose={() => {
              setShowShiftEditModal(false);
            }}
          />
        )}
      </Container>
    </>
  );
}
