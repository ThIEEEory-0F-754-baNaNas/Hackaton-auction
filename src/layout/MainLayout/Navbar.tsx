import { Button, Input, Typography } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUCTION_ITEMS, EXPLORE } from "../../Navigation";
import { UserContext } from "../../context/userContext";
import { ProfileMenu } from "./ProfileMenu";

export const Navbar = () => {
  const [user] = useContext(UserContext);

  return (
    <div className="text-on-primary flex justify-between">
      <Typography
        as="a"
        href="#"
        variant="h6"
        className="cursor-pointer py-1.5 md:w-drawer md:min-w-drawer"
      >
        Auctions
      </Typography>

      <div className="flex justify-between md:w-full">
        <div className="hidden md:block md:flex-grow md:max-w-[700px]">
          <SearchInput />
        </div>

        <div className="flex gap-2 min-w-fit">
          {user ? (
            <ProfileMenu />
          ) : (
            <>
              <Button variant="text">Log in</Button>
              <Button variant="gradient">Sign in</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const SearchInput = () => {
  const [title, setTitle] = useState("");
  const navigation = useNavigate();

  return (
    <Input
      value={title}
      onChange={(e) => {
        setTitle(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setTitle("");
          navigation(`${EXPLORE}${AUCTION_ITEMS}?title=${title}`);
        }
      }}
      label="Search"
      crossOrigin={"unknown"}
    />
  );
};
