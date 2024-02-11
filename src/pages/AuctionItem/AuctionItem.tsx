import { Spinner } from "@material-tailwind/react";
import classNames from "classnames";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
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

const AuctionItem = () => {
  const { id: auctionId } = useParams();
  const location = useLocation();
  const auctionFromLocation = location.state?.auction;

  const [user] = useContext(UserContext);
  const {
    data: auction,
    isLoading,
    isError,
    refetch: refetchAuction,
    error,
  } = useQuery(
    ["auctionItem", { auction: auctionId }],
    () => getAuctionItem(auctionId),
    {
      refetchOnWindowFocus: false,
      retry: 2,
      initialData: auctionFromLocation,
    }
  );

  // TODO: read https://stackoverflow.com/questions/73140256/react-query-how-to-refresh-a-usequery-query-function-after-some-of-that-functi
  const {
    data: stakes,
    refetch: refetchStakes,
    isLoading: isStakeLoading,
    isRefetching: isStakeRefetching,
    isError: isStakeError,
    error: stakeError,
  } = useQuery(
    ["auctionBids", { auction: auctionId }],
    () => getAuctionStakes(auctionId!),
    {
      retry: 0,
      enabled: !!auctionId,
    }
  );

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
    lastPrice = lastStake ? lastStake.price : 0;
  }

  const currentBid =
    lastPrice > 0
      ? lastPrice + auction!.minPriceStep
      : auction!.startPrice + auction!.minPriceStep;

  return (
    <div className="text-on-primary h-full container m-auto">
      <div className="mb-3">
        <AuctionDetailsHeader lastPrice={lastPrice} auction={auction!} />
      </div>
      {isStakeError && (
        <ErrorIndicator msg="Can't load stakes" error={stakeError} />
      )}
      <div className="mb-3">
        <BidList bids={stakes} />
      </div>
      {!isAuthorOfAuction && isAuctionActive && (
        // TODO: featuree flag
        <div className={`${classNames({ "sticky bottom-0 top-0": false })}`}>
          <BidMenu sendBid={sendBid} currentBid={currentBid} />
        </div>
      )}
    </div>
  );
};

export default AuctionItem;
