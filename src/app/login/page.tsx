"use client";

import { User, userState } from "@/state/user";
import { useRouter } from "next/navigation";
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
    if (user.id && user.role) {
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
      .then(async (res) => {
        const { user }: { user: User } = await res.json();
        setUser({
          id: user.id,
          role: user.role,
        });
      })
      .catch((err) => {
        console.log(err);
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
      <Center width={"100vw"}>
        <Center flexFlow={"column"}>
          <Heading color="teal.200">Login</Heading>
          <FormControl>
            <FormLabel color="teal.200">Email address</FormLabel>
            <Input
              type="email"
              placeholder="example@hoge.com"
              isRequired
              id="email"
              ref={emailRef}
              color="teal.200"
            />
            <FormLabel color="teal.200">Password</FormLabel>
            <Input
              type="password"
              id="password"
              isRequired
              ref={passwordRef}
              color="teal.200"
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
