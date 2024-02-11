import React, { useState } from 'react';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { signUp } from '../api/userApi';

type SignUpProps = {
  onButtonClick: () => void;
};

export function SignUp({ onButtonClick }: SignUpProps) {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = { firstname, lastname, username, email, password, avatar };
    const user = await signUp(data);
    console.log(user);
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h1" color="blue-gray">
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
          <Input
            type="text"
            label="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)} 
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
        <Button className="mt-6" variant="gradient" fullWidth type="submit">
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
