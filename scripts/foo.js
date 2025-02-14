import fs from "fs/promises";

const data = await fs.readFile("package.json", "utf8");

console.log(data);
