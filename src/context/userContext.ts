import { createContext } from "react";
import { User } from "../api/api";

export const UserContext = createContext<[User | null, (user: User) => void]>([
  null,
  () => {},
]);
