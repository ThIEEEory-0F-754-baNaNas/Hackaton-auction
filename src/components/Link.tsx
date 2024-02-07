import React from "react";
import { Link as LinkRouter } from "react-router-dom";

interface LinkProps {
  to: string;
  children: React.ReactNode;
}

const Link = ({ to, children }: LinkProps) => {
  return <LinkRouter to={to}>{children}</LinkRouter>;
};

export default Link;
