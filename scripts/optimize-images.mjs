import sharp from "sharp";
import { readdir, stat, rename, unlink } from "fs/promises";
import { join, extname, relative } from "path";

const PUBLIC_DIR = join(process.cwd(), "public", "images");

const CONFIG = {
  maxWidth: 1920,
  maxHeight: 1920,
  jpegQuality: 78,
  logoMaxWidth: 512,
};

async function getAllImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getAllImages(fullPath)));
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

async function optimizeImage(filePath) {
  const relPath = relative(PUBLIC_DIR, filePath);
  const ext = extname(filePath).toLowerCase();
  const isLogo = filePath.includes("logo");
  const maxW = isLogo ? CONFIG.logoMaxWidth : CONFIG.maxWidth;
  const tmpPath = filePath + ".tmp";

  const originalStat = await stat(filePath);
  const originalSize = originalStat.size;

  const metadata = await sharp(filePath).metadata();

  let pipeline = sharp(filePath);

  // Resize if larger than max
  if (metadata.width > maxW) {
    pipeline = pipeline.resize(maxW, CONFIG.maxHeight, {
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  // Write to temp file, then replace original
  if (isLogo && ext === ".png") {
    await pipeline.png({ quality: 90, compressionLevel: 9 }).toFile(tmpPath);
  } else if (ext === ".jpg" || ext === ".jpeg") {
    await pipeline.jpeg({ quality: CONFIG.jpegQuality, mozjpeg: true }).toFile(tmpPath);
  } else {
    return { original: originalSize, optimized: originalSize };
  }

  // Replace: delete original, rename tmp
  await unlink(filePath);
  await rename(tmpPath, filePath);

  const newStat = await stat(filePath);
  console.log(
    `  ${relPath}: ${formatBytes(originalSize)} -> ${formatBytes(newStat.size)} (${((1 - newStat.size / originalSize) * 100).toFixed(0)}% smaller)`
  );
  return { original: originalSize, optimized: newStat.size };
}

async function main() {
  console.log("Finding images...\n");
  const images = await getAllImages(PUBLIC_DIR);
  console.log(`Found ${images.length} images to optimize.\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const img of images) {
    try {
      const result = await optimizeImage(img);
      totalOriginal += result.original;
      totalOptimized += result.optimized;
    } catch (err) {
      console.error(`  ERROR: ${relative(PUBLIC_DIR, img)}: ${err.message}`);
    }
  }

  console.log("\n========================================");
  console.log(`Total: ${formatBytes(totalOriginal)} -> ${formatBytes(totalOptimized)}`);
  console.log(
    `Saved: ${formatBytes(totalOriginal - totalOptimized)} (${((1 - totalOptimized / totalOriginal) * 100).toFixed(0)}% reduction)`
  );
}

main().catch(console.error);
