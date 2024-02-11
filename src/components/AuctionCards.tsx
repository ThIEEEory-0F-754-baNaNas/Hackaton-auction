import { Spinner, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { AuctionItemT } from "../api/auctionApi";
import AuctionCard from "./AuctionCard";
import ErrorIndicator from "./ErrorIndicator";
import Pagination from "./Pagination";

interface AuctionCardsProps {
  useState: {
    setPage: (page: number) => void;
    page: number;
  };
  useQuery: {
    isError: boolean;
    error: unknown;
    isLoading: boolean;
    isRefetching: boolean;
  };
  auctions: AuctionItemT[] | undefined;
}

const AuctionCards = ({
  useQuery: { isError, error, isLoading, isRefetching },
  auctions,
  useState: { setPage, page },
}: AuctionCardsProps) => {
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
