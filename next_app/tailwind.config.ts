import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent-red": "#E53935",
        "dark-grey": "#424242",
        "light-grey": "#EEEEEE",
        "off-white": "#FAFAFA",
        "deep-black": "#212121",
      },
      fontFamily: {
        heading: ["Cormorant Garamond", "serif"],
        paragraph: ["Roboto", "sans-serif"],
      },
      boxShadow: {
        "soft": "0 4px 20px -2px rgba(0,0,0,0.08), 0 2px 8px -2px rgba(0,0,0,0.04)",
        "soft-lg": "0 12px 40px -4px rgba(0,0,0,0.12), 0 4px 16px -2px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
};
export default config;
