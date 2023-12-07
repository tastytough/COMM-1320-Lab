const fs = require("fs/promises");
const { DEFAULT_HEADER } = require("./util/util");
const path = require("path");
var qs = require("querystring");
const formidable = require("formidable");

const moveFile = async (sourcePath, destinationPath) => {
  await fs.copyFile(sourcePath, destinationPath);
  await fs.unlink(sourcePath);
};
const updateDataJson = async (userName, fileName) => {
  try {
    const dbPath = path.join(__dirname, "..", "database", "data.json");
    const database = await fs.readFile(dbPath, "utf8");
    const data = JSON.parse(database);

    // Looking for user in data
    const userIndex = data.findIndex((user) => user.username === userName);

    if (userIndex !== -1) {
      // Add fileName in user's photos folder
      data[userIndex].photos.push(fileName);

      // Save data in data.json
      await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf-8");
    } else {
      console.error("User not found in data.json");
    }
  } catch (error) {
    console.error("Error while updating data.json:", error);
  }
};
const controller = {
  getImageUrl: (userName, imageName) => {
    // Build URL link for photo based on userName and imageName
    const imagePath = path.join(__dirname, `photos/${userName}/${imageName}`);
    const imageUrl = `src/photos/${userName}/${imageName}`;

    return imageUrl;
  },
  getHomePage: async (request, response) => {
    const dbPath = path.join(__dirname, "..", "database", "data.json");
    const database = await fs.readFile(dbPath, "utf8");
    const userArray = JSON.parse(database);
    response.render("home", { userArray });
  },


  sendFormData: (request, response) => {
    var body = "";

    request.on("data", function (data) {
      body += data;
    });

    request.on("end", function () {
      var post = qs.parse(body);
      console.log(post);
    });
  },

  getFeed: async (request, response, userName) => {
    console.log(userName);
    const dbPath = path.join(__dirname, "..", "database", "data.json");
    const database = await fs.readFile(dbPath, "utf8");
    const data = JSON.parse(database);

    // Looking for user in data 
    const user = data.find((user) => user.username === userName);

    const profileImageUrl = controller.getImageUrl(userName, user.profile);

    const photoUrls = user.photos.map((photo) =>
      controller.getImageUrl(userName, photo)
    );

    console.log(photoUrls);
    // console.log(request.url); try: http://localhost:3000/feed?username=john123
    response.render("feed", { photoUrls, user, profileImageUrl });
    // response.end();
  },
  uploadImages: async (request, response) => {
    // parse a file upload
    const form = new formidable.IncomingForm();

    // form.keepExtensions = true;
    [fields, files] = await form.parse(request);

    // Take username from fields
    const userName = fields.userName[0];

    // Create path of uploaded photos
    const uploadDir = path.join(__dirname, `photos/${userName}/`);
    // console.log(files);

    // Move and save file
    const originalPath = files.image[0].filepath;
    const fileName = files.image[0].originalFilename;

    // Create a new file path
    const newFilePath = path.join(uploadDir, fileName);

    // Move file to a new file path
    try {
      await moveFile(originalPath, newFilePath);
      await updateDataJson(userName, fileName);
      response.writeHead(302, { Location: "/" });
      response.end();
    } catch (error) {
      console.error("Error while moving file:", error);
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Internal Server Error");
    }
  },
};

module.exports = controller;
