const http = require("http");
const services = require("../../services");
const url = require("url");
const jsonBody = require("body/json");

const PORT = 8080;

const server = http.createServer();

server.on("request", (request, response) => {
  const parsedUrl = url.parse(request.url, true);

  if (request.method === "GET" && parsedUrl.pathname === "/metadata") {
    const { id } = parsedUrl.query;
    const metadata = services.fetchImageMetadata(id);
    console.log("Request headers: ", request.headers);
  }

  jsonBody(request, response, (err, body) => {
    if (err) {
      console.error(err);
    }

    services.createUser(body["userName"]);
  });
});

server.listen(PORT, () => {
  console.log("Server listening on port: ", PORT);
});
