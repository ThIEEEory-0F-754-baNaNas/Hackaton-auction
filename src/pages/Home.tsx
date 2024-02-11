import { Typography } from "@material-tailwind/react";
import AuctionCard from "../components/AuctionCard";
import { Pagination } from "../components/Pagination";

const Home = () => {
  return (
    <div className="flex flex-col items-center gap-y-8">
      <Typography variant="h2">All auctions</Typography>
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
        {
          // ADD CARDS
          /*{cards.map((_, index) => (
          <AuctionCard key={index} />
        ))}*/
        }
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
