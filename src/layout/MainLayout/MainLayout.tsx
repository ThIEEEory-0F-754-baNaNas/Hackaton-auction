import { PropsWithChildren } from "react";
import { Drawer } from "./Drawer";
import { Navbar } from "./Navbar";

const MainContent = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-primary w-full h-full -center rounded-2xl relative p-4 overflow-auto">
      {children}
    </div>
  );
};

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-screen h-screen bg-bg px-3 py-2 md:px-5 md:py-3 flex flex-col">
      <Navbar />
      <div className="flex grow overflow-auto mt-3">
        <div className="w-12 md:pr-5 md:mt-8 md:w-drawer md:min-w-drawer ">
          <Drawer />
        </div>
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
};

export default MainLayout;
