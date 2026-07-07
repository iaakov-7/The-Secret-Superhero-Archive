import { readJson, writeJson } from "./IO_file.js";

export async function getHeroes() {
  const results = await readJson("data/heroes.json");
  return results;
}
