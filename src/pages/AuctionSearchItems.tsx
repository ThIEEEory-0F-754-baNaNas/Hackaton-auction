import { Spinner, Typography } from "@material-tailwind/react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { searchAuctionItems } from "../api/auctionApi";
import ErrorIndicator from "../components/ErrorIndicator";
import { getParams } from "../utils/getParams";

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
    <div className="text-on-primary">
      <Typography variant="h2">
        Search: <span className="text-on-primary-alt">{title}</span>
      </Typography>
      {auctionItems!.map((auction) => (
        <p key={auction.id}>
          {auction.title} {auction.id}
        </p>
      ))}
    </div>
  );
};

export default AuctionSearchItems;
