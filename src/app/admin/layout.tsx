"use client";

import { useRecoilState } from "recoil";
import { userState } from "@/state/user";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { isAdmin, login } from "@/utils/login";
import { Toast, useToast } from "@chakra-ui/react";

// const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const pathname = usePathname();
  const toast = useToast();
  useEffect(() => {
    if (user.user === null) {
      // access_tokenでログイン促し、それでもログイン出来なければ admin/loginへリダイレクト
      console.log("user.user === null");
      login(undefined, setUser).catch((e) => {
        toast({
          title: "管理画面を使う場合はログインしてください",
          status: "error",
          duration: 2000,
        });
      });
    } else {
      console.log("user.user !== null", user.user);
      // userが初期化されていた場合
      if (user.isAdmin === undefined) {
        toast({
          title: "管理画面を使う場合はログインしてください",
          status: "error",
          duration: 2000,
        });
      }
    }
  }, [router, user.user, setUser, user.isAdmin, toast]);

  if (pathname !== "admin/not-admin" && user.user === null) {
    return <></>;
  }
  return <>{children}</>;
}
