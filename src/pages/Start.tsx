import { useNavigate } from "react-router-dom";
import { GetStarted } from "../components/GetStarted";
import HammerImg from "../img/auction-hammer.png";
import { SIGN_UP } from "../Navigation";

export default function Start() {
  const navigation = useNavigate();
  const handleGetStartedClick = () => {
    navigation(SIGN_UP);
  };

  return (
    <div className="flex items-center justify-center 2xl:text-start text-center gap-x-32 rounded-2xl mx-auto min-h-full bg-bg">
      <GetStarted onButtonClick={handleGetStartedClick} />
      <img className="2xl:block hidden" src={HammerImg} alt="Hammer" />
    </div>
  );
}
