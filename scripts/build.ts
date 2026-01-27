import { build } from "bun";
import { copyFileSync, mkdirSync, readdirSync, statSync } from "fs";
import { join } from "path";

async function copyDir(src: string, dest: string) {
    mkdirSync(dest, { recursive: true });
    const entries = readdirSync(src);

    for (const entry of entries) {
        const srcPath = join(src, entry);
        const destPath = join(dest, entry);

        if (statSync(srcPath).isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            copyFileSync(srcPath, destPath);
        }
    }
}

async function runBuild() {
    console.log("🚀 Starting Bun Native Build...");

    // 1. Build CSS with Tailwind CLI (Native Bun execution)
    console.log("🎨 Building CSS...");
    const tailwind = Bun.spawnSync(["bunx", "--bun", "tailwindcss", "-i", "./src/index.css", "-o", "./public/index.css"]);
    if (!tailwind.success) {
        console.error("❌ Tailwind build failed");
        console.error(tailwind.stderr.toString());
        process.exit(1);
    }

    // 2. Build JS/TS with Bun.build
    console.log("📦 Bundling JS/TS...");
    const result = await build({
        entrypoints: ["./src/main.tsx"],
        outdir: "./dist/dist",
        minify: true,
        sourcemap: "none", // Smaller production build
        splitting: true,
        format: "esm",
        target: "browser",
        define: {
            "process.env.NODE_ENV": JSON.stringify("production"),
        },
    });

    if (!result.success) {
        console.error("❌ Bundle failed:");
        for (const message of result.logs) {
            console.error(message);
        }
        process.exit(1);
    }

    // 3. Copy public assets and index.html to dist
    console.log("📂 Copying assets...");
    try {
        if (readdirSync("./public").length > 0) {
            await copyDir("./public", "./dist");
        }
        copyFileSync("./index.html", "./dist/index.html");
    } catch (e) {
        console.error("❌ Asset copy failed:", e);
        process.exit(1);
    }

    console.log("✅ Build completed successfully!");
}

runBuild();
