import MainLayout from "./MainLayout/MainLayout";
import { Outlet } from "react-router-dom";

const MainLayoutNavigation = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default MainLayoutNavigation;
