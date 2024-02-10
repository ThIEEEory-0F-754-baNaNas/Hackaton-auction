import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

type SignInProps = {
  onButtonClick: () => void;
};
 
export function SignIn({ onButtonClick }: SignInProps) {
  return (
     <Card color="transparent" shadow={false}>
      <Typography variant="h1" color="blue-gray">
        Sign In
      </Typography>
      <form className="mt-8 mb-2 sm:w-full w-48">
        <div className="mb-1 flex flex-col gap-6">
          <Input
            className=""
            label="Email"
            crossOrigin={undefined}
          />
          <Input
            label="Password"
            crossOrigin={undefined}          
          />
        </div>
        <Checkbox
          className="border-gray-900"
          label={<Typography
            variant="small"
            color="blue-gray"
            className="flex items-center font-normal"
          >
            Remember me
          </Typography>}
          containerProps={{ className: "-ml-2.5" }} 
          crossOrigin={undefined}        
        />
        <Button className="mt-6" variant="gradient" fullWidth>
          Sign In
        </Button>
        <Typography color="blue-gray" className="mt-4 text-center font-normal">
          Don't have an account?{" "}
          <a href="#" className="font-bold text-gray-900" onClick={onButtonClick}>
            Sign Up
          </a>
        </Typography>
      </form>
    </Card>
  );
}
