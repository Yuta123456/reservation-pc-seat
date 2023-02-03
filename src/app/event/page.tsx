"use client";
import { FC, useEffect, useState } from "react";
import { EventDetail } from "./mockdata";
import {
  Box,
  Card,
  CardBody,
  Container,
  Heading,
  Text,
  Avatar,
  Stack,
  Badge,
  Image,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { imageSizeStyle, pageHeadline } from "@/style/style";

export default function Home() {
  const [events, setEvents] = useState<EventDetail[]>([]);

  useEffect(() => {
    fetch("api/event/event")
      .then((res) => res.json())
      .then((res) => res.events)
      .then((res) => {
        console.log(res);
        setEvents(res);
      });
  }, []);

  return (
    <Container maxW={"90vw"} margin="auto" padding="3rem 0">
      <Heading fontSize={pageHeadline}>開催中のイベント</Heading>
      <SimpleGrid minChildWidth="340px" spacing="20px" paddingTop={"15px"}>
        {events.map((eventDetail) => (
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
