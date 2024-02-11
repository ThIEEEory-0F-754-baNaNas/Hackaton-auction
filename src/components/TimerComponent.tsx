import { Typography } from "@material-tailwind/react";
import { AuctionItemT } from "../api/auctionApi";
import { isActive, isExpired } from "../utils/time";
import { TimerComponent } from "./Timer";

const RightTimerForAuction = ({ auction }: { auction: AuctionItemT }) => {
  const isAuctionActive = isActive(auction.startTime, auction.endTime);
  const isAuctionExpired = isExpired(auction.endTime);

  return (
    <>
      {isAuctionActive && (
        <TimerComponent label="Time left:" time={auction.endTime} />
      )}

      {isAuctionExpired && (
        <Typography variant="h4">Auction is expired</Typography>
      )}
      {!isAuctionExpired && !isAuctionActive && (
        <>
          <TimerComponent label="Auction starts in:" time={auction.startTime} />
          <TimerComponent
            label="Auction ends at:"
            time={auction.endTime}
            isActivated={false}
          />
        </>
      )}
    </>
  );
};

export default RightTimerForAuction;
