import { ArrowDownIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  DialogFooter,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Spinner,
} from "@material-tailwind/react";
import classNames from "classnames";
import { useState } from "react";
import { AuctionStakeT } from "../../api/auctionApi";
import { useQuery } from "react-query";
import ErrorIndicator from "../../components/ErrorIndicator";

export const BidMenu = ({
  sendBid,
  currentBid,
}: {
  sendBid: (bid: number) => Promise<boolean>;
  currentBid: number;
}) => {
  const defaultBids = [
    currentBid + 100,
    currentBid + 200,
    currentBid + 500,
    currentBid * 2,
  ];
  const [isOpen, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!isOpen);
    setShowError(false);
  };

  const [bid, setBid] = useState(0);

  const { refetch, isLoading, isRefetching, isError, error } = useQuery(
    "bidItem",
    () => sendBid(bid),
    {
      retry: 0,
      enabled: false,
      onSuccess: () => {
        setOpen(false);
      },
    }
  );

  const [showError, setShowError] = useState(false);

  const sendBidQuery = async () => {
    await refetch();
    setShowError(true);
  };

  return (
    <Card>
      <CardBody>
        <div className="flex flex-wrap justify-center gap-8 mb-5 text-on-primary">
          {defaultBids.map((bid) => (
            <Button
              key={bid}
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
          {showError && isError && <ErrorIndicator error={error} />}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={toggleDrawer}
            disabled={isLoading || isRefetching}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => sendBidQuery()}
            className="flex"
          >
            <span>Confirm</span>
            {(isLoading || isRefetching) && <Spinner />}
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
};

export const BidList = ({ bids }: { bids?: AuctionStakeT[] }) => {
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
            {!bids && <Spinner />}
            {bids && bids.length === 0 && (
              <Typography variant="h6">No bids yet</Typography>
            )}
            {bids &&
              [...bids].reverse().map((bid) => (
                <div key={bid.id} className="flex justify-between">
                  <Typography variant="h6">{bid.user.username}</Typography>
                  <Typography variant="h6">
                    {new Date(bid.createdAt).toLocaleString()}
                  </Typography>
                  <Typography variant="h6">{bid.price}</Typography>
                </div>
              ))}
          </CardBody>
        </Card>
      </AccordionBody>
    </Accordion>
  );
};
