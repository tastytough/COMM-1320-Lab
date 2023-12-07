const express = require("express");
const { DEFAULT_HEADER } = require("./util/util.js");
const controller = require("./controller");
const { createReadStream } = require("fs");
const path = require("path");
const url = require("url");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (request, response) => {
  controller.getHomePage(request, response);
});

app.post("/form", (request, response) => {
  controller.sendFormData(request, response);
});

app.post("/images", (request, response) => {
  console.log('in');
  controller.uploadImages(request, response);
});

app.use("/styles", express.static("src/styles"));

app.get("/feed", (request, response) => {
  const { query } = url.parse(request.url, true);
  const userName = query.username;

  controller.getFeed(request, response, userName);
});

app.get("/src/photos/:userName/:imageName", (request, response) => {
  const { userName, imageName } = request.params;
  const imagePath = path.join(__dirname, "photos", userName, imageName);
  createReadStream(imagePath).pipe(response);
});

app.use((request, response) => {
  response.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
