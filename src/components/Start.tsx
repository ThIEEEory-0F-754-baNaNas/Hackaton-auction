import { Button, Typography } from "@material-tailwind/react";

type StartProps = {
  onButtonClick: () => void;
};

export function Start({ onButtonClick }: StartProps) {
  return (
    <div className="flex flex-col items-start justify-center gap-y-8">
      <Typography color="blue-gray" variant="h1">Auction</Typography>
      <Typography color="blue-gray" variant="h5" className="max-w-96">
        Are you ready to spend your money with double benefit? <br /> 
        Participate in auctions, pick up goods, and 
        part of the funds spent will be directed to charitable needs!
      </Typography>
      <Button className="mt-6 text-primary" fullWidth onClick={onButtonClick}>Get Started</Button>
    </div>
  );
}