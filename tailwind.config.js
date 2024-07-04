/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'primary': '#592D68',
				'secondary': '#14132B'
			},
			animation: {
				'fade': 'fade 0.3s ease-in forwards',
			},
			keyframes: {
				fade: {
					'0%': { opacity: 1 },
					'50%': { opacity: 0.5 },
					'100%': { opacity: 1 },
				},
			}
		}
	},
	plugins: []
};
