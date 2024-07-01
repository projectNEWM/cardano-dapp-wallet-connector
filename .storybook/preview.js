export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "light",
    values: [
      {
        name: "light",
        value: "#FFF",
      },
      {
        name: "dark",
        value: "#0A0A0A",
      },
    ],
  },
};
export const tags = ["autodocs"];
