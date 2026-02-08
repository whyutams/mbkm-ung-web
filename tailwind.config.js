/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'orange-500': '#f97316',
                'orange-600': '#ea580c',
                'orange-400': '#fb923c',
                'orange-100': '#ffedd5',
                'orange-50': '#fff7ed',
            },
            boxShadow: {
                'orange': '0 10px 40px -10px rgba(249, 115, 22, 0.4)',
                'orange-md': '0 15px 50px -15px rgba(249, 115, 22, 0.5)',
            },
        },
    },
    plugins: [],
}