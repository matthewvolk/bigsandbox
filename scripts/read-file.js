import fs from "fs/promises";

const path = process.argv[2];

if (!path) {
  console.error("No path provided");
  process.exit(1);
}

try {
  await fs.access(path);
} catch {
  console.error("File does not exist");
  process.exit(1);
}

const data = await fs.readFile(path, "utf8");

console.log(data);
