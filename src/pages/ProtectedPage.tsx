import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SIGN_IN } from "../Navigation";
import { User } from "../api/userApi";
import { Spinner } from "@material-tailwind/react";

interface Props {
  user: User | null;
  redirectTo?: string;
  children?: React.ReactNode;
}

const ProtectedPage = ({ user, redirectTo = SIGN_IN, children }: Props) => {
  const [isLoading, setLoading] = useState(true);

  // TODO: use real loading
  useEffect(() => {
    if (user) {
      setLoading(false);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [user]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedPage;
