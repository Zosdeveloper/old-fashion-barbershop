import sharp from "sharp";
import fs from "fs";
import path from "path";

const SRC_DIR = "C:/Users/Administrator/Downloads/Old Fashioned Barbershop";
const IMG_ROOT = "C:/Users/Administrator/old-fashion-barbershop/public/images";

const QUALITY = 78;
const MAX_WIDTH = 1920;

// Collect all website images
const websiteImages = [];
for (const subdir of ["gallery", "services", "team"]) {
  const dir = path.join(IMG_ROOT, subdir);
  const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg)$/i.test(f));
  for (const f of files) {
    websiteImages.push({ path: path.join(dir, f), name: f, subdir });
  }
}

// Collect all originals
const originals = fs.readdirSync(SRC_DIR).filter(f => f.endsWith(".JPG"));

console.log(`Website images: ${websiteImages.length}`);
console.log(`Original DSCs: ${originals.length}\n`);

// Generate a fingerprint by sampling pixels from the center of each image
// WITHOUT rotation (to match how the website images were created)
async function getFingerprint(filePath, width) {
  // Resize to consistent width WITHOUT rotation, extract raw pixels from center strip
  const img = sharp(filePath, { failOn: "none" })
    .resize(width, null, { fit: "inside", withoutEnlargement: true })
    .removeAlpha()
    .raw();
  const { data, info } = await img.toBuffer({ resolveWithObject: true });

  // Sample 10 pixels from the middle row
  const midRow = Math.floor(info.height / 2);
  const samples = [];
  for (let i = 0; i < 10; i++) {
    const col = Math.floor((info.width / 11) * (i + 1));
    const idx = (midRow * info.width + col) * 3;
    samples.push(data[idx], data[idx + 1], data[idx + 2]);
  }
  return samples;
}

async function compareFingerprints(a, b) {
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff += Math.abs(a[i] - b[i]);
  }
  return diff / a.length; // average pixel difference
}

// Step 1: Fingerprint all website images
console.log("Fingerprinting website images...");
const webFP = [];
for (const wi of websiteImages) {
  const fp = await getFingerprint(wi.path, MAX_WIDTH);
  webFP.push({ ...wi, fp });
}

// Step 2: For each original, resize WITHOUT rotation and fingerprint
// Then find the matching website image
console.log("Matching originals to website images...\n");

const matches = [];
for (const origFile of originals) {
  const origPath = path.join(SRC_DIR, origFile);

  try {
    // Resize without rotation (matching what the optimize script did)
    const fp = await getFingerprint(origPath, MAX_WIDTH);

    // Find best match
    let bestMatch = null;
    let bestScore = Infinity;

    for (const wfp of webFP) {
      const score = await compareFingerprints(fp, wfp.fp);
      if (score < bestScore) {
        bestScore = score;
        bestMatch = wfp;
      }
    }

    if (bestScore < 15) { // threshold for a match
      const meta = await sharp(origPath).metadata();
      const orient = meta.orientation || 1;
      matches.push({
        original: origFile,
        target: bestMatch.name,
        targetPath: bestMatch.path,
        subdir: bestMatch.subdir,
        orientation: orient,
        score: bestScore.toFixed(1),
      });
      console.log(`  ${origFile} -> ${bestMatch.subdir}/${bestMatch.name} (score: ${bestScore.toFixed(1)}, orient: ${orient})`);
    }
  } catch (e) {
    console.error(`  Error processing ${origFile}: ${e.message}`);
  }
}

console.log(`\nMatched ${matches.length} of ${websiteImages.length} website images\n`);

// Step 3: Re-process matched originals WITH .rotate()
console.log("Re-processing with correct rotation...\n");
let fixed = 0;

for (const m of matches) {
  if (m.orientation === 1) {
    console.log(`  SKIP ${m.subdir}/${m.target} - already correct orientation`);
    continue;
  }

  const origPath = path.join(SRC_DIR, m.original);
  const tmpPath = m.targetPath + ".tmp";

  try {
    await sharp(origPath)
      .rotate() // auto-rotate based on EXIF
      .resize(MAX_WIDTH, MAX_WIDTH, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(tmpPath);

    fs.unlinkSync(m.targetPath);
    fs.renameSync(tmpPath, m.targetPath);

    const newMeta = await sharp(m.targetPath).metadata();
    console.log(`  FIXED ${m.subdir}/${m.target} -> ${newMeta.width}x${newMeta.height}`);
    fixed++;
  } catch (e) {
    console.error(`  ERROR fixing ${m.target}: ${e.message}`);
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
  }
}

console.log(`\nDone! Fixed ${fixed} images.`);

// List any unmatched website images
const matchedTargets = new Set(matches.map(m => m.targetPath));
const unmatched = websiteImages.filter(w => !matchedTargets.has(w.path));
if (unmatched.length > 0) {
  console.log(`\nUnmatched website images (${unmatched.length}):`);
  for (const u of unmatched) {
    console.log(`  ${u.subdir}/${u.name}`);
  }
}
