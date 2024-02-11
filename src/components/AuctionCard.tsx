import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { AuctionItemT } from "../api/auctionApi";
import { AUCTION_ITEMS } from "../Navigation";
import { RightTimerForAuction } from "../pages/AuctionItem/AuctionItemHeader";
import { useNavigate } from "react-router-dom";

export default function AuctionCard({ auction }: { auction: AuctionItemT }) {
  const navigate = useNavigate();

  const onDetailsClick = () => {
    navigate(`${AUCTION_ITEMS}/${auction.id}`, { state: { auction } });
  };

  return (
    <Card className="w-56 flex flex-col justify-between">
      <CardHeader shadow={false} floated={false} className="h-48">
        <img
          src={auction.images[0]}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <Typography>{auction.title}</Typography>
          <Typography>{auction.startPrice}</Typography>
          <RightTimerForAuction auction={auction} />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={onDetailsClick} variant="gradient" fullWidth={true}>
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}
