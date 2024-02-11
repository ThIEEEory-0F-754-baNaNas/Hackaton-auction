import { Spinner } from "@material-tailwind/react";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { START } from "../Navigation";
import { User } from "../api/userApi";
import { getTokenOrEmpty } from "../utils/apiUtils";

interface Props {
  user: User;
  redirectTo?: string;
  children?: React.ReactNode;
}

const ProtectedPage = ({ user, redirectTo = START, children }: Props) => {
  const token = getTokenOrEmpty();

  if (token && user.isNotOk && user.isLoading) {
    return <Spinner />;
  }

  if ((user.isNotOk && !user.isLoading) || !token) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedPage;
