import { Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { getNewestAuctionItems } from "../api/auctionApi";
import AuctionCards from "../components/AuctionCards";

const Newest = () => {
  const [page, setPage] = useState(1);
  const {
    data: cardsNewest,
    isLoading,
    isRefetching,
    isError,
    error,
  } = useQuery(["newest", { page }], () => getNewestAuctionItems(4, page), {
    retry: 1,
  });

  return (
    <>
      <Typography variant="h2">Newest</Typography>
      <AuctionCards
        useState={{ page, setPage }}
        useQuery={{ isError, error, isLoading, isRefetching }}
        auctions={cardsNewest}
      />
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
