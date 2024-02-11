import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Carousel,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { AUCTION_ITEMS } from "../Navigation";
import { AuctionItemT } from "../api/auctionApi";
// TODO: extract timer to components
import { RightTimerForAuction } from "../pages/AuctionItem/AuctionItemHeader";

export default function AuctionCard({ auction }: { auction: AuctionItemT }) {
  const navigate = useNavigate();

  const onDetailsClick = () => {
    navigate(`${AUCTION_ITEMS}/${auction.id}`, { state: { auction } });
  };

  return (
    <Card className="min-w-14 flex flex-col justify-between">
      <CardHeader shadow={false} floated={false} className="min-h-48">
        <Carousel className="bg-bg min-w-fit">
          {auction.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Woops! ${auction.title}`}
              className="h-full w-full object-cover"
            />
          ))}
        </Carousel>
      </CardHeader>
      <CardBody className="h-full">
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
