import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import { CREATE_AUCTION, EXPLORE, HOME } from "../../Navigation";
import Divider from "../../components/Divider";
import Link from "../../components/Link";
import { HomeIcon } from "../../icons/HomeIcon";

export const Drawer = () => {
  const location = useLocation();
  const isSelected = (path: string) => location.pathname.startsWith(path);
  const list = [
    {
      label: "Home",
      path: HOME,
      icon: <HomeIcon isOutlined={!isSelected(HOME)} />,
    },
    {
      label: "Explore",
      path: EXPLORE,
      icon: <MagnifyingGlassIcon className="h-5 w-5" />,
    },
    {
      label: "Create Auction",
      path: CREATE_AUCTION,
      icon: <PlusIcon className="h-5 w-5"/>,
    },
  ];

  return (
    <div className="flex gap-3 flex-col">
      <List className="p-0 min-w-[20px]">
        {list.map(({ label, path, icon }) => (
          <Link to={path} key={label}>
            <ListItem selected={isSelected(path)}>
              <ListItemPrefix>{icon}</ListItemPrefix>
              {label}
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </div>
  );
};
