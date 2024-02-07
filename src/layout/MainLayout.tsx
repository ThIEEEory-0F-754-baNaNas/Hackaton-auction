import {
  Avatar,
  Button,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import classNames from "classnames";
import React from "react";

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const profileMenuItems = [
    { label: "Profile" },
    { label: "Settings" },
    { label: "Log out" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Avatar
          variant="circular"
          size="sm"
          alt="tania andrew"
          className="border border-gray-900 p-0.5 cursor-pointer"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        />
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${classNames({
                "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10":
                  isLastItem,
              })}`}
            >
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

const Navbar = () => {
  return (
    <div className="text-on-primary flex">
      <Typography
        as="a"
        href="#"
        variant="h6"
        className="mr-4 ml-2 cursor-pointer py-1.5 w-drawer"
      >
        Auctions
      </Typography>

      <div className="flex justify-between w-full">
        <div className="flex-grow pr-9 max-w-[700px]">
          <Input label="Search" crossOrigin={"unknown"} />
        </div>

        <div className="flex gap-2 min-w-fit">
          <Button variant="text">Log in</Button>
          <Button variant="gradient">Sign in</Button>
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
};

const MainLayout = () => {
  return (
    <div className="w-screen h-screen bg-bg px-5 pt-3">
      <Navbar />
    </div>
  );
};

export default MainLayout;
