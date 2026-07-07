import http from "http";
import { handleRoutes } from "./routes.js";

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const baseUrl = `http://${req.headers.host}`;
  const parsedUrl = new URL(req.url, baseUrl);
  if (parsedUrl.pathname.startsWith("/heroes")) {
    await handleRoutes(req, res, parsedUrl);
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ Message: "API route not found" }));
  }
});

server.listen(3000, () => console.log("Server running..."));
