import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export type User = {
  id: string;
  role: string;
};
export const userState = atom<User>({
  key: "user",
  default: {
    id: "",
    role: "",
  },
  // NOTE: state永続化で簡単にログインセッション出来ると思ったが、そんなことない。
  // localStorageに保存しているので、このままやると誰でもログイン可能になる
  // effects_UNSTABLE: [persistAtom],
});
