import { readJson, writeJson } from "./IO_file.js";

export async function getHeroes() {
  const results = await readJson("data/heroes.json");
  return results;
}

export async function getHeroById(heroId) {
  const heroes = await readJson("data/heroes.json");
  return heroes.find((hero) => hero.id === heroId);
}
