"use client";

import { ChakraProvider } from "@chakra-ui/react";
// import { UserProvider } from "@supabase/auth-helpers-react";
export default function Provider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
