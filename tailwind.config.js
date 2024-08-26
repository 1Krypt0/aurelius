/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				gold: '#b29e66'
			},
			gridTemplateRows: {
				layout: 'auto 1fr auto'
			}
		}
	},
	plugins: []
};
