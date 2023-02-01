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
} from "@chakra-ui/react";

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
    <Container maxW={"90vw"} margin="auto" padding="3.5rem 0">
      <Heading>開催中のイベント</Heading>
      <Stack paddingTop="15px" flexWrap="wrap" flexDirection={"row"}>
        {events.map((eventDetail) => (
          <EventDetailCard key={eventDetail.id} {...eventDetail} />
        ))}
      </Stack>
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
    <Card maxW="sm" minW="sm">
      <CardBody>
        <Image
          alt="イベント画像"
          marginRight={"30px"}
          borderRadius="lg"
          boxSize="300px"
          src={eventImgUrl || ""}
        />
        <Heading size="md">{name}</Heading>
        <Text py="2">{description}</Text>
      </CardBody>
    </Card>
  );
};
