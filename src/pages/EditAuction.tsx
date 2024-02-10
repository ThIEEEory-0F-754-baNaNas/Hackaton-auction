import React from "react";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { getAuctionItem } from "../api/auctionApi";
import { Spinner } from "@material-tailwind/react";
import ErrorIndicator from "../components/ErrorIndicator";

const EditAuction = () => {
  const { id: auctionId = "" } = useParams();
  const { state } = useLocation();
  if (!auctionId) throw new Error("No auction id");

  const { data, isLoading, isError, error } = useQuery(
    "editAuction",
    async () => await getAuctionItem(auctionId),
    {
      enabled: !state,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );
  const auction = data || state;

  if (isError) return <ErrorIndicator error={error} />;

  return (
    <div>
      {isLoading && <Spinner />}
      {auction && <p>Edit Auction: {auction.title}</p>}
    </div>
  );
};

export default EditAuction;
