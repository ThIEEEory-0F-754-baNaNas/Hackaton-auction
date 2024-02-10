import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import classNames from "classnames";
import { AuctionItemT } from "../../api/auctionApi";
import { TimerComponent } from "../../components/Timer";
import { isActive, isExpired } from "../../utils/time";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { EDIT_AUCTION } from "../../Navigation";

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
        <TimerComponent label="Auction starts in:" time={auction.startTime} />
      )}
    </>
  );
};

const EditButton = ({ auction }: { auction: AuctionItemT }) => {
  const [user] = useContext(UserContext);
  const navigate = useNavigate();
  const canEdit =
    !isActive(auction.startTime, auction.endTime) &&
    !isExpired(auction.endTime);

  if (user.isNotOk || auction.userId !== user.id) return null;

  return (
    <div className="flex justify-end">
      <Button
        disabled={!canEdit}
        onClick={() =>
          navigate(`${EDIT_AUCTION}/${auction.id}`, { state: auction })
        }
      >
        Edit
      </Button>
    </div>
  );
};

const AuctionHeader = ({ auction }: { auction: AuctionItemT }) => {
  if (!auction || !auction.images) return null;

  const humanDate = new Date(auction.createdAt).toLocaleString();
  const isAuctionExpired = isExpired(auction.endTime);

  return (
    <Card
      className={`md:flex-row ${classNames({
        "brightness-75": isAuctionExpired,
      })}`}
    >
      <CardHeader
        floated={false}
        className="md:w-1/3 max-w-sm m-auto mt-5 md:m-7"
      >
        <img
          src={auction.images[0]}
          alt={auction.title}
          className="w-full object-cover"
        />
      </CardHeader>
      <CardBody className="w-full flex justify-between">
        <div>
          <Typography variant="h2">{auction.title}</Typography>
          <Typography
            variant="paragraph"
            className="relative -top-3 !text-on-primary-alt"
          >
            {humanDate}
          </Typography>
          {auction.description && (
            <Typography variant="paragraph">{auction.description}</Typography>
          )}
          <Typography variant="h4">
            Start price:{" "}
            <span className="text-on-primary-alt">{auction.startPrice}</span>
          </Typography>
          <RightTimerForAuction auction={auction} />
        </div>
        <EditButton auction={auction} />
      </CardBody>
    </Card>
  );
};

export default AuctionHeader;
