import { Spinner, Typography } from "@material-tailwind/react";
import AuctionCard from "../components/AuctionCard";
import { Pagination } from "../components/Pagination";
import { useQuery } from "react-query";
import ErrorIndicator from "../components/ErrorIndicator";
import { getUserAuctionItems } from "../api/auctionApi";
import { UserContext } from "../context/userContext";
import { useContext, useState } from "react";
import { User } from "../api/userApi";

const HomeAuctions = ({ user }: { user: User }) => {
  const [page, setPage] = useState(1);
  if (user.isNotOk) throw new Error("User is not authenticated");

  const {
    data: auctions,
    isLoading,
    isRefetching,
    isError,
    error,
  } = useQuery(
    ["userAuctions", user.id, { page }],
    () =>
      getUserAuctionItems({
        userId: user.id,
        page: page,
        pageSize: 3,
      }),
    {
      retry: 1,
      cacheTime: 1000 * 60 * 1,
    }
  );

  if (isError) return <ErrorIndicator error={error} />;

  const mainContent =
    isLoading || isRefetching ? (
      <Spinner />
    ) : (
      <div>
        {auctions!.length === 0 && (
          <Typography variant="h4">No auctions found</Typography>
        )}
        {auctions!.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>
    );

  return (
    <div>
      <div className="mb-5">{mainContent}</div>
      <Pagination setActive={setPage} active={page} />
    </div>
  );
};

const Home = () => {
  const [user] = useContext(UserContext);
  if (user.isNotOk) throw new Error("User is not authenticated");

  return (
    <div className="text-on-primary h-full container m-auto">
      <Typography className="text-center" variant="h2">
        All auctions
      </Typography>
      <div className="flex justify-center">
        <HomeAuctions user={user} />
      </div>
    </div>
  );
};

export default Home;
