import { User, Session } from "@supabase/supabase-js";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export type UserState = {
  user: User | null;
  session: Session | null;
  isAdmin: boolean | undefined;
};
export const userState = atom<UserState>({
  key: "user",
  default: {
    user: null,
    session: null,
    isAdmin: undefined,
  },
  // NOTE: state永続化で簡単にログインセッション出来ると思ったが、そんなことない。
  // localStorageに保存しているので、このままやると誰でもログイン可能になる
  // effects_UNSTABLE: [persistAtom],
});
