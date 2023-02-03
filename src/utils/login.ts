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
    throw new Error("login failed");
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

  return fetch("api/auth/login", {
    method: "POST",
    headers: session.access_token
      ? {
          Authorization: "Bearer " + session.access_token,
        }
      : {},
    body: JSON.stringify(requestBody),
  }).then(async (res) => {
    const {
      authResponse: authResponse,
    }: {
      authResponse: { user: User | null; session: Session | null };
    } = await res.json();
    if (authResponse.session !== null) {
      sessionStorage.setItem("session", JSON.stringify(authResponse.session));
    }
    const admin = await isAdmin(authResponse.user?.id);
    setUser((oldUser) => {
      return {
        user: authResponse.user || oldUser.user,
        session: authResponse.session || oldUser.session || session,
        isAdmin: admin,
      };
    });
  });
};

export const isAdmin: (id: string | undefined) => Promise<boolean> = async (
  id: string | undefined
) => {
  if (!id) {
    return false;
  }
  const sessionStr = sessionStorage.getItem("session");
  const session: Session = JSON.parse(sessionStr !== null ? sessionStr : "{}");
  const res = await fetch("api/auth/is-admin", {
    method: "POST",
    headers: session.access_token
      ? {
          Authorization: "Bearer " + session.access_token,
        }
      : {},
    body: JSON.stringify({
      id,
    }),
  });
  const res_1 = await res.json();
  return res_1.isAdmin;
};
