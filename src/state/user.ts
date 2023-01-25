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
  effects_UNSTABLE: [persistAtom],
});
