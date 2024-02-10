import { Carousel } from "@material-tailwind/react";
import { PropsWithChildren, useRef } from "react";

const CarouselLayout = ({ children }: PropsWithChildren) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="text-on-primary">
      <Carousel id="container">{children}</Carousel>
    </div>
  );
};

export default CarouselLayout;
