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
  Button,
} from "@chakra-ui/react";
import useSWR from "swr";
import { FC, useState } from "react";
import { CreateEventModal } from "./createEventModal";

export default function Home() {
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
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
    <>
      <Container maxW={"90vw"} margin="auto" padding="3.5rem 0">
        <Box display={"flex"}>
          <Heading fontSize={pageHeadline} whiteSpace="nowrap">
            開催中のイベント
          </Heading>
          <Box display="flex" w="100%" justifyContent={"right"}>
            <Button
              color={"white"}
              bg="teal.700"
              onClick={() => {
                setShowCreateEventModal(true);
              }}
            >
              新しいイベントを追加
            </Button>
          </Box>
        </Box>
        <SimpleGrid minChildWidth="340px" spacing="20px" paddingTop={"15px"}>
          {data.events.map((eventDetail: EventDetail) => (
            <EventDetailCard key={eventDetail.id} {...eventDetail} />
          ))}
        </SimpleGrid>
      </Container>
      {showCreateEventModal && (
        <CreateEventModal
          isOpen={showCreateEventModal}
          onClose={() => setShowCreateEventModal(false)}
        />
      )}
    </>
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
