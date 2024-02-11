import { createContext } from "react";
import { User } from "../api/userApi";

export const UserContext = createContext<[User, (user: User) => void]>([
  {
    isNotOk: true,
    isLoading: false,
    error: null,
  },
  () => {},
]);
