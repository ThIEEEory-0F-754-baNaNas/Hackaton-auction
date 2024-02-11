import { Button, Spinner } from "@material-tailwind/react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import {
  getAuctionItem,
  getAuctionStakes,
  sendBidToAuction,
} from "../../api/auctionApi";
import ErrorIndicator from "../../components/ErrorIndicator";
import { UserContext } from "../../context/userContext";
import { isActive } from "../../utils/time";
import { BidList, BidMenu } from "./AuctionBids";
import AuctionDetailsHeader from "./AuctionItemHeader";
import { EDIT_AUCTION } from "../../Navigation";

const AuctionItem = () => {
  const { id: auctionId } = useParams();
  const [user] = useContext(UserContext);
  const {
    data: auction,
    isLoading,
    isError,
    refetch: refetchAuction,
    error,
  } = useQuery("auctionItem", () => getAuctionItem(auctionId || ""), {
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const {
    data: stakes,
    refetch: refetchStakes,
    isLoading: isStakeLoading,
    isRefetching: isStakeRefetching,
  } = useQuery("auctionBids", () => getAuctionStakes(auctionId || ""), {
    retry: 0,
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

  const updateData = () => {
    refetchAuction();
    refetchStakes();
  };

  const sendBid = async (bid: number) => {
    if (!auctionId) throw new Error("No auction id");
    const res = await sendBidToAuction(auctionId, bid);
    updateData();
    return res.price > 0;
  };

  // TODO: refactor
  let lastPrice = 0;
  if (!isStakeLoading && !isStakeRefetching && stakes) {
    const lastStake = stakes[stakes.length - 1];
    lastPrice = lastStake.price;
  }

  const currentBid =
    lastPrice > 0 ? lastPrice + auction!.minPriceStep : auction!.startPrice;

  return (
    <div className="text-on-primary h-full container m-auto">
      <div className="mb-3">
        <AuctionDetailsHeader lastPrice={lastPrice} auction={auction!} />
      </div>
      <div className="mb-3">
        <BidList bids={stakes} />
      </div>
      {!isAuthorOfAuction && isAuctionActive && (
        <div>
          <Link to={`${EDIT_AUCTION}/${auctionId}`}>
            <Button variant="text" fullWidth>
              Edit auction
            </Button>
          </Link>
          <BidMenu sendBid={sendBid} currentBid={currentBid} />
        </div>
      )}
    </div>
  );
};

export default AuctionItem;
