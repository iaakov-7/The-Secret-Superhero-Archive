import { getHeroes, getHeroById } from "./service.js";

export async function handleRoutes(req, res, parsedUrl) {
  const method = req.method;
  const pathParts = parsedUrl.pathname.split("/");
  if (pathParts.length === 2 && pathParts[1] === "heroes") {
    if (method === "GET") {
      const heroesList = await getHeroes();
      res.writeHead(200);
      return res.end(JSON.stringify(heroesList));
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
