import { readJson } from "./IO_file.js";

export async function heroValidation(body) {
  const heroes = await readJson("data/heroes.json");
  const codeNames = heroes.map((hero) => hero.codeName);
  let errors = [];
  if (
    !body.codeName ||
    body.codeName.trim() === "" ||
    typeof body.codeName !== "string"
  ) {
    errors.push("codeName is required and must be non-empty string");
  } else if (codeNames.includes(body.codeName.trim())) {
    return "Conflict";
  }
  if (
    !body.powers ||
    !Array.isArray(body.powers) ||
    body.powers.length === 0 ||
    !body.powers.every((p) => typeof p === "string")
  ) {
    errors.push("powers is required and must be non-empty array of strings");
  }
  if (
    !body.threatLevel ||
    ![1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(body.threatLevel)
  ) {
    errors.push("threatLevel is required and must be integer between 1-10");
  }
  if (body.affiliations) {
    if (!Array.isArray(body.affiliations)) {
      errors.push("affiliations mist be array");
    }
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
}
