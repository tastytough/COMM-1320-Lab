/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: Nov 15, 2023
 * Author: Emmy Nguyen
 *
 */

const AdmZip = require("adm-zip");
const fs = require("fs");
const PNG = require("pngjs").PNG;
const path = require("path");
const grayImage = require("./helpers").grayImage;
const sepiaImage = require("./helpers").sepiaImage;

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */

const unzip = (pathIn, pathOut) => {
    return new Promise((resolve, reject) => {
        let zip = new AdmZip(pathIn);
        zip.extractAllToAsync(pathOut, true, false, (err) => {
            if (err) {
                reject("Extraction got error!")
            } else {
                resolve("Extraction operation complete");
            }
        });
    });
}

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, "utf8", (err, files) => {
            if (err) {
                reject(err);
            } else {
                const filePath = [];
                for (const file of files) {
                    if (file.endsWith("png")) {
                        filePath.push(path.join(dir, file));
                    }
                }
                resolve(filePath);
            }
        });
    });
};




/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */

const grayScale = (pathIn, pathOut) => {
    return new Promise((resolve, reject) => {
        const inputStream = fs.createReadStream(pathIn);
        const outputStream = fs.createWriteStream(pathOut);
        inputStream
            .pipe(new PNG())
            .on('parsed', function() {
                grayImage(this);
                this.pack().pipe(outputStream)
                    .on('finish', () => resolve("All images are done in gray scaling"))
                    .on('error', (err) => reject(err));
            })
            .on('error', (err) => reject(err));
    });
};

const sepiaScale = (pathIn, pathOut) => {
    return new Promise((resolve, reject) => {
        const inputStream = fs.createReadStream(pathIn);
        const outputStream = fs.createWriteStream(pathOut);
        inputStream
            .pipe(new PNG())
            .on('parsed', function() {
                sepiaImage(this);
                this.pack().pipe(outputStream)
                    .on('finish', () => resolve("All images are done in gray scaling"))
                    .on('error', (err) => reject(err));
            })
            .on('error', (err) => reject(err));
    });
};

module.exports = {
    unzip,
    readDir,
    grayScale,
    sepiaScale,
};