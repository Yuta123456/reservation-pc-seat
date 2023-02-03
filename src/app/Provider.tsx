"use client";

import useSWR, { SWRConfig } from "swr";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ provider: () => new Map(), fetcher }}>
      <RecoilRoot>
        <ChakraProvider>{children}</ChakraProvider>
      </RecoilRoot>
    </SWRConfig>
  );
}
