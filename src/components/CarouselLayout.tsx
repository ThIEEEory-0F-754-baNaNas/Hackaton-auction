import { Carousel, Typography } from "@material-tailwind/react";
import { PropsWithChildren, useRef } from "react";

const CarouselLayout = ({ children }: PropsWithChildren) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="text-on-primary">
      <Typography variant="h3" className="mb-4">
        Popular
      </Typography>
      <Carousel id="container">{children}</Carousel>
    </div>
  );
};

export default CarouselLayout;
