"use client";

import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  Button,
  CardFooter,
  Text,
  WrapItem,
  Avatar,
  Stack,
  Badge,
} from "@chakra-ui/react";
import { FC } from "react";
import { LearningAssistantInfo, mockdata } from "./mockdata";

export default function Home() {
  return (
    <Container maxW={"90vw"} margin="auto" padding="3.5rem 0">
      <Heading>勤務中のLA</Heading>
      <Stack paddingTop="15px">
        {mockdata.map((laInfo) => (
          <LAIntroCard key={laInfo.id} {...laInfo} />
        ))}
      </Stack>
    </Container>
  );
}

const LAIntroCard: FC<LearningAssistantInfo> = ({
  id,
  studentId,
  name,
  avatarURL,
  description,
  expert,
  hobby,
}) => {
  return (
    <Card>
      <CardBody>
        <Box display={"flex"}>
          <Avatar
            size="xl"
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
            // src={avatarURL}
            marginRight={"30px"}
          />
          <Box>
            <Heading size="md">{name}</Heading>
            <Text py="2">{description}</Text>
            <Stack direction="row">
              {expert.map((exp, i) => (
                <Badge key={i} colorScheme="green">
                  {exp}
                </Badge>
              ))}
            </Stack>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
};