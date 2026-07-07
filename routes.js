import { json } from "node:stream/consumers";
import { getHeroes, getHeroById, createNewHero } from "./service.js";
import { heroValidation } from "./validtor.js";

async function getBodyData(req) {
  let body = "";
  for await (const chunk of req) {
    body += chunk.toString();
  }
  return body ? JSON.parse(body) : {};
}

export async function handleRoutes(req, res, parsedUrl) {
  const method = req.method;
  const pathParts = parsedUrl.pathname.split("/");
  if (pathParts.length === 2 && pathParts[1] === "heroes") {
    if (method === "GET") {
      const statusFilter = parsedUrl.searchParams.get("status");
      const powerFilter = parsedUrl.searchParams.get("power");
      const minLevelFilter = parsedUrl.searchParams.get("minLevel");
      const maxLevelFilter = parsedUrl.searchParams.get("maxLevel");
      const searchFilter = parsedUrl.searchParams.get("search");
      const sortByFilter = parsedUrl.searchParams.get("sortBy");
      const orderFilter = parsedUrl.searchParams.get("order");

      const heroesList = await getHeroes(
        statusFilter,
        powerFilter,
        minLevelFilter,
        maxLevelFilter,
        searchFilter,
        sortByFilter,
        orderFilter,
      );
      res.writeHead(200);
      return res.end(JSON.stringify(heroesList));
    } else if (method === "POST") {
      const body = await getBodyData(req);
      const validate = await heroValidation(body);
      if (validate === "Conflict") {
        res.writeHead(409);
        return res.end(
          JSON.stringify({ Message: "Code name is already exists" }),
        );
      } else if (validate.isValid === false) {
        res.writeHead(400);
        return res.end(JSON.stringify({ Message: validate.errors }));
      }
      const newId = await createNewHero(body);
      res.writeHead(201);
      return res.end(
        JSON.stringify({ Message: `Hero ${newId} created successfully` }),
      );
    }
  } else if (pathParts.length === 3 && pathParts[1] === "heroes") {
    const heroId = parseInt(pathParts[2]);
    if (isNaN(heroId)) {
      res.writeHead(400);
      return res.end(JSON.stringify({ message: "invalid id" }));
    }

    if (method === "GET") {
      const hero = await getHeroById(heroId);
      if (!hero) {
        res.writeHead(404);
        return res.end(JSON.stringify({ Message: `hero ${heroId} not found` }));
      }
      res.writeHead(200);
      return res.end(JSON.stringify(hero));
    }
  }
}
