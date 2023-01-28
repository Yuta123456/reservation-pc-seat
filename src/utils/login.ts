import { UserState } from "@/state/user";
import { Session, User } from "@supabase/supabase-js";
import { SetterOrUpdater } from "recoil";

export type LoginInfo = {
  email: string | undefined;
  password: string | undefined;
};

export const login = async (
  loginInfo: LoginInfo | undefined,
  setUser: SetterOrUpdater<UserState>
) => {
  const sessionStr = sessionStorage.getItem("session");
  const session: Session = JSON.parse(sessionStr !== null ? sessionStr : "{}");
  if (
    !session.access_token &&
    (!loginInfo || !loginInfo.email || !loginInfo.password)
  ) {
    return;
  }

  const requestBody = {
    email: loginInfo?.email,
    password: loginInfo?.password,
    // 必要が無い場合は不用意にrefresh_tokenを送らない
    refresh_token:
      new Date() > new Date(Number(session.expires_at) * 1000)
        ? session.refresh_token
        : undefined,
  };

  await fetch("api/auth/login", {
    method: "POST",
    headers: session.access_token
      ? {
          Authorization: "Bearer " + session.access_token,
        }
      : {},
    body: JSON.stringify(requestBody),
  })
    .then(async (res) => {
      const {
        authResponce,
      }: {
        authResponce: { user: User | null; session: Session | null };
      } = await res.json();

      if (authResponce.session !== null) {
        sessionStorage.setItem("session", JSON.stringify(authResponce.session));
      }
      setUser((oldUser) => {
        return {
          user: authResponce.user || oldUser.user,
          session: authResponce.session || oldUser.session || session,
        };
      });
    })
    .catch((e) => console.log(e));
};
