import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration for React + TypeScript
export default defineConfig({
	plugins: [react()],
	server: {
		port: 5173
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					// Split TensorFlow into its own chunk
					if (id.includes('node_modules/@tensorflow')) {
						return 'tensorflow';
					}
					// Split large visualization libraries
					if (id.includes('node_modules/plotly.js')) {
						return 'plotly';
					}
					if (id.includes('node_modules/recharts')) {
						return 'recharts';
					}
					// Split other node_modules into vendor chunk
					if (id.includes('node_modules')) {
						return 'vendor';
					}
				}
			}
		},
		chunkSizeWarningLimit: 1000
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"]
	}
});
