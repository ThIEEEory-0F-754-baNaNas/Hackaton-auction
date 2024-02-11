import { Select, Typography, Option } from "@material-tailwind/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { AuctionItemT, getNewestAuctionItems } from "../api/auctionApi";
import AuctionCards from "../components/AuctionCards";

const Newest = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<keyof AuctionItemT>("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const sortOptions = [
    { value: "createdAt", label: "Created at" },
    { value: "startPrice", label: "Start price" },
  ];

  const orderOptions = [
    { value: "desc", label: "desc" },
    { value: "asc", label: "asc" },
  ];

  const {
    data: cardsNewest,
    isLoading,
    isRefetching,
    isError,
    error,
  } = useQuery(["newest", { page, sort, order }], () => getNewestAuctionItems(4, page, sort, order), {
    retry: 1,
    cacheTime: 1000 * 5,
  });

  return (
    <>
      <div className="w-full flex sm:flex-row flex-col gap-4 justify-between">
        <Typography variant="h2">Auctions</Typography>
        <div className="w-56">
          <Select
            label="Select Option"
            value={sort}
            onChange={(val) => setSort(val as keyof AuctionItemT)}
          >
            {sortOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div>

        <div className="w-56">
          <Select
            label="Select Option"
            value={order}
            onChange={(val) => setOrder(val as "asc" | "desc")}
          >
            {orderOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div>

      </div>
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
    </div>
  );
};

export default Explore;
