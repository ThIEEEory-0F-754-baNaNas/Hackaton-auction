import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { AuctionItemT } from "../api/auctionApi";
import Link from "./Link";
import { AUCTION_ITEMS } from "../Navigation";
import { RightTimerForAuction } from "../pages/AuctionItem/AuctionItemHeader";

export default function AuctionCard({ auction }: { auction: AuctionItemT }) {
  return (
    <Card className="w-56">
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
        <Link to={`${AUCTION_ITEMS}/${auction.id}`}>
          <Button variant="gradient" fullWidth={true}>
            Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
