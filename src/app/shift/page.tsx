"use client";

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
  Badge,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FC } from "react";
import { LearningAssistantInfo, mockdata } from "./mockdata";
import Group from "./Group.svg";
export default function Home() {
  // NOTE: lg以上であれば描画するコンポーネントを変更するHooks
  const LAIntroCardLayout = useBreakpointValue({ base: "sp", lg: "pc" });

  if (LAIntroCardLayout === undefined) {
    return;
  }
  return (
    <Container maxW={"90vw"} margin="auto" padding="3.5rem 0">
      <Group height="200px"></Group>
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

const PCLAIntroCard: FC<LearningAssistantInfo> = ({
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
            size={{
              base: "md",
              xl: "xl",
            }}
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

const SPLAIntroCard: FC<LearningAssistantInfo> = ({
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
            size={{
              base: "md",
              xl: "xl",
            }}
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
