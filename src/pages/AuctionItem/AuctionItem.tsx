import { Button, Typography } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AuctionItemT,
  getAuctionItem,
  sendBidToAuction,
} from "../../api/auctionApi";
import { UserContext } from "../../context/userContext";
import AuctionHeader from "./AuctionItemHeader";
import { BidList, BidMenu } from "./AuctionBids";
import { isActive } from "../../utils/time";

const AuctionItem = () => {
  const { id: auctionId } = useParams();
  const [auction, setAuction] = useState<AuctionItemT | null>(null);
  const [user] = useContext(UserContext);
  const isAuthorOfAuction =
    user?.id && auction?.id && user.id === auction?.userId;

  const isAuctionActive = isActive(
    auction?.startTime || "",
    auction?.endTime || ""
  );

  useEffect(() => {
    const getAuction = async () => {
      const auction = await getAuctionItem(auctionId || "");
      setAuction(auction);
    };

    getAuction();
  }, [user, auctionId]);

  const sendBid = async (bid: number) => {
    if (!auctionId) throw new Error("No auction id");
    const res = await sendBidToAuction(auctionId, bid);
    console.log(res);
  };

  if (!auction) return <Typography variant="h1">Loading...</Typography>;

  return (
    <div className="text-on-primary h-full container m-auto">
      <div className="mb-3">
        <AuctionHeader auction={auction} />
      </div>
      <div className="mb-3">
        <BidList />
      </div>
      {!isAuthorOfAuction && isAuctionActive && (
        <div className="sticky bottom-0 top-0">
          <BidMenu sendBid={sendBid} />
        </div>
      )}
    </div>
  );
};

export default AuctionItem;
