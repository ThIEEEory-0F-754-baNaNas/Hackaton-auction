import { Alert } from "@material-tailwind/react";

interface Props {
  error: unknown;
  msg?: string;
}

const ErrorIndicator = ({ msg, error }: Props) => {
  if (!error) throw new Error("No error provided");
  if (!(error instanceof Error)) throw error;

  const message = error.message || "Error occurred";
  const displayMessage = msg ? `${msg}: ${message}` : message;
  return <Alert color="red">{displayMessage}</Alert>;
};

export default ErrorIndicator;
