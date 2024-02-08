import { SignIn } from "../components/SignIn";
import { SignUp } from "../components/SignUp";
import { useState } from "react";
import { Start } from "../components/Start";
import HammerImg from "../img/auction-hammer.png";
 
export function Home() {
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

  let ComponentToShow = Start;
  if (showSignUp) {
    ComponentToShow = SignUp;
  } else if (showSignIn) {
    ComponentToShow = SignIn;
  }

  return (
    <div className="flex items-center justify-center gap-x-16 xl:gap-x-60 mx-auto min-h-screen bg-primary">
      <ComponentToShow onButtonClick={showSignUp ? handleSignIn : handleSignUp} />
      <img className="lg:block hidden" src={HammerImg} alt="Hammer" />
    </div>
  );
}
