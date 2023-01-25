"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
// import { UserProvider } from "@supabase/auth-helpers-react";
export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <ChakraProvider>{children}</ChakraProvider>
    </RecoilRoot>
  );
}
