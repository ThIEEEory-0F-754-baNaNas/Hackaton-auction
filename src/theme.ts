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

  list: {
    styles: {
      base: {
        list: {
          color: "text-on-primary",
        },
        item: {
          initial: {
            bg: "hover:bg-primary hover:bg-opacity-80 focus:bg-primary focus:bg-opacity-80 active:bg-primary active:bg-opacity-80",
            color:
              "hover:text-blue-gray-900 focus:text-blue-gray-900 active:text-blue-gray-900",
          },
          selected: {
            bg: "bg-primary",
            color: "text-on-primary",
          },
          disabled: {
            bg: "hover:bg-transparent focus:bg-transparent active:bg-transparent",
            color:
              "hover:text-on-primary focus:text-on-primary active:text-on-primary",
          },
        },
      },
    },
  },
};

export default theme;
