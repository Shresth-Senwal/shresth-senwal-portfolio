import { serve } from "bun";
import { join } from "path";

const PORT = 8080;

console.log("🚀 Starting Bun Native Dev Environment...");

// 1. Run Tailwind CLI in watch mode using Bun's native execution
const tailwind = Bun.spawn(["bunx", "--bun", "tailwindcss", "-i", "./src/index.css", "-o", "./public/index.css", "--watch"], {
    stdout: "inherit",
    stderr: "inherit",
});

// 2. Build JS/TS in watch mode using Bun's native bundler
const bundler = Bun.spawn(["bun", "build", "./src/main.tsx", "--outdir", "./public/dist", "--watch"], {
    stdout: "inherit",
    stderr: "inherit",
});

// 3. Serve the directory
console.log(`🌐 Dev server running at http://localhost:${PORT}`);

serve({
    port: PORT,
    async fetch(req) {
        const url = new URL(req.url);
        let path = url.pathname;

        if (path === "/") path = "/index.html";

        // Try serving from public folder (where tailwind and bundle output go in dev)
        let filePath = join(process.cwd(), "public", path);
        let file = Bun.file(filePath);

        if (!(await file.exists())) {
            // Try serving from root (for index.html)
            filePath = join(process.cwd(), path);
            file = Bun.file(filePath);
        }

        // Fallback to index.html for SPA routing
        if (!(await file.exists())) {
            file = Bun.file(join(process.cwd(), "index.html"));
        }

        return new Response(file);
    },
});

// Cleanup on exit
process.on("SIGINT", () => {
    console.log("\n👋 Shutting down...");
    tailwind.kill();
    bundler.kill();
    process.exit();
});
