#!/usr/bin/env node
/**
 * Regenerates `src/app/data/portrait-metadata.json` from the shipped portraits.
 *
 * For every file in `public/images/members` it records:
 *   - the intrinsic pixel size, so the UI can size `<Image sizes>` correctly, and
 *   - a short content hash, used as a cache-busting token so replacing a
 *     portrait file invalidates the previously generated /_next/image variants.
 *
 * The script is dependency free on purpose (no sharp) so it can run in any
 * environment that can run `next build`.
 */
import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const portraitsDir = path.join(root, "public", "images", "members");
const outFile = path.join(root, "src", "app", "data", "portrait-metadata.json");

function pngSize(buffer) {
  if (buffer.length < 24) return null;
  if (buffer.readUInt32BE(0) !== 0x89504e47) return null;
  if (buffer.toString("ascii", 12, 16) !== "IHDR") return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function gifSize(buffer) {
  if (buffer.length < 10) return null;
  if (buffer.toString("ascii", 0, 3) !== "GIF") return null;
  return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
}

function webpSize(buffer) {
  if (buffer.length < 30) return null;
  if (buffer.toString("ascii", 0, 4) !== "RIFF") return null;
  if (buffer.toString("ascii", 8, 12) !== "WEBP") return null;
  const chunk = buffer.toString("ascii", 12, 16);
  if (chunk === "VP8 ") {
    return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
  }
  if (chunk === "VP8L") {
    const bits = buffer.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (chunk === "VP8X") {
    const width = 1 + (buffer[24] | (buffer[25] << 8) | (buffer[26] << 16));
    const height = 1 + (buffer[27] | (buffer[28] << 8) | (buffer[29] << 16));
    return { width, height };
  }
  return null;
}

function jpegSize(buffer) {
  if (buffer.length < 4 || buffer.readUInt16BE(0) !== 0xffd8) return null;
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1];
    // Standalone markers carry no length field.
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) {
      offset += 2;
      continue;
    }
    const length = buffer.readUInt16BE(offset + 2);
    const isStartOfFrame =
      marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isStartOfFrame) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  return null;
}

function imageSize(buffer) {
  return pngSize(buffer) ?? jpegSize(buffer) ?? webpSize(buffer) ?? gifSize(buffer);
}

const entries = {};
const files = (await readdir(portraitsDir)).filter(name => !name.startsWith("."));
for (const name of files.sort()) {
  const buffer = await readFile(path.join(portraitsDir, name));
  const size = imageSize(buffer);
  if (!size) {
    console.warn(`skipped ${name}: unrecognized image format`);
    continue;
  }
  entries[`/images/members/${name}`] = {
    width: size.width,
    height: size.height,
    version: createHash("sha256").update(buffer).digest("hex").slice(0, 12),
  };
}

const contents = `${JSON.stringify(entries, null, 2)}\n`;
const previous = await readFile(outFile, "utf8").catch(() => null);
if (previous !== contents) {
  await writeFile(outFile, contents);
  console.log(`portrait metadata updated (${Object.keys(entries).length} portraits)`);
} else {
  console.log(`portrait metadata already up to date (${Object.keys(entries).length} portraits)`);
}
