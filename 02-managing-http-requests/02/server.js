const http = require("http");
const services = require("../../services");
const url = require("url");
const jsonBody = require("body/json");
const fs = require("fs");
const formidable = require("formidable");

const PORT = 8080;

/*
const server = https.createServer({
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
});
*/

const server = http.createServer();

server.on("request", (request, response) => {
  const parsedUrl = url.parse(request.url, true);

  if (request.method === "GET" && parsedUrl.pathname === "/metadata") {
    const { id } = parsedUrl.query;
    const metadata = services.fetchImageMetadata(id);
    response.setHeader("Content-Type", "application/json");
    response.statusCode = 200;
    const serialisedJSON = JSON.stringify(metadata);
    response.write(serialisedJSON);
    response.end();

    //console.log("Request headers: ", request.headers);
  } else if (request.method === "POST" && parsedUrl.pathname === "/users") {
    jsonBody(request, response, (err, body) => {
      if (err) {
        console.log(err);
      } else {
        services.createUser(body["userName"]);
      }
    });
  } else if (request.method === "POST" && parsedUrl.pathname === "/upload") {
    const form = new formidable.IncomingForm({
      uploadDir: __dirname,
      keepExtensions: true,
      multiples: true,
      maxFileSize: 5 * 1024 * 1024,
    });

    form
      .parse(request)
      .on("fileBegin", (name, file) => {
        console.log("Our upload has started!");
      })
      .on("file", (name, value) => {
        console.log("Field received: ");
        console.log(name, value);
      });
  } else {
    fs.createReadStream("../../index.html").pipe(response);
  }
});

server.listen(PORT, () => {
  console.log("Server listening on port: ", PORT);
});
