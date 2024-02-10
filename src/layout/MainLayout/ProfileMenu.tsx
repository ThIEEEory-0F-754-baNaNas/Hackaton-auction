import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import classNames from "classnames";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PROFILE, SETTINGS } from "../../Navigation";
import { UserContext } from "../../context/userContext";
import { removeToken } from "../../utils/apiUtils";

export function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) return null;
  const profileMenuItems = [
    { label: "Profile", onClick: () => navigate(PROFILE) },
    { label: "Settings", onClick: () => navigate(SETTINGS) },
    {
      label: "Log out",
      onClick: () => {
        removeToken();
        setUser(null);
        navigate("/");
      },
    },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Avatar
          variant="circular"
          size="sm"
          alt={user.username}
          className="border border-gray-900 p-0.5 cursor-pointer"
          src={user.avatar}
        />
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, onClick }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                closeMenu();
                onClick();
              }}
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
