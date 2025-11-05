module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#EEF7F1",
          100: "#D8EFE0",
          200: "#B6E3C6",
          300: "#8FD4A8",
          400: "#68C58A",
          500: "#36B16A",
          600: "#2E9659",
          700: "#247A48",
          800: "#1D603B",
          900: "#124127",
        },
        accent: {
          400: "#F4C84A",
          500: "#EFB933",
        },
      },
    },
  },
  plugins: [],
};
