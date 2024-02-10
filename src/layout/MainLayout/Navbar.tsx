import { Button, Input, Typography } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUCTION_ITEMS, START } from "../../Navigation";
import { UserContext } from "../../context/userContext";
import { ProfileMenu } from "./ProfileMenu";
import Link from "../../components/Link";

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
        <div className="hidden md:block md:flex-grow md:max-w-[700px] mr-5">
          <SearchInput />
        </div>

        <div className="flex gap-2 min-w-fit">
          {!user.isNotOk ? (
            <ProfileMenu />
          ) : (
            <>
              <Link to={START}>
                <Button variant="text">Sign up</Button>
              </Link>
              <Link to={START}>
                <Button variant="gradient">Sign in</Button>
              </Link> 
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
          navigation(`${AUCTION_ITEMS}?title=${title}`);
        }
      }}
      label="Search"
      crossOrigin={"unknown"}
    />
  );
};
