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
  // effects_UNSTABLE: [persistAtom],
});

// user: {
//   id: '03478592-accd-4b67-b756-04859fcc23d9',
//   aud: 'authenticated',
//   role: 'authenticated',
//   email: 'yuuta09090530@icloud.com',
//   phone: '',
//   confirmation_sent_at: '2023-01-25T06:57:48.5433671Z',
//   app_metadata: { provider: 'email', providers: [Array] },
//   user_metadata: {},
//   identities: [ [Object] ],
//   created_at: '2023-01-25T06:57:48.538342Z',
//   updated_at: '2023-01-25T06:57:50.994384Z'
// },
