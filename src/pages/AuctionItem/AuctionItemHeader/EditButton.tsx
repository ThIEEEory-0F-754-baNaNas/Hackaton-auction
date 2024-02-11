import { Button } from "@material-tailwind/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EDIT_AUCTION } from "../../../Navigation";
import { AuctionItemT } from "../../../api/auctionApi";
import { UserContext } from "../../../context/userContext";
import { isActive, isExpired } from "../../../utils/time";

const EditButton = ({ auction }: { auction: AuctionItemT }) => {
  const [user] = useContext(UserContext);
  const navigate = useNavigate();
  const canEdit =
    !isActive(auction.startTime, auction.endTime) &&
    !isExpired(auction.endTime);

  if (user.isNotOk || auction.userId !== user.id) return null;

  return (
    <div className="flex justify-end">
      <Button
        disabled={!canEdit}
        onClick={() =>
          navigate(`${EDIT_AUCTION}/${auction.id}`, { state: auction })
        }
      >
        Edit
      </Button>
    </div>
  );
};

export default EditButton;
