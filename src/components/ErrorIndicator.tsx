import { Alert } from "@material-tailwind/react";
import React from "react";

interface Props {
  error: unknown;
}

const ErrorIndicator = ({ error }: Props) => {
  if (!error) throw new Error("No error provided");

  const message = error.message || "Error occurred";
  return <Alert color="red">{message}</Alert>;
};

export default ErrorIndicator;
