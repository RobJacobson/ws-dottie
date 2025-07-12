#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

function analyzeBundle() {
  const distPath = path.join(process.cwd(), "dist");

  if (!fs.existsSync(distPath)) {
    console.log('❌ dist directory not found. Run "npm run build" first.');
    return;
  }

  const files = fs.readdirSync(distPath);
  const jsFiles = files.filter(
    (file) =>
      file.endsWith(".js") || file.endsWith(".cjs") || file.endsWith(".mjs")
  );
  const dtsFiles = files.filter(
    (file) => file.endsWith(".d.ts") || file.endsWith(".d.cts")
  );
  const mapFiles = files.filter((file) => file.endsWith(".map"));

  console.log("📦 Bundle Analysis Report");
  console.log("========================\n");

  // JavaScript files
  console.log("📄 JavaScript Files:");
  jsFiles.forEach((file) => {
    const filePath = path.join(distPath, file);
    const stats = fs.statSync(filePath);
    console.log(`  ${file}: ${formatBytes(stats.size)}`);
  });

  console.log("\n📝 TypeScript Declaration Files:");
  dtsFiles.forEach((file) => {
    const filePath = path.join(distPath, file);
    const stats = fs.statSync(filePath);
    console.log(`  ${file}: ${formatBytes(stats.size)}`);
  });

  if (mapFiles.length > 0) {
    console.log("\n🗺️  Source Map Files:");
    mapFiles.forEach((file) => {
      const filePath = path.join(distPath, file);
      const stats = fs.statSync(filePath);
      console.log(`  ${file}: ${formatBytes(stats.size)}`);
    });
  }

  // Calculate totals
  const totalJsSize = jsFiles.reduce((total, file) => {
    const filePath = path.join(distPath, file);
    return total + fs.statSync(filePath).size;
  }, 0);

  const totalDtsSize = dtsFiles.reduce((total, file) => {
    const filePath = path.join(distPath, file);
    return total + fs.statSync(filePath).size;
  }, 0);

  const totalMapSize = mapFiles.reduce((total, file) => {
    const filePath = path.join(distPath, file);
    return total + fs.statSync(filePath).size;
  }, 0);

  console.log("\n📊 Summary:");
  console.log(`  Total JavaScript: ${formatBytes(totalJsSize)}`);
  console.log(`  Total TypeScript declarations: ${formatBytes(totalDtsSize)}`);
  if (mapFiles.length > 0) {
    console.log(`  Total Source Maps: ${formatBytes(totalMapSize)}`);
  }
  console.log(
    `  Total Bundle Size: ${formatBytes(totalJsSize + totalDtsSize + totalMapSize)}`
  );

  // Gzip estimation (rough estimate: ~30% compression)
  const estimatedGzip = (totalJsSize + totalDtsSize) * 0.3;
  console.log(`  Estimated Gzip Size: ${formatBytes(estimatedGzip)}`);

  console.log("\n💡 Tips:");
  console.log("  • Source maps are only included in development builds");
  console.log("  • Production builds are minified and tree-shaken");
  console.log("  • Consider using dynamic imports for code splitting");
}

analyzeBundle();
