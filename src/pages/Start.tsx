import { SignIn } from "../components/SignIn";
import { SignUp } from "../components/SignUp";
import { useState } from "react";
import { GetStarted } from "../components/GetStarted";
import HammerImg from "../img/auction-hammer.png";
 
export default function Start() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleSignUp = () => {
    setShowSignUp(true);
    setShowSignIn(false);
  };

  const handleSignIn = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  };

  let ComponentToShow = GetStarted;
  if (showSignUp) {
    ComponentToShow = SignUp;
  } else if (showSignIn) {
    ComponentToShow = SignIn;
  }

  return (
    <div className="flex items-center justify-center 2xl:text-start text-center gap-x-32 rounded-2xl mx-auto min-h-full bg-bg">
      <ComponentToShow onButtonClick={showSignUp ? handleSignIn : handleSignUp} />
      <img className="2xl:block hidden" src={HammerImg} alt="Hammer" />
    </div>
  );
}
