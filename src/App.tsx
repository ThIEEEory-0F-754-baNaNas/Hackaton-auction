import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Navigation from "./Navigation";
import { User, getUser } from "./api/userApi";
import { UserContext } from "./context/userContext";
import { getTokenOrEmpty } from "./utils/apiUtils";

function App() {
  const [user, setUser] = useState<User>({
    isNotOk: true,
    isLoading: true,
    error: null,
  });

  const token = getTokenOrEmpty();

  const {
    data: fetchedUser,
    isLoading,
    isError,
    error,
  } = useQuery(`user-${token}`, getUser, {
    retry: 2,
    cacheTime: token ? 1000 * 60 * 60 * 24 * 7 : 0, // todo: is not caching
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setUser(data);
    },
    enabled: !!token,
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
