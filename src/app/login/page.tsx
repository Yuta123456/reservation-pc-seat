"use client";

import { userState } from "@/state/user";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "../common/components";

export default function Home() {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const toast = useToast();
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      return;
    }
    fetch("api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        toast({
          title: "ログインに失敗しました",
          status: "error",
          duration: 2000,
        });
      });
  };
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Center bg="teal.300" width={"100vw"} height={"100vh"}>
        <Center bg="teal.300" flexFlow={"column"}>
          <Heading color="white">Login</Heading>
          <FormControl>
            <FormLabel color="white">Email address</FormLabel>
            <Input
              type="email"
              placeholder="example@hoge.com"
              isRequired
              id="email"
              ref={emailRef}
              color="White"
            />
            <FormLabel color="white">Password</FormLabel>
            <Input
              type="password"
              id="password"
              isRequired
              ref={passwordRef}
              color="White"
            />
            <Button mt={4} onClick={handleSubmit}>
              Login
            </Button>
          </FormControl>
        </Center>
      </Center>
    </>
  );
}
