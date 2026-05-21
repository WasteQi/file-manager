import fs from "fs";
import path from "path";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { pipeline } from "stream";
import { getCurrentDirectory } from "../state.js";

export const compress = async (filePath, destPath) => {
    try {
        const currentDirectory = getCurrentDirectory();

        const src = path.isAbsolute(filePath)
            ? filePath
            : path.resolve(currentDirectory, filePath);

        const dest = path.isAbsolute(destPath)
            ? destPath
            : path.resolve(currentDirectory, destPath);

        const fileName = path.basename(src) + ".br";
        const finalPath = path.join(dest, fileName);

        const readStream = fs.createReadStream(src);
        const writeStream = fs.createWriteStream(finalPath);

        const brotli = createBrotliCompress();

        pipeline(readStream, brotli, writeStream, (err) => {
            if (err) {
                console.log("Operation failed");
            }
        });

    } catch {
        console.log("Operation failed");
    }
};

export const decompress = async (filePath, destPath) => {
    try {
        const currentDirectory = getCurrentDirectory();

        const src = path.isAbsolute(filePath)
            ? filePath
            : path.resolve(currentDirectory, filePath);

        const dest = path.isAbsolute(destPath)
            ? destPath
            : path.resolve(currentDirectory, destPath);

        // убираем .br
        const fileName = path.basename(src).replace(".br", "");
        const finalPath = path.join(dest, fileName);

        const readStream = fs.createReadStream(src);
        const writeStream = fs.createWriteStream(finalPath);

        const brotli = createBrotliDecompress();

        pipeline(readStream, brotli, writeStream, (err) => {
            if (err) {
                console.log("Operation failed");
            }
        });

    } catch {
        console.log("Operation failed");
    }
};