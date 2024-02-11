import { Typography } from "@material-tailwind/react";
import { useContext } from "react";
import { getUserAuctionItems } from "../api/auctionApi";
import { User } from "../api/userApi";
import AuctionCards from "../components/AuctionCards";
import { UserContext } from "../context/userContext";

const HomeAuctions = ({ user }: { user: User }) => {
  if (user.isNotOk) throw new Error("User is not authenticated");

  return (
    <AuctionCards
      auctionFunction={async (page) =>
        await getUserAuctionItems({ userId: user.id, page })
      }
    />
  );
};

const Home = () => {
  const [user] = useContext(UserContext);
  if (user.isNotOk) throw new Error("User is not authenticated");

  return (
    <div className="text-on-primary h-full container m-auto">
      <Typography className="text-center" variant="h2">
        All auctions
      </Typography>
      <div className="flex justify-center">
        <HomeAuctions user={user} />
      </div>
    </div>
  );
};

export default Home;
