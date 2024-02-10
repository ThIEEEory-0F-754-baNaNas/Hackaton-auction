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
      <form className="mt-8 mb-2 sm:w-full w-48">
        <div className="mb-1 flex flex-col gap-6">
          <Input
            label="First name"
            crossOrigin={undefined}        
          />
          <Input
            label="Last Name"
            crossOrigin={undefined}        
          />
          <Input
            label="Username"
            crossOrigin={undefined}        
          />
          <Input
            label="Email"
            crossOrigin={undefined}          
          />
          <Input
            label="Password"
            crossOrigin={undefined}          
          />
        </div>
        <Checkbox
          label={<Typography
            variant="small"
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
        <Button className="mt-6" variant="gradient" fullWidth>
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
