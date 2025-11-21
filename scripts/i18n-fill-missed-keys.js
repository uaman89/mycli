#!/usr/bin/env node
import fs from "fs";
import path from "path";

const projectRoot = process.cwd();

// === CONFIGURATION ===
// Change this if your base file lives somewhere else
const BASE_FILE = path.resolve(projectRoot, "src\\i18n\\messages.en-GB.json");

// === FUNCTIONS ===
function fillMissingKeys(base, target) {
  for (const key in base) {
    if (Object.prototype.hasOwnProperty.call(base, key)) {
      if (
        typeof base[key] === "object" &&
        base[key] !== null &&
        !Array.isArray(base[key])
      ) {
        if (!target[key] || typeof target[key] !== "object") {
          target[key] = {};
        }
        fillMissingKeys(base[key], target[key]);
      } else {
        if (!(key in target)) {
          target[key] = base[key];
        }
      }
    }
  }
}

// === MAIN ===
export const i18nFillMissedKeys = () => {
  if (!fs.existsSync(BASE_FILE)) {
    console.error(`❌ Base file not found: ${BASE_FILE}`);
    process.exit(1);
  }

  const baseDir = path.dirname(BASE_FILE);
  const baseName = path.basename(BASE_FILE);

  const base = JSON.parse(fs.readFileSync(BASE_FILE, "utf8"));

  const files = fs
    .readdirSync(baseDir)
    .filter((f) => f.endsWith(".json") && f !== baseName);

  if (files.length === 0) {
    console.log("⚠️ No other JSON files found in the directory.");
    return;
  }

  console.log(`🔍 Found ${files.length} JSON files to update:`);

  for (const file of files) {
    const filePath = path.join(baseDir, file);
    const target = JSON.parse(fs.readFileSync(filePath, "utf8"));

    fillMissingKeys(base, target);

    fs.writeFileSync(filePath, JSON.stringify(target, null, 2), "utf8");
    console.log(`✅ Updated: ${file}`);
  }

  console.log("✨ All files are synchronized!");
};
