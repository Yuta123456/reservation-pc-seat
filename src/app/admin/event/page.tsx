"use client";

import { EventDetail } from "@/app/event/mockdata";
import { imageSizeStyle, pageHeadline } from "@/style/style";
import {
  Box,
  Card,
  CardBody,
  Container,
  Heading,
  Text,
  Stack,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import useSWR from "swr";
import { FC, useState } from "react";

// model Event {
//   id          Int      @id @default(autoincrement())
//   name        String
//   eventImgUrl String
//   description String
//   startDate   DateTime
//   endDate     DateTime
// }
export default function Home() {
  const handleSubmit = () => {
    console.log("submit");
  };
  const { data, error, isLoading } = useSWR<{ events: EventDetail[] }>(
    "/api/event/event"
  );

  if (error || isLoading || !data) {
    return;
  }
  return (
    <Container maxW={"90vw"} margin="auto" padding="3.5rem 0">
      <Heading fontSize={pageHeadline}>開催中のイベント</Heading>
      <SimpleGrid minChildWidth="340px" spacing="20px" paddingTop={"15px"}>
        {data.events.map((eventDetail: EventDetail) => (
          <EventDetailCard key={eventDetail.id} {...eventDetail} />
        ))}
      </SimpleGrid>
    </Container>
  );
}

const EventDetailCard: FC<EventDetail> = ({
  id,
  name,
  eventImgUrl,
  startDate,
  endDate,
  description,
}) => {
  return (
    <Card>
      <Stack direction={{ base: "row", xl: "column" }} overflow="hidden">
        <Box alignItems={"center"} display="flex" justifyContent={"center"}>
          <Image
            alt="イベント画像"
            borderRadius="lg"
            boxSize={imageSizeStyle}
            src={eventImgUrl || ""}
          />
        </Box>
        <CardBody>
          <Heading size="md">{name}</Heading>
          <Text
            pt="2"
            noOfLines={{
              sm: 2,
              md: 3,
              xl: 1,
            }}
          >
            {description}
          </Text>
        </CardBody>
      </Stack>
    </Card>
  );
};
