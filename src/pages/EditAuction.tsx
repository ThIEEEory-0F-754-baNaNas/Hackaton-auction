import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
import { getAuctionItem } from '../api/auctionApi';
import { Button, Input, Card, Typography } from '@material-tailwind/react';
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

  const [title, setTitle] = useState(auction?.title || '');
  const [description, setDescription] = useState(auction?.description || '');
  const [startPrice, setStartPrice] = useState(auction?.startPrice || 0);
  const [minPriceStep, setMinPriceStep] = useState(auction?.minPriceStep || 0);
  const [images, setImages] = useState(auction?.images[0] || '');

  useEffect(() => {
    if (auction) {
      setTitle(auction.title);
      setDescription(auction.description);
      setStartPrice(auction.startPrice);
      setMinPriceStep(auction.minPriceStep);
      setImages(auction.images[0]);
    }
  }, [auction]);

  if (isError) return <ErrorIndicator error={error} />;

  return (
    <div className="h-full">
      {isLoading && <Spinner />}
      {auction && (
        <Card className="h-full p-4">
          <Typography variant="h2" className="mb-8">Edit Auction</Typography>
          <form className="flex flex-col h-full justify-between">
            <Input
              type="text"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
              crossOrigin={undefined}            
            />
            <Input
              type="text"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
              crossOrigin={undefined}            
            />
            <Input
              type="number"
              label="Starting Price"
              value={startPrice}
              onChange={(e) => setStartPrice(Number(e.target.value))} 
              crossOrigin={undefined}            
            />
            <Input
              type="number"
              label="Minimum Price Step"
              value={minPriceStep}
              onChange={(e) => setMinPriceStep(Number(e.target.value))} 
              crossOrigin={undefined}            
            />
            <Input
              type="text"
              label="Image URL"
              value={images}
              onChange={(e) => setImages(e.target.value)} 
              crossOrigin={undefined}            
            />
            <Button type="submit">
              Update Auction
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
};

export default EditAuction;

