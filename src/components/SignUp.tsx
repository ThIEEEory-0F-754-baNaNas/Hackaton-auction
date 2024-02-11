import React, { useContext, useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { signUp } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { HOME, SIGN_IN } from "../Navigation";
import { useQuery } from "react-query";
import { UserContext } from "../context/userContext";
import ErrorIndicator from "./ErrorIndicator";
import UploadFile from "./UploadFile";

export function SignUp() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File[]>([]);

  const navigate = useNavigate();
  const [, setUser] = useContext(UserContext);

  const onButtonClick = () => {
    navigate(SIGN_IN);
  };

  const { isLoading, isError, error, refetch } = useQuery(
    "signUp",
    () => signUp({ firstname, lastname, username, email, password, avatar }),
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
        Sign Up
      </Typography>
      <form className="mt-8 mb-2 sm:w-full w-48" onSubmit={handleSubmit}>
        <div className="mb-1 flex flex-col gap-6">
          <Input
            label="First name"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            crossOrigin={undefined}
          />
          <Input
            label="Last Name"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            crossOrigin={undefined}
          />
          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            crossOrigin={undefined}
          />
          <Input
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
          <UploadFile label="Avatar" onUpload={setAvatar} showButton={false} />
        </div>
        <Checkbox
          label={
            <Typography
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
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
          crossOrigin={undefined}
        />
        <Button className="mt-6" variant="gradient" fullWidth type="submit">
          Sign Up
          {isLoading && <Spinner />}
        </Button>
        <Typography className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a
            href="#"
            className="font-bold text-gray-900"
            onClick={onButtonClick}
          >
            Sign In
          </a>
        </Typography>
        {isError && <ErrorIndicator error={error} />}
      </form>
    </Card>
  );
}
