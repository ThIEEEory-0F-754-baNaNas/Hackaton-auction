import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

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
            border: "border border-on-primary",
            color: "text-on-primary",
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
              "hover:text-on-primary focus:text-on-primary active:text-on-primary",
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
  dialog: {
    styles: {
      base: {
        container: {
          bg: "bg-bg",
          color: "text-on-bg",
        },
      },
    },
  },
  carousel: {
    defaultProps: {
      // @ts-ignore
      prevArrow: ({ loop, handlePrev, firstIndex }) => {
        return (
          <button
            onClick={handlePrev}
            disabled={!loop && firstIndex}
            className="!absolute top-2/4 left-4 -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[48px] h-12 max-h-[48px] text-on-primary hover:text-on-primary-alt active:bg-primary/30 grid place-items-center"
          >
            <ChevronLeftIcon strokeWidth={3} className="-ml-1 h-7 w-7" />
          </button>
        );
      },
      // @ts-ignore
      nextArrow: ({ loop, handleNext, lastIndex }) => (
        <button
          onClick={handleNext}
          disabled={!loop && lastIndex}
          className="!absolute top-2/4 right-4 -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[48px] h-12 max-h-[48px] text-on-primary hover:text-on-primary-alt active:bg-primary/30 grid place-items-center"
        >
          <ChevronRightIcon strokeWidth={3} className="ml-1 h-7 w-7" />
        </button>
      ),
      // @ts-ignore
      navigation: ({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-3 w-3 cursor-pointer rounded-full transition-colors content-['c'] ${
                activeIndex === i ? "text-on-primary-alt" : "text-on-primary"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      ),
      autoplay: false,
      autoplayDelay: 5000,
      transition: {
        type: "tween",
        duration: 0.5,
      },
      loop: false,
      className: "",
    },
    styles: {
      base: {
        carousel: {
          position: "relative",
          width: "w-full",
          height: "h-full",
          overflowX: "overflow-x-hidden",
          display: "flex",
        },

        slide: {
          width: "w-full",
          height: "h-full",
          display: "inline-block",
          flex: "flex-none",
        },
      },
    },
  },
};

export default theme;
