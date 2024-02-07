import React from "react";
import MainLayout from "./MainLayout";
import { Outlet } from "react-router-dom";

const MainLayoutNavigation = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default MainLayoutNavigation;
