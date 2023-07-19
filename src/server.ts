export function Server() {
  const http = require("http");

  const server = http.createServer((req: any, res: any) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, world!");
  });

  const port = 3000;

  server.listen(port, () => {
    console.log(`Server host on http://localhost:${port}/`);
  });
}
