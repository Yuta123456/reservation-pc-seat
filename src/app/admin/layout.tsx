"use client";

import { useRecoilState } from "recoil";
import { userState } from "@/state/user";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { isAdmin, login } from "@/utils/login";
import { Toast } from "@chakra-ui/react";

// const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (user.user === null) {
      // access_tokenでログイン促し、それでもログイン出来なければ admin/loginへリダイレクト
      login(undefined, setUser).catch((e) => {
        router.push("/login");
      });
    } else {
      // userが初期化されていた場合
      if (user.isAdmin === undefined) {
        router.push("admin/not-admin");
      }
    }
  }, [router, user.user, setUser, user.isAdmin]);
  if (pathname !== "admin/not-admin" && user.user === null) {
    return <></>;
  }
  return <>{children}</>;
}
