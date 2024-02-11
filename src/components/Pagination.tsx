import React from "react";
import { Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
 
export function Pagination() {
  const [active, setActive] = React.useState(1);
 
  const getItemProps = (index: React.SetStateAction<number>) =>
    ({
      variant: active === index ? "filled" : "text",
      onClick: () => setActive(index),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
 
  const next = () => {
    if (active === 3) return;
 
    setActive(active + 1);
  };
 
  const prev = () => {
    if (active === 1) return;
 
    setActive(active - 1);
  };
 
  return (
    <div className="flex items-center">
      <Button
        variant="text"
        className="flex items-center"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> 
      </Button>
      <div className="flex items-center">
        <Button {...getItemProps(1)}>1</Button>
        <Button {...getItemProps(2)}>2</Button>
        <Button {...getItemProps(3)}>3</Button>
      </div>
      <Button
        variant="text"
        className="flex items-center"
        onClick={next}
        disabled={active === 3}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}