import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { CreateAuctionDto, createAuctionItem } from "../api/auctionApi";

const CreateAuction = () => {
  const [user] = useContext(UserContext);
  const fakeData: CreateAuctionDto = {
    title: "",
    description: "",
    startPrice: 100,
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    minPriceStep: 100,
    images: ["https://via.placeholder.com/150"],
  };

  useEffect(() => {
    createAuctionItem(fakeData).then((res) => {
      console.log(res);
    });
  }, [user]);

  if (!user) return null;

  return <div>CreateAuction</div>;
};

export default CreateAuction;
