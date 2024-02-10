import { drawer } from "@material-tailwind/react";
import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "on-primary-alt": "var(--color-on-primary-alt)",
        "on-primary": "var(--color-on-primary)",
        bg: "var(--color-background)",

        // TODO: Map colors from the index.css
      },
      width: {
        drawer: "var(--left-drawer-width)",
      },
      maxWidth: {
        drawer: "var(--left-drawer-width)",
      },
      minWidth: {
        drawer: "var(--left-drawer-width)",
      },
    },
  },
  plugins: [],
});
