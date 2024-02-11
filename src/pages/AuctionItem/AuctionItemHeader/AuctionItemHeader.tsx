import {
  Card,
  CardBody,
  CardHeader,
  Carousel,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import classNames from "classnames";
import { AuctionItemT } from "../../../api/auctionApi";
import RightTimerForAuction from "../../../components/TimerComponent";
import { isActive, isExpired } from "../../../utils/time";
import AuctionChat from "./AuctionChat";
import EditButton from "./EditButton";

const AuctionDetailsHeader = ({
  auction,
  lastPrice,
}: {
  auction: AuctionItemT;
  lastPrice: number;
}) => {
  if (!auction || !auction.images) return null;

  const humanDate = new Date(auction.createdAt).toLocaleString();
  const isAuctionExpired = isExpired(auction.endTime);
  const isAuctionActive = isActive(auction.startTime, auction.endTime);

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
        <Carousel className="bg-bg ">
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
      <CardBody className="w-full flex justify-between">
        <div>
          <Typography variant="h2">{auction.title}</Typography>
          <Typography
            variant="paragraph"
            className="relative -top-2 !text-on-primary-alt"
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
          <Typography variant="h4">
            Min step:{" "}
            <span className="text-on-primary-alt">{auction.minPriceStep}</span>
          </Typography>
          {/* TODO: refactor            */}
          {isAuctionActive && (
            <Typography variant="h4">
              Current price:{" "}
              <span className="text-on-primary-alt">{lastPrice}</span>
            </Typography>
          )}
          {isAuctionExpired && (
            <Typography variant="h4">
              Last price:{" "}
              <span className="text-on-primary-alt">{lastPrice}</span>
            </Typography>
          )}
          <RightTimerForAuction auction={auction} />
        </div>
        <EditButton auction={auction} />
      </CardBody>
    </Card>
  );
};

const AuctionHeader = ({
  auction,
  lastPrice,
}: {
  auction: AuctionItemT;
  lastPrice: number;
}) => {
  const data = [
    {
      label: "Details",
      Element: <AuctionDetailsHeader lastPrice={lastPrice} auction={auction} />,
    },
    { label: "Chat", Element: <AuctionChat auction={auction} /> },
  ];

  return (
    <Tabs value={data[0].label}>
      <TabsHeader>
        {data.map(({ label }) => (
          <Tab key={label} value={label}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ label, Element }) => (
          <TabPanel key={label} value={label}>
            {Element}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default AuctionHeader;
