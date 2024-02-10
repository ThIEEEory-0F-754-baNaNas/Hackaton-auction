import { Spinner, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuctionItemT, searchAuctionItems } from "../api/auctionApi";
import { useQuery } from "react-query";
import ErrorIndicator from "../components/ErrorIndicator";

const getParams = (search: string) => {
  const parsed = new URLSearchParams(search);
  const params: { [key: string]: string } = {};
  for (const [key, value] of parsed) {
    params[key] = value;
  }
  return params;
};

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
