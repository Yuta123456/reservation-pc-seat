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
import { LearningAssistantInfo } from "../app/shift/mockdata";

type LaIntrocardProps = {
  laInfo: LearningAssistantInfo;
  onClick?: () => void;
};
export const PCLAIntroCard: FC<LaIntrocardProps> = ({ laInfo, onClick }) => {
  const { id, studentId, name, avatarURL, description, expert, hobby } = {
    ...laInfo,
  };
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

export const SPLAIntroCard: FC<LaIntrocardProps> = ({ laInfo, onClick }) => {
  const { id, studentId, name, avatarURL, description, expert, hobby } = {
    ...laInfo,
  };
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
