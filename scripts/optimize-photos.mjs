import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inputDir = path.join(root, "public/raw-photos");
const outputDir = path.join(root, "public/images/cottage");
const maxWidth = 1920;

const semanticNames = {
  "IMG_6994.HEIC": "marina-from-the-eaves",
  "PHOTO-2026-09-14-12-28-30 7.jpg": "cottage-facade",
  "PHOTO-2026-09-14-12-28-29 2.jpg": "living-room-stove",
  "PHOTO-2026-09-14-12-28-30 5.jpg": "top-bedroom",
  "PHOTO-2026-09-14-12-28-30 4.jpg": "top-bedroom-stair",
  "PHOTO-2026-09-14-12-28-29 8.jpg": "twin-bedroom",
  "PHOTO-2026-09-14-12-28-29 6.jpg": "bathroom",
  "IMG_6881.HEIC": "rear-deck",
  "PHOTO-2026-09-14-12-28-29 4.jpg": "cottage-stairs",
  "IMG_1205.HEIC": "whitby-harbour",
  "IMG_1532.HEIC": "abbey-and-steps",
  "IMG_5360.HEIC": "abbey-sunset",
  "IMG_1207.HEIC": "west-pier-beach",
  "IMG_5309.HEIC": "sandsend-sunset",
  "28F3A790-6292-4F1A-9503-7D3ACB70E9D6.JPG": "rainbow-over-rooftops",
  "IMG_1185.HEIC": "harbour-twilight",
  "21D411C3-1DC5-4D25-BCB0-57D7127EA52B.JPG": "sunset-over-whitby",
  "F219462E-8D7A-4A0A-93CE-06B420941790.JPG": "abbey-and-coast",
};

function slugify(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function convertFile(filename) {
  const slug = semanticNames[filename] ?? slugify(filename);
  const inputPath = path.join(inputDir, filename);

  const pipeline = () =>
    sharp(inputPath)
      .rotate()
      .resize({ width: maxWidth, withoutEnlargement: true });

  const webpName = `${slug}.webp`;
  const jpegName = `${slug}.jpg`;

  await pipeline().webp({ quality: 78 }).toFile(path.join(outputDir, webpName));
  await pipeline()
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join(outputDir, jpegName));

  const meta = await sharp(path.join(outputDir, webpName)).metadata();

  return {
    original: filename,
    slug,
    width: meta.width,
    height: meta.height,
    webp: `/images/cottage/${webpName}`,
    jpeg: `/images/cottage/${jpegName}`,
  };
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });

  const entries = await fs.readdir(inputDir);
  const photos = entries.filter((name) =>
    /\.(heic|jpe?g)$/i.test(name),
  );

  if (photos.length === 0) {
    throw new Error(`No photos found in ${inputDir}`);
  }

  const manifest = [];

  for (const filename of photos.sort()) {
    process.stdout.write(`Optimising ${filename}... `);
    const result = await convertFile(filename);
    manifest.push(result);
    console.log(`${result.slug} (${result.width}×${result.height})`);
  }

  await fs.writeFile(
    path.join(outputDir, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  console.log(`\nWrote ${manifest.length} images to ${outputDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
