import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { IconButton, Typography } from "@material-tailwind/react";

interface PaginationProps {
  active: number;
  setActive: (page: number) => void;
}

export function Pagination({ active, setActive }: PaginationProps) {
  const next = () => {
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography className="font-normal">
        Page <strong className="text-on-primary">{active}</strong>
      </Typography>
      <IconButton size="sm" variant="outlined" onClick={next}>
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}

export default Pagination;
