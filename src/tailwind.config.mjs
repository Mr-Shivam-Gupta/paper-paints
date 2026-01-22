/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.25', letterSpacing: '0.02em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.375', letterSpacing: '0.02em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '500' }],
                xl: ['1.25rem', { lineHeight: '1.6', letterSpacing: '0.01em', fontWeight: '500' }],
                '2xl': ['1.5rem', { lineHeight: '1.6', letterSpacing: '0.01em', fontWeight: '600' }],
                '3xl': ['1.875rem', { lineHeight: '1.2', letterSpacing: '0.01em', fontWeight: '700' }],
                '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '0.01em', fontWeight: '700' }],
                '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '0.005em', fontWeight: '700' }],
                '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '0.005em', fontWeight: '700' }],
                '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '0.005em', fontWeight: '700' }],
                '8xl': ['6rem', { lineHeight: '1.05', letterSpacing: '0.005em', fontWeight: '700' }],
                '9xl': ['8rem', { lineHeight: '1.05', letterSpacing: '0.005em', fontWeight: '700' }],
            },
            fontFamily: {
                heading: "cormorantgaramond",
                paragraph: "roboto"
            },
            colors: {
                'accent-red': '#E53935',
                'dark-grey': '#424242',
                'light-grey': '#EEEEEE',
                'off-white': '#FAFAFA',
                'deep-black': '#212121',
                destructive: '#B00020',
                'destructive-foreground': '#FFFFFF',
                background: '#F5F5F5',
                secondary: '#424242',
                foreground: '#212121',
                'secondary-foreground': '#FFFFFF',
                'primary-foreground': '#FFFFFF',
                primary: '#E53935'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
