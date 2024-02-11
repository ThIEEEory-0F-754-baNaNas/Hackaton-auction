import React, { useContext, useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { signIn } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { HOME, SIGN_UP } from "../Navigation";
import { useQuery } from "react-query";
import ErrorIndicator from "./ErrorIndicator";
import { UserContext } from "../context/userContext";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [, setUser] = useContext(UserContext);

  const onButtonClick = () => {
    navigate(SIGN_UP);
  };

  const { isLoading, isError, error, refetch } = useQuery(
    "signIn",
    () => signIn(email, password),
    {
      retry: 0,
      enabled: false,
      onSuccess: (data) => {
        setUser(data);
        navigate(HOME);
      },
    }
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    refetch();
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h1">
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
          {isLoading && <Spinner />}
        </Button>
        <Typography className="mt-4 text-center font-normal">
          Don't have an account?{" "}
          <a
            href="#"
            className="font-bold text-gray-900"
            onClick={onButtonClick}
          >
            Sign Up
          </a>
        </Typography>
        {isError && <ErrorIndicator error={error} />}
      </form>
    </Card>
  );
}
