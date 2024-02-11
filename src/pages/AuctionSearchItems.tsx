import { Spinner, Typography } from "@material-tailwind/react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { searchAuctionItems } from "../api/auctionApi";
import ErrorIndicator from "../components/ErrorIndicator";
import { getParams } from "../utils/getParams";
import AuctionCard from "../components/AuctionCard";

const AuctionSearchItems = () => {
  const location = useLocation();
  const { title } = getParams(location.search);

  const {
    data: auctionItems,
    isLoading,
    isError,
    error,
  } = useQuery(`searchAuctionItems-${title}`, () => searchAuctionItems(title), {
    cacheTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorIndicator error={error} />;

  return (
    <div className="flex flex-col items-center gap-y-8">
      <Typography variant="h2">
        Search: <span className="text-on-primary-alt">{title}</span>
      </Typography>
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
        {auctionItems!.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>
    </div>
  );
};

export default AuctionSearchItems;
