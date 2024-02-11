import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CreateAuctionDto, getAuctionItem, updateAuctionItem } from '../api/auctionApi';
import { Button, Input, Card, Typography } from '@material-tailwind/react';
import { Spinner } from "@material-tailwind/react";
import { AUCTION_ITEMS } from '../Navigation';
import ErrorIndicator from "../components/ErrorIndicator";
import UploadFile from '../components/UploadFile';

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
  const [images, setImages] = useState(auction?.images || []);

  const handleUpload = (files: File[]) => {
    setImages(files);
  };

  const navigate = useNavigate();

  const editData: CreateAuctionDto = {
    title,
    description,
    startPrice,
    minPriceStep,
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
  };

  const { isLoading: isEditLoading, isError: isEditError, error: editError, refetch } = useQuery(
    "auctionEdit",
    () => updateAuctionItem(editData, images, auctionId),
    {
      retry: 0,
      enabled: false,
      onSuccess: (data) => {
        navigate(`${AUCTION_ITEMS}/${data.id}`)
      }
    }
  )

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    refetch();
  };

  useEffect(() => {
    if (auction) {
      setTitle(auction.title);
      setDescription(auction.description);
      setStartPrice(auction.startPrice);
      setMinPriceStep(auction.minPriceStep);
      setImages(auction.images);
    }
  }, [auction]);

  if (isError) return <ErrorIndicator error={error} />;

  return (
    <div className="h-full">
      {isLoading && <Spinner />}
      {auction && (
        <Card className="h-full p-4">
          <Typography variant="h2" className="mb-8">Edit Auction</Typography>
          <form className="flex flex-col h-full justify-between" onSubmit={handleSubmit}>
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
            <UploadFile onUpload={handleUpload} showButton={false} label="Image" multiple={true} />
            <Button type="submit">
              {isEditLoading && <Spinner />}
              Update Auction
            </Button>
            {isEditError && <ErrorIndicator error={editError} />}
          </form>
        </Card>
      )}
    </div>
  );
};

export default EditAuction;

