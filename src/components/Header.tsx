"use client";
import { useIsPc } from "@/Hooks/useIsPc";
import { Box, Heading, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC, useState } from "react";
import { usePathname } from "next/navigation";
import { SearchReservationModal } from "./search_reservation/SearchReservation";
import { AiOutlineSearch } from "react-icons/ai";
import { Navbar } from "./Tabs";
import { headingStyle } from "@/style/style";

export const Header = () => {
  const isPc = useIsPc(undefined);
  const pathname = usePathname();
  // そのうちLA検索やいべんとの検索が出来るようにしたい
  const [isOpenSearchReservation, setIsOpenSearchReservation] = useState(false);
  const isPCReservePage = pathname === "/";
  if (isPc === undefined) {
    return <></>;
  }
  return (
    <>
      {isPc ? (
        <PCHeader
          setIsOpenSearchReservation={() =>
            setIsOpenSearchReservation((prev) => !prev)
          }
          isPCReservePage={isPCReservePage}
        />
      ) : (
        <SPHeader
          setIsOpenSearchReservation={() =>
            setIsOpenSearchReservation((prev) => !prev)
          }
          isPCReservePage={isPCReservePage}
        />
      )}
      {isOpenSearchReservation && (
        <SearchReservationModal
          isOpen={isOpenSearchReservation}
          onClose={() => setIsOpenSearchReservation(false)}
        />
      )}
    </>
  );
};

type HeaderProps = {
  setIsOpenSearchReservation: () => void;
  isPCReservePage: boolean;
};

const PCHeader: FC<HeaderProps> = ({
  setIsOpenSearchReservation,
  isPCReservePage,
}) => {
  return (
    <Box
      bg="#EFB134"
      w="100%"
      color="white"
      alignItems="center"
      display={"flex"}
      h="120px"
    >
      <Box maxW={"90vw"} w="100%" margin={"auto"}>
        <Box display={"flex"} alignItems="center" pt="20px">
          <Heading fontSize={headingStyle} whiteSpace={"nowrap"}>
            <NextLink href={"/"}>Learning Commons PC席予約システム</NextLink>
          </Heading>
          <Box w="100%" display={"flex"} justifyContent="flex-end">
            {isPCReservePage && (
              <IconButton
                aria-label="search"
                onClick={setIsOpenSearchReservation}
                variant="putline"
                fontSize="2rem"
                icon={<AiOutlineSearch />}
              />
            )}
          </Box>
        </Box>
        <Navbar />
      </Box>
    </Box>
  );
};
const SPHeader: FC<HeaderProps> = ({
  setIsOpenSearchReservation,
  isPCReservePage,
}) => {
  return (
    <Box
      bg="#EFB134"
      w="100%"
      color="white"
      alignItems="center"
      display={"flex"}
      h="120px"
    >
      <Box maxW={"90vw"} w="100%" margin={"auto"}>
        <Box display={"flex"} alignItems="center" pt="20px">
          <Heading alignItems="center" whiteSpace={"nowrap"}>
            <NextLink href={"/"}>LC PC 予約</NextLink>
          </Heading>
          <Box justifyContent={"flex-end"} display="flex" w="100%">
            {isPCReservePage && (
              <IconButton
                aria-label="search"
                onClick={setIsOpenSearchReservation}
                variant="putline"
                fontSize="2rem"
                icon={<AiOutlineSearch />}
              />
            )}
          </Box>
        </Box>
        <Box>
          <Navbar />
        </Box>
      </Box>
    </Box>
  );
};
