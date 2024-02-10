import { createContext } from "react";
import { User } from "../api/userApi";

export const UserContext = createContext<[User, (user: User) => void]>([
  {
    ok: false,
    isLoading: false,
    error: null,
  },
  () => {},
]);
