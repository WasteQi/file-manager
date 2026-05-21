import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import { currentDirectory } from "../state.js";

export const cat = async (filePath) => {
    try {
        const currentDirectory = getCurrentDirectory();

        const fullPath = path.isAbsolute(filePath)
            ? filePath
            : path.resolve(currentDirectory, filePath);

        const stream = fs.createReadStream(fullPath, "utf-8");

        stream.on("data", (chunk) => {
            process.stdout.write(chunk);
        });

        stream.on("error", () => {
            console.log("Operation failed");
        });

    } catch {
        console.log("Operation failed");
    }
};

export const add = async (fileName) => {
    try {
        const currentDirectory = getCurrentDirectory();

        const fullPath = path.join(currentDirectory, fileName);

        await fsp.writeFile(fullPath, "", { flag: "wx" });

    } catch {
        console.log("Operation failed");
    }
};

export const rn = async (filePath, newName) => {
    try {
        const currentDirectory = getCurrentDirectory();

        const fullPath = path.isAbsolute(filePath)
            ? filePath
            : path.resolve(currentDirectory, filePath);

        const newPath = path.join(path.dirname(fullPath), newName);

        await fsp.rename(fullPath, newPath);

    } catch {
        console.log("Operation failed");
    }
};

export const cp = async (filePath, newDir) => {
    try {
        const currentDirectory = getCurrentDirectory();

        const src = path.isAbsolute(filePath)
            ? filePath
            : path.resolve(currentDirectory, filePath);

        const dest = path.isAbsolute(newDir)
            ? newDir
            : path.resolve(currentDirectory, newDir);

        const fileName = path.basename(src);
        const finalPath = path.join(dest, fileName);

        const readStream = fs.createReadStream(src);
        const writeStream = fs.createWriteStream(finalPath);

        readStream.pipe(writeStream);

        writeStream.on("error", () => {
            console.log("Operation failed");
        });

    } catch {
        console.log("Operation failed");
    }
};

export const mv = async (filePath, newDir) => {
    try {
        const currentDirectory = getCurrentDirectory();

        const src = path.isAbsolute(filePath)
            ? filePath
            : path.resolve(currentDirectory, filePath);

        const dest = path.isAbsolute(newDir)
            ? newDir
            : path.resolve(currentDirectory, newDir);

        const fileName = path.basename(src);
        const finalPath = path.join(dest, fileName);

        const readStream = fs.createReadStream(src);
        const writeStream = fs.createWriteStream(finalPath);

        readStream.pipe(writeStream);

        writeStream.on("finish", async () => {
            await fsp.unlink(src);
        });

        writeStream.on("error", () => {
            console.log("Operation failed");
        });

    } catch {
        console.log("Operation failed");
    }
};

export const rm = async (filePath) => {
    try {
        const currentDirectory = getCurrentDirectory();

        const fullPath = path.isAbsolute(filePath)
            ? filePath
            : path.resolve(currentDirectory, filePath);

        await fsp.unlink(fullPath);

    } catch {
        console.log("Operation failed");
    }
};