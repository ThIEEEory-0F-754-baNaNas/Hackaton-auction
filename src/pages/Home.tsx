import { Typography } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { getUserAuctionItems } from "../api/auctionApi";
import { User } from "../api/userApi";
import AuctionCards from "../components/AuctionCards";
import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";

const HomeAuctions = ({ user }: { user: User }) => {
  if (user.isNotOk) throw new Error("User is not authenticated");
  const [page, setPage] = useState(1);

  const {
    data: auctions,
    isLoading,
    isRefetching,
    isError,
    error,
  } = useQuery(
    ["userAuctions", { userId: user.id }, { page }],
    () => getUserAuctionItems({ userId: user.id, page }),
    {
      retry: 1,
      cacheTime: 1000 * 60 * 1,
    }
  );

  return (
    <AuctionCards
      useState={{ page, setPage }}
      auctions={auctions}
      useQuery={{
        isError,
        error,
        isLoading,
        isRefetching,
      }}
    />
  );
};

const Home = () => {
  const [user] = useContext(UserContext);
  if (user.isNotOk) throw new Error("User is not authenticated");

  return (
    <div className="text-on-primary flex flex-col items-center container">
      <Typography className="text-center" variant="h2">
        All auctions
      </Typography>
      <HomeAuctions user={user} />
    </div>
  );
};

export default Home;
