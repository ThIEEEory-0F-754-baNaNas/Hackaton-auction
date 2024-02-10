import { Button, Typography } from "@material-tailwind/react";

type GetStartedProps = {
  onButtonClick: () => void;
};

export function GetStarted({ onButtonClick }: GetStartedProps) {
  return (
    <div className="flex flex-col 2xl:items-start items-center justify-center gap-y-8">
      <Typography color="blue-gray" variant="h1">Auction</Typography>
      <Typography color="blue-gray" variant="h5" className="max-w-96">
        Are you ready to spend your money with double benefit? <br /> 
        Participate in auctions, pick up goods, and 
        part of the funds spent will be directed to charitable needs!
      </Typography>
      <Button className="mt-6" variant="gradient" onClick={onButtonClick}>Get Started</Button>
    </div>
  );
}