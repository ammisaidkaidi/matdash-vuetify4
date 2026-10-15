import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
	vue(),
	vueDevTools(), // <--- Enable Vue DevTools here
],
  server: { host: "0.0.0.0", allowedHosts: true },
devtools: true
});
