/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date: Nov 15, 2023
 * Author: Emmy Nguyen
 *
 */

const path = require("path");

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");

IOhandler.unzip(zipFilePath, pathUnzipped)
    .then(() => IOhandler.readDir(pathUnzipped))
    .then((imgs) => {
        const grayScalePromises = imgs.map(img => IOhandler.grayScale(img, img.replace("unzipped", "grayscaled")));
        const sepiaPromises = imgs.map(img => IOhandler.sepiaScale(img, img.replace("unzipped", "sepia")));
        return Promise.all(grayScalePromises, sepiaPromises);
    
    })
    .then(() => {
        console.log("All images processed successfully.");
    })
    .catch((error) => {
        console.error("An error occurred:", error);
    });