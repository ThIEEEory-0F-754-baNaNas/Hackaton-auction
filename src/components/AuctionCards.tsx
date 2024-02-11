import { Spinner, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { AuctionItemT } from "../api/auctionApi";
import AuctionCard from "./AuctionCard";
import ErrorIndicator from "./ErrorIndicator";
import Pagination from "./Pagination";

interface AuctionCardsProps {
  auctionFunction: (page: number) => Promise<AuctionItemT[]>;
  cacheName?: string;

  // TODO: add type
  queryOptions?: any;
}

const AuctionCards = (props: AuctionCardsProps) => {
  const [page, setPage] = useState(1);

  const {
    data: auctions,
    isLoading,
    isRefetching,
    isError,
    error,
  } = useQuery(
    ["userAuctions", props.cacheName, { page }],
    () => props.auctionFunction(page),
    props.queryOptions || {
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

export default AuctionCards;
