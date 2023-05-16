import { UserState } from "@/state/user";
import { Session, User } from "@supabase/supabase-js";
import { SetterOrUpdater } from "recoil";

export const confirmAccessToken = async (
  setUser: SetterOrUpdater<UserState>
) => {
  const sessionStr = sessionStorage.getItem("session");
  const session: Session = JSON.parse(sessionStr !== null ? sessionStr : "{}");

  if (new Date() < new Date(Number(session.expires_at) * 1000)) {
    return;
  }
  const requestBody = {
    refresh_token: session.refresh_token,
  };
  await fetch("api/auth/refresh", {
    method: "POST",
    body: JSON.stringify(requestBody),
  })
    .then(async (res) => {
      const {
        authResponse,
      }: {
        authResponse: { user: User | null; session: Session | null };
      } = await res.json();

      if (authResponse.session !== null) {
        sessionStorage.setItem("session", JSON.stringify(authResponse.session));
      }
      setUser((oldUser) => {
        return {
          user: authResponse.user || oldUser.user,
          session: authResponse.session || oldUser.session || session,
        };
      });
    })
    .catch((e) => console.log(e));
};
