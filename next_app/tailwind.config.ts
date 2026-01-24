import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'accent-red': '#E53935',
                'dark-grey': '#424242',
                'light-grey': '#EEEEEE',
                'off-white': '#FAFAFA',
                'deep-black': '#212121',
            },
            fontFamily: {
                heading: ['Cormorant Garamond', 'serif'],
                paragraph: ['Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
