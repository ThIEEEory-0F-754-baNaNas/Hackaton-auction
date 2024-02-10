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
} from "@material-tailwind/react";
import classNames from "classnames";
import { useState } from "react";

export const BidMenu = ({ sendBid }: { sendBid: (bid: number) => void }) => {
  const defaultBids = [100, 200, 300, 400, 500];
  const [isOpen, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!isOpen);
  const [bid, setBid] = useState(0);

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
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              sendBid(bid);
              toggleDrawer();
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
};

export const BidList = () => {
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