import { Button } from "@material-tailwind/react";
import React from "react";
import { createAuctionItem } from "../api/auctionApi";
import { useNavigate } from "react-router-dom";
import { CREATE_AUCTION } from "../Navigation";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button variant="outlined" onClick={() => navigate(CREATE_AUCTION)}>
        Create Auction
      </Button>
    </div>
  );
};

export default Home;
