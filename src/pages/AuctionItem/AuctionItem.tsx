import { Button, Spinner } from "@material-tailwind/react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getAuctionItem, sendBidToAuction } from "../../api/auctionApi";
import ErrorIndicator from "../../components/ErrorIndicator";
import { UserContext } from "../../context/userContext";
import { isActive } from "../../utils/time";
import { BidList, BidMenu } from "./AuctionBids";
import AuctionHeader from "./AuctionItemHeader";
import { EDIT_AUCTION } from "../../Navigation";

const AuctionItem = () => {
  const { id: auctionId } = useParams();
  const [user] = useContext(UserContext);
  const {
    data: auction,
    isLoading,
    isError,
    error,
  } = useQuery("auctionItem", () => getAuctionItem(auctionId || ""), {
    refetchOnWindowFocus: false,
    retry: 2,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorIndicator error={error} />;

  const isAuthorOfAuction = user.isNotOk
    ? false
    : auction?.id && user.id === auction?.userId;

  const isAuctionActive = isActive(
    auction?.startTime || "",
    auction?.endTime || ""
  );

  const sendBid = async (bid: number) => {
    if (!auctionId) throw new Error("No auction id");
    const res = await sendBidToAuction(auctionId, bid);
    console.log(res);
  };

  return (
    <div className="text-on-primary h-full container m-auto">
      <div className="mb-3">
        <AuctionHeader auction={auction!} />
      </div>
      <div className="mb-3">
        <BidList />
      </div>
      {!isAuthorOfAuction && isAuctionActive && (
      <div>
        <Link to={`${EDIT_AUCTION}/${auctionId}`}>
          <Button variant="text" fullWidth>Edit auction</Button>
        </Link> 
        <BidMenu sendBid={sendBid} />      
      </div>
      )}
    </div>
  );
};

export default AuctionItem;
