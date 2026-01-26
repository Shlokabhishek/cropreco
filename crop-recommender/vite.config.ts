import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration for React + TypeScript
export default defineConfig({
	plugins: [react()],
	server: {
		port: 5173
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"]
	}
});
