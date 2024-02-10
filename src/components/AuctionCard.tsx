import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
 
export default function AuctionCard() {
  return (
    <Card className="w-56">
      <CardHeader shadow={false} floated={false} className="h-48">
        <img
          src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <Typography>
            Apple AirPods
          </Typography>
          <Typography>
            $95.00
          </Typography>
          <Typography>
            Time remaining: 1h
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          variant="gradient"
          fullWidth={true}
        >
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}
