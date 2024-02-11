import { Button, Input, Typography } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUCTION_ITEMS, SIGN_IN, SIGN_UP } from "../../Navigation";
import Link from "../../components/Link";
import { UserContext } from "../../context/userContext";
import { ProfileMenu } from "./ProfileMenu";
import { Deposit } from "../../components/Deposit";
import { addDeposit } from "../../api/userApi";

export const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
  const [depositAmount, setDepositAmount] = useState(0);

  const handleAddDeposit = async () => {
    await addDeposit(depositAmount);
    if (user.isNotOk) throw new Error;
    setUser({ ...user, balance: user.balance + depositAmount });
  };

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
              <Input
                type="number"
                placeholder={depositAmount.toString()}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                label="Add Deposit" 
                crossOrigin={undefined}              
              />
              <Button onClick={handleAddDeposit}>
                Add Deposit
              </Button>
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
