import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    assetsInclude: [
        "**/*.xlsx",
        "**/*.pdf",
        "**/*.png",
        "**/*.jpg",
        "**/*.jpeg",
        "**/*.svg",
        "**/*.zip",
        "**/*.doc",
        "**/*.docx",
        "**/*.ppt",
        "**/*.pptx",
    ],
    server: {
        proxy: {
            "/api": "http://localhost:5009",
        },
        host: true,
        port: 3002, // change to any desired port
    },
});
