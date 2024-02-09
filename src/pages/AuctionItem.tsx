import { ArrowDownIcon } from "@heroicons/react/24/solid";
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
  Typography,
} from "@material-tailwind/react";
import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuctionItemT, getAuctionItem } from "../api/auctionApi";
import { UserContext } from "../context/userContext";

const AuctionHeader = ({ auction }: { auction: AuctionItemT }) => {
  const humanDate = new Date(auction.createdAt).toLocaleString();

  return (
    <Card className="md:flex-row">
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
  const [isOpen, setOpen] = useState(true);
  const toggleDrawer = () => setOpen(!isOpen);
  const [bid, setBid] = useState(0);

  return (
    <Card>
      <CardBody>
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
      <AccordionHeader onClick={() => setOpen(!isOpen)}>
        Bids{" "}
        <ArrowDownIcon
          className={`h-5 w-5 transition-transform ${classNames({
            "-rotate-180": isOpen,
          })}`}
        />
      </AccordionHeader>
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
  const { id: auctionId } = useParams();
  const [auction, setAuction] = useState<AuctionItemT | null>(null);
  const [user] = useContext(UserContext);
  const isAuthorOfAuction =
    user?.id && auction?.id && user.id === auction?.userId;

  useEffect(() => {
    const getAuction = async () => {
      const auction = await getAuctionItem(auctionId || "");
      setAuction(auction);
    };

    getAuction();
  }, [user, auctionId]);

  return (
    <div className="text-on-primary h-full container m-auto">
      <div className="mb-3">
        {auction === null ? (
          <Typography variant="h1">Loading...</Typography>
        ) : (
          <AuctionHeader auction={auction} />
        )}
      </div>
      <div className="mb-3">
        <BidList />
      </div>
      {!isAuthorOfAuction && (
        <div className="sticky bottom-0 top-0">
          <BidMenu />
        </div>
      )}
    </div>
  );
};

export default AuctionItem;
