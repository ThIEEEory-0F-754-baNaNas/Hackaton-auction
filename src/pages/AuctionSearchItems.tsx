import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuctionItemT, searchAuctionItems } from "../api/auctionApi";

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
  const [auctionItems, setAuctionItems] = useState<AuctionItemT[]>([]);
  useEffect(() => {
    const fetchAuctions = async () => {
      const res = await searchAuctionItems(title);
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
        <p key={auction.id}>
          {auction.title} {auction.id}
        </p>
      ))}
    </div>
  );
};

export default AuctionSearchItems;
