import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Carousel,
  Input,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
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

export const RightTimerForAuction = ({ auction }: { auction: AuctionItemT }) => {
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

const AuctionChat = ({ auction }: { auction: AuctionItemT }) => {
  const chat = auction.chat;

  if (!chat) return "Create chat TODO:";

  const messages = chat.messages || [];
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index} className="flex justify-between">
          <Typography variant="h6">{message.userId}</Typography>
          <Typography variant="h6">{message.text}</Typography>
        </div>
      ))}

      <Input
        placeholder="Send message"
        variant="outlined"
        crossOrigin={undefined}
        className="w-full"
      />
    </div>
  );
};

const AuctionDetailsHeader = ({ auction }: { auction: AuctionItemT }) => {
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
          <RightTimerForAuction auction={auction} />
        </div>
        <EditButton auction={auction} />
      </CardBody>
    </Card>
  );
};

const AuctionHeader = ({ auction }: { auction: AuctionItemT }) => {
  const data = [
    { label: "Details", Element: <AuctionDetailsHeader auction={auction} /> },
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
