import { Typography } from "@material-tailwind/react";
import AuctionCard from "../components/AuctionCard";

const cardsPopular = Array(4).fill(0);
const cardsNewest = Array(4).fill(0);

const Explore = () => {
  return ( 
    <div className="flex flex-col items-center gap-y-8">
      <Typography variant="h2">Popular</Typography>
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
        {cardsPopular.map((_, index) => (
          <AuctionCard key={index} />
        ))}
      </div>
      <Typography variant="h2">Newest</Typography>
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
        {cardsNewest.map((_, index) => (
          <AuctionCard key={index} />
        ))}
      </div>
    </div>
  );
}
 
export default Explore;
