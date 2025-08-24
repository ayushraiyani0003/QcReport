import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
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
            "/api": "http://192.168.10.132:5011",
        },
        host: true,
        port: 3002, // change to any desired port
    },
});
