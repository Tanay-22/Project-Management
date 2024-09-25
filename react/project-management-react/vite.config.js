import path from "path"
import react from "@vitejs/plugin-react"
import {defineConfig} from "vite"

export default defineConfig({
  define: {
    global: 'window', // Polyfill global with window object
  },
    plugins: [react()],
    resolve: {
        alias: {
            // eslint-disable-next-line no-undef
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
