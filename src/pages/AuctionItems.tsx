import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AuctionItem as AuctionItemT, searchAuction } from "../api/api";

const getParams = (search: string) => {
  const parsed = new URLSearchParams(search);
  const params: { [key: string]: string } = {};
  for (const [key, value] of parsed) {
    params[key] = value;
  }
  return params;
};

const AuctionItems = () => {
  const location = useLocation();
  const { title } = getParams(location.search);
  const [auctionItems, setAuctionItems] = useState<AuctionItemT[]>([]);
  useEffect(() => {
    const fetchAuctions = async () => {
      const res = await searchAuction(title);
      if (res) setAuctionItems(res);
    };
    fetchAuctions();
  }, [title]);

  return (
    <div className="text-on-primary">
      <Typography variant="h2">
        Search: <span className="text-on-primary-alt">{title}</span>
      </Typography>
      {auctionItems.map((auction) => (
        <p>{auction.title}</p>
      ))}
    </div>
  );
};

export default AuctionItems;
