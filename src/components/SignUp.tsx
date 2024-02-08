import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

type SignUpProps = {
  onButtonClick: () => void;
};
 
export function SignUp({ onButtonClick }: SignUpProps) {
  return (
     <Card color="transparent" shadow={false}>
      <Typography variant="h1" color="blue-gray">
        Sign Up
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Login
          </Typography>
          <Input
            size="lg"
            placeholder="login"
            className="!border-gray-900 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }} 
            crossOrigin={undefined}        
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-gray-900 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }} 
            crossOrigin={undefined}          
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-gray-900 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }} 
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
            I agree the
            <a
              href="#"
              className="font-medium transition-colors hover:text-gray-900"
            >
              &nbsp;Terms and Conditions
            </a>
          </Typography>}
          containerProps={{ className: "-ml-2.5" }} 
          crossOrigin={undefined}        
        />
        <Button className="mt-6 text-primary" fullWidth>
          Sign Up
        </Button>
        <Typography color="blue-gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a href="#" className="font-bold text-gray-900" onClick={onButtonClick}>
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
  );
}