import { Spinner, Typography } from "@material-tailwind/react";
import AuctionCard from "../components/AuctionCard";
import { useQuery } from "react-query";
import { getNewestAuctionItems } from "../api/auctionApi";
import ErrorIndicator from "../components/ErrorIndicator";

const Newest = () => {
  const {
    data: cardsNewest,
    isLoading: isNewestLoading,
    isRefetching: isNewestRefetching,
    isError: isNewestError,
    error: NewestError,
  } = useQuery("newest", () => getNewestAuctionItems(), {
    retry: 1,
  });

  return (
    <>
      <Typography variant="h2">Newest</Typography>
      {(isNewestLoading || isNewestRefetching) && <Spinner />}
      {isNewestError && <ErrorIndicator error={NewestError} />}
      {
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
          {cardsNewest &&
            cardsNewest.map((auction, index) => (
              <AuctionCard key={index} auction={auction} />
            ))}
        </div>
      }
    </>
  );
};

const Explore = () => {
  return (
    <div className="flex flex-col items-center gap-y-8">
      <Newest />
      {
        // ADD CARDS
        /*
        <Typography variant="h2">Popular</Typography>
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
        {cardsPopular.map((_, index) => (
          <AuctionCard key={index} />
        ))}
        </div>*/
      }
    </div>
  );
};

export default Explore;
