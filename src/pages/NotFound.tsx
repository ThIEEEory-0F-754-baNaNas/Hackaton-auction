import { Button, Typography } from "@material-tailwind/react";
import { useNavigate, useRouteError } from "react-router-dom";
import { HOME } from "../Navigation";

const NotFound = () => {
  const error = useRouteError();
  const status = error?.status || 404;
  const statusText = error?.statusText || "Not Found";
  const data = error?.data;

  const navigate = useNavigate();

  return (
    <div className="bg-bg w-screen h-screen flex justify-center items-center text-on-primary">
      <div>
        <Typography variant="h1" className="text-center">
          {status} {statusText}
        </Typography>
        <Typography variant="paragraph" className="text-center">
          {data}
        </Typography>
        <div className="mt-5 w-full flex justify-center">
          <Button
            variant="gradient"
            onClick={() => {
              navigate(HOME);
            }}
          >
            To Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
