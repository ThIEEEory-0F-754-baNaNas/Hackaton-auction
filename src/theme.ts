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
            color: "text-primary",
          },
        },
      },
    },
  },
};

export default theme;
