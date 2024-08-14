import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#4ADE80FF',
                secondary: '#14171A',
                gray: '#657786',
                white: '#FFFFFF',
                black: '#000000',
                success: '#4ADE80FF',
                error: '#e02424',
            },
        },
    },
}