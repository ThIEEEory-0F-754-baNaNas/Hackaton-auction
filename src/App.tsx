import { ThemeProvider } from "@material-tailwind/react";
import theme from "./theme";
import Navigation from "./Navigation";
import { UserContext } from "./context/userContext";
import { useEffect, useState } from "react";
import { User, getUser, signIn, signUp } from "./api/api";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    getUser(token).then((user) => {
      if (user) setUser(user);
    });
    // TO add user
    // signUp({
    //   avatar:
    //     "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    //   firstname: "Tania1",
    //   lastname: "Asndrew1",
    //   username: "txanaa2ndrew",
    //   email: "122sdf23@gmail.com",
    //   password: "1234568790173",
    // }).then(async (user) => {
    //   if (user) setUser(user);
    //   signIn("122xxasdf23@gmail.com", "1234568790173").then((res) => {
    //     if (res) localStorage.setItem("token", res.token);
    //   });
    // });
    // signIn("122xxasdf23@gmail.com", "1234568790173").then((res) => {
    //   if (res) localStorage.setItem("token", res.token);
    // });
  }, []);

  return (
    <>
      <ThemeProvider value={theme}>
        <UserContext.Provider value={[user, setUser]}>
          <Navigation />
        </UserContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
