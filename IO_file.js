import fs from "fs/promises";

export async function readJson(filePath) {
  const data = await fs.readFile(filePath, "utf-8");
  if (!data.trim()) {
    return [];
  }
  return JSON.parse(data);
}
export async function writeJson(filePath, content) {
  const stringContent = JSON.stringify(content);
  await fs.writeFile(filePath, stringContent);
}
