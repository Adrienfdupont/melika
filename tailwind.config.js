/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#592D68',
				'primary-bis': '#2d2751',
				secondary: '#14132B',
				'secondary-bis': '#1e1c36'
			},
			animation: {
				fade: 'fade 0.3s ease-in forwards',
				spin: 'spin 1s linear infinite'
			},
			keyframes: {
				fade: {
					'0%': { opacity: 1 },
					'50%': { opacity: 0.5 },
					'100%': { opacity: 1 }
				},
				spin: {
					'0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
					'100%': { transform: 'translate(-50%, -50%) rotate(360deg)' }
				}
			}
		}
	},
	plugins: []
};
