import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { CreateAuctionDto, createAuctionItem } from '../api/auctionApi';
import { Button, Input, Card, Typography } from '@material-tailwind/react';

const CreateAuction = () => {
  const [user] = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startPrice, setStartPrice] = useState(0);
  const [minPriceStep, setMinPriceStep] = useState(0);
  const [images, setImages] = useState('');
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data: CreateAuctionDto = {
      title,
      description,
      startPrice,
      minPriceStep,
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
      images: [images],
    };
    const res = await createAuctionItem(data);
    console.log(res);
  };

  if (!user) return null;

  return (
    <Card className="h-full p-4">
      <Typography variant="h2" className="mb-8">Create Auction</Typography>
      <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
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
          placeholder={startPrice.toString()}
          onChange={(e) => setStartPrice(Number(e.target.value))}
          crossOrigin={undefined}        
        />
        <Input
          type="number"
          label="Minimum Price Step"
          placeholder={startPrice.toString()}
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
        <Button type="submit" className="mb-4">
          Create Auction
        </Button>
      </form>
    </Card>
  );
};

export default CreateAuction;

