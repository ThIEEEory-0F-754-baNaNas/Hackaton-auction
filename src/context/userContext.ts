import { createContext } from "react";
import { User } from "../api/userApi";

export const UserContext = createContext<[User | null, (user: User) => void]>([
  null,
  () => {},
]);
