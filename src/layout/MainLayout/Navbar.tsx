import { Button, Input, Typography } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUCTION_ITEMS, SIGN_IN, SIGN_UP } from "../../Navigation";
import Link from "../../components/Link";
import { UserContext } from "../../context/userContext";
import { ProfileMenu } from "./ProfileMenu";
import { Deposit } from "../../components/Deposit";

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

        <div className="flex gap-8 min-w-fit items-center">
          {!user.isNotOk ? (
            <>
              <Deposit deposit={user.balance} />
              <ProfileMenu />
            </>
          ) : (
            <>
              <Link to={SIGN_UP}>
                <Button variant="text">Sign up</Button>
              </Link>
              <Link to={SIGN_IN}>
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
