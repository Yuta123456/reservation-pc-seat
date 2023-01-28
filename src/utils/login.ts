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
    (!loginInfo || loginInfo.email || loginInfo.password)
  ) {
    return;
  }

  const requestBody = {
    email: loginInfo?.email,
    password: loginInfo?.password,
    access_token,
  };

  await fetch("api/auth/login", {
    method: "POST",
    body: JSON.stringify(requestBody),
  }).then(async (res) => {
    const {
      authResponce,
    }: {
      authResponce: { user: User | null; session: Session | null };
    } = await res.json();
    if (authResponce.session !== null && authResponce.user !== null) {
      const session = authResponce.session;
      const newUser: UserState = {
        user: authResponce.user,
        session,
      };
      setUser(newUser);
      sessionStorage.setItem("access_token", session.access_token);
      sessionStorage.setItem("refresh_token", session.refresh_token);
      sessionStorage.setItem("expires_in", String(session.expires_in));
      sessionStorage.setItem("expires_at", String(session.expires_at));
    }
  });
};
