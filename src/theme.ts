import gradient from "@material-tailwind/react/theme/components/timeline/timelineIconColors/gradient";

const theme = {
  button: {
    defaultProps: {
      color: "primary",
    },
    valid: {
      colors: ["primary"],
    },
    styles: {
      variants: {
        filled: {
          primary: {
            background: "bg-primary",
            color: "text-on-primary",
          },
        },
        outlined: {
          primary: {
            border: "border border-primary",
            color: "text-primary",
          },
        },
        gradient: {
          primary: {
            background: "bg-primary",
            color: "text-on-primary",
          },
        },
        text: {
          primary: {
            color: "text-on-primary",
          },
        },
      },
    },
  },
  input: {
    defaultProps: {
      color: "outlined",
    },
    styles: {
      base: {
        input: {
          color: "text-on-primary",
        },
        label: {
          color: "text-on-primary",
        },
      },
    },
  },
  menu: {
    styles: {
      base: {
        menu: {
          bg: "bg-bg",
          color: "text-on-bg",
        },
        item: {
          initial: {
            bg: "hover:bg-primary",
            color: "hover:text-on-primary ",
          },
        },
      },
    },
  },

  card: {
    defaultProps: {
      color: "bg",
      variant: "filled",
    },
    valid: {
      colors: ["primary", "bg"],
    },
    styles: {
      variants: {
        filled: {
          primary: {
            background: "bg-primary",
            color: "text-on-primary",
          },
          bg: {
            background: "bg-bg",
            color: "text-on-bg",
          },
        },
      },
    },
  },
};

export default theme;
