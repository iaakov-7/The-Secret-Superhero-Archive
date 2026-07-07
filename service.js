import { readJson, writeJson } from "./IO_file.js";

export async function getHeroes(
  statusFilter,
  powerFilter,
  minLevelFilter,
  maxLevelFilter,
  searchFilter,
  sortByFilter,
  orderFilter,
  pageFilter,
  limitFilter,
) {
  let results = await readJson("data/heroes.json");
  if (statusFilter)
    results = results.filter((hero) => hero.status === statusFilter);
  if (powerFilter)
    results = results.filter((hero) => hero.powers.includes(powerFilter));
  if (minLevelFilter)
    results = results.filter((hero) => hero.threatLevel >= minLevelFilter);
  if (maxLevelFilter)
    results = results.filter((hero) => hero.threatLevel <= maxLevelFilter);
  if (searchFilter)
    results = results.filter(
      (hero) =>
        hero.codeName.includes(searchFilter) ||
        hero.notes.includes(searchFilter),
    );
  if (sortByFilter) {
    results = results.sort((a, b) => {
      const valA = a[sortByFilter];
      const valB = b[sortByFilter];
      if (valA === undefined) return 1;
      if (valB === undefined) return -1;
      if (typeof valA === "string" && typeof valB === "string") {
        return valA.localeCompare(valB);
      }
      return valA - valB;
    });
    if (orderFilter === "desc") {
      return results.reverse();
    }
  }
  return results;
}

export async function getHeroById(heroId) {
  const heroes = await readJson("data/heroes.json");
  return heroes.find((hero) => hero.id === heroId);
}
