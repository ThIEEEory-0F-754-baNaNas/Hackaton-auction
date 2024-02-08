import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Switch,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AuctionItem as AuctionItemT, fakeAuction } from "../api/api";

const AuctionHeader = ({ auction }: { auction: AuctionItemT }) => {
  const humanDate = new Date(auction.createdAt).toLocaleString();

  return (
    <Card className="flex-row pb-4">
      <CardHeader floated={false} className="min-w-[240px] min-h-[240px]">
        <img
          src={auction.images[0]}
          alt={auction.title}
          width={240}
          height={240}
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h2">{auction.title}</Typography>
        <Typography
          variant="paragraph"
          className="relative -top-3 !text-on-primary-alt"
        >
          {humanDate}
        </Typography>
        <Typography variant="paragraph">{auction.description}</Typography>
        <Typography variant="h6">Start price: {auction.startPrice}</Typography>
      </CardBody>
    </Card>
  );
};

const BidMenu = () => {
  const defaultBids = [100, 200, 300, 400, 500];
  const [isOpen, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!isOpen);
  const [bid, setBid] = useState(0);

  return (
    <Card>
      <CardBody className="container m-auto">
        <div className="flex flex-wrap justify-center gap-8 mb-5 text-on-primary">
          {defaultBids.map((bid) => (
            <Button
              onClick={() => {
                setBid(bid);
                toggleDrawer();
              }}
              variant="outlined"
            >
              {bid}
            </Button>
          ))}
        </div>
        <Input
          type="number"
          label="Enter your bid"
          crossOrigin={undefined}
          value={bid === 0 ? "" : bid}
          onChange={(value) => setBid(parseInt(value.target.value))}
        />
        <div className="flex gap-3 mt-5">
          <Button variant="gradient" className="flex-1" onClick={toggleDrawer}>
            Place bid
          </Button>
          <Button
            variant="gradient"
            color="red"
            className="flex-1"
            onClick={() => setBid(0)}
          >
            Clear
          </Button>
        </div>
      </CardBody>

      <Dialog open={isOpen} handler={toggleDrawer}>
        <DialogHeader>Confirm</DialogHeader>
        <DialogBody>
          You are about to place a bid. Are you sure?
          <Typography variant="h6">Bid: {bid}</Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={toggleDrawer}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={toggleDrawer}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
};

const BidList = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Accordion open={isOpen}>
      <AccordionHeader onClick={() => setOpen(!isOpen)}>Bids</AccordionHeader>
      <AccordionBody>
        <Card>
          <CardBody>
            <Typography variant="h6">Bids</Typography>
            <Typography variant="h6">Bids</Typography>
            <Typography variant="h6">Bids</Typography>
            <Typography variant="h6">Bids</Typography>
            <Typography variant="h6">Bids</Typography>
          </CardBody>
        </Card>
      </AccordionBody>
    </Accordion>
  );
};

const AuctionItem = () => {
  // const { id: auctionId } = useParams();
  // TODO: use api
  const auction = fakeAuction;

  return (
    <div className="text-on-primary h-full">
      <div className="mb-3">
        <AuctionHeader auction={auction} />
      </div>
      <div className="mb-3 container m-auto">
        <BidList />
      </div>
      <div className="sticky bottom-0 top-0">
        <BidMenu />
      </div>
    </div>
  );
};

export default AuctionItem;
