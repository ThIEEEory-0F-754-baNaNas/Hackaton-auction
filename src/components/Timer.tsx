import { Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";

export const TimerComponent = ({
  time,
  label,
}: {
  time: string;
  label: string;
}) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const ineterval = setInterval(() => {
      const now = new Date().getTime();
      const to = new Date(time).getTime();
      const distance = to - now;
      if (distance < 0) {
        clearInterval(ineterval);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        return;
      }

      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    });

    return () => {
      clearInterval(ineterval);
    };
  });

  return (
    <div className="flex items-baseline">
      <Typography variant="h4">{label} </Typography>
      <Typography variant="paragraph" className="ml-5">
        {days}d {hours}h {minutes}m {seconds}s
      </Typography>
    </div>
  );
};
