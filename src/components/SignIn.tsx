import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { signIn } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { SIGN_UP } from "../Navigation";

export function SignIn() {
  // TODO: make it similar to SignUp
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate(SIGN_UP);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await signIn(email, password);
    if (result) {
      console.log("Signed in with token:", result.token);
      // TODO: extract to a api utils
      localStorage.setItem("token", result.token);
      window.location.reload();
    } else {
      console.log("Failed to sign in");
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h1" color="blue-gray">
        Sign In
      </Typography>
      <form className="mt-8 mb-2 sm:w-full w-48" onSubmit={handleSubmit}>
        <div className="mb-1 flex flex-col gap-6">
          <Input
            className=""
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            crossOrigin={undefined}
          />
          <Input
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            crossOrigin={undefined}
          />
        </div>
        <Checkbox
          className="border-gray-900"
          label={
            <Typography
              variant="small"
              color="blue-gray"
              className="flex items-center font-normal"
            >
              Remember me
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
          crossOrigin={undefined}
        />
        <Button className="mt-6" variant="gradient" fullWidth type="submit">
          Sign In
        </Button>
        <Typography color="blue-gray" className="mt-4 text-center font-normal">
          Don't have an account?{" "}
          <a
            href="#"
            className="font-bold text-gray-900"
            onClick={onButtonClick}
          >
            Sign Up
          </a>
        </Typography>
      </form>
    </Card>
  );
}
