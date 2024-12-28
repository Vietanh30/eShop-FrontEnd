/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: "0.7rem",
      sm: "0.8rem",
      base: "1rem",
      lg: "1.1rem",
      xl: "1.2rem",
      "2xl": "1.4rem",
      "3xl": "1.6rem",
      "4xl": "1.8rem",
      "5xl": "2rem",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary_color: "#00483D",
        sub_primary_color: "#009a82",
      },
    },
  },
  plugins: [],
};
