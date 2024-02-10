import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Navigation from "./Navigation";
import { User, getUser } from "./api/userApi";
import { UserContext } from "./context/userContext";

function App() {
  const [user, setUser] = useState<User>({
    isNotOk: true,
    isLoading: true,
    error: null,
  });

  const {
    data: fetchedUser,
    isLoading,
    isError,
    error,
  } = useQuery("user", getUser, {
    retry: 2,
    // cacheTime: Infinity,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setUser(data);
    },
  });

  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser);
    } else if (isLoading || isError) {
      setUser({
        isNotOk: true,
        isLoading,
        error,
      });
    }
  }, [isLoading, isError, error, fetchedUser]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Navigation />
    </UserContext.Provider>
  );
}

export default App;
