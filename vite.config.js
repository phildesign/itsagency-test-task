import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

export default defineConfig({
	plugins: [
		handlebars({
			partialDirectory: resolve(__dirname, 'src/components'),
			partialExtension: '.html',
			order: 'pre',
			handler: (content) => content,
			handlebarsOptions: {
				helpers: {
					uppercase: (str) => str.toUpperCase(),
				},
			},
		}),
	],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "./src/styles/variables" as *;`,
			},
		},
	},
	server: {
		port: 3000,
		open: true,
	},
	build: {
		outDir: 'dist',
		emptyOutDir: true,
	},
});
