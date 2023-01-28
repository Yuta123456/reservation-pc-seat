import { UserState } from "@/state/user";
import { Session, User } from "@supabase/supabase-js";

export type LoginInfo = {
  email: string | undefined;
  password: string | undefined;
};

export const login = async (
  loginInfo: LoginInfo | undefined,
  setUser: (user: UserState) => void
) => {
  const access_token = sessionStorage.getItem("access_token");

  if (
    access_token === null &&
    (!loginInfo || !loginInfo.email || !loginInfo.password)
  ) {
    return;
  }
  const refresh_token = sessionStorage.getItem("refresh_token");
  const expires_at = sessionStorage.getItem("expires_at");

  const requestBody = {
    email: loginInfo?.email,
    password: loginInfo?.password,
    access_token,
    // 必要が無い場合は不用意にrefresh_tokenを送らない
    refresh_token:
      new Date() > new Date(Number(expires_at) * 1000)
        ? refresh_token
        : undefined,
  };

  await fetch("api/auth/login", {
    method: "POST",
    body: JSON.stringify(requestBody),
  })
    .then(async (res) => {
      const {
        authResponce,
      }: {
        authResponce: { user: User | null; session: Session | null };
      } = await res.json();
      const session = authResponce.session;
      if (authResponce.user !== null) {
        const newUser: UserState = {
          user: authResponce.user,
          session,
        };
        setUser(newUser);
      }
      if (session !== null) {
        sessionStorage.setItem("access_token", session.access_token);
        sessionStorage.setItem("refresh_token", session.refresh_token);
        sessionStorage.setItem("expires_at", String(session.expires_at));
      }
    })
    .catch((e) => console.log(e));
};
