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
      <Stack paddingTop="15px">
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
    <Card>
      <CardBody>
        <Box display={"flex"}>
          <Avatar
            size="xl"
            name="Dan Abrahmov"
            src={eventImgUrl || ""}
            marginRight={"30px"}
          />
          <Box>
            <Heading size="md">{name}</Heading>
            <Text py="2">{description}</Text>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
};
