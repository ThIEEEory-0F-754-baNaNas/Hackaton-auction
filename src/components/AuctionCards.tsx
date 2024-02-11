import { Spinner, Typography } from "@material-tailwind/react";
import { AuctionItemT } from "../api/auctionApi";
import AuctionCard from "./AuctionCard";
import ErrorIndicator from "./ErrorIndicator";
import Pagination from "./Pagination";

interface AuctionCardsProps {
  useState: {
    setPage: (page: number) => void;
    page: number;
  };
  useQuery: {
    isError: boolean;
    error: unknown;
    isLoading: boolean;
    isRefetching: boolean;
  };
  auctions: AuctionItemT[] | undefined;
  label?: string;
}

const AuctionCards = ({
  useQuery: { isError, error, isLoading, isRefetching },
  auctions,
  useState: { setPage, page },
  label = "No auctions found",
}: AuctionCardsProps) => {
  if (isError) return <ErrorIndicator error={error} />;

  const mainContent =
    isLoading || isRefetching ? (
      <Spinner />
    ) : (
      <>
        {auctions!.length === 0 && (
          <div className="text-center w-full">
            <Typography variant="h4">{label}</Typography>
          </div>
        )}

        <div className="w-full grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
          {auctions!.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      </>
    );

  return (
    <>
      {mainContent}
      <Pagination
        setActive={setPage}
        active={page}
        hasNext={(auctions?.length || 0) > 0}
      />
    </>
  );
};

export default AuctionCards;
