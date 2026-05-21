import fs from "fs";
import crypto from "crypto";
import path from "path";
import { getCurrentDirectory } from "../state.js";

export const hash = async (filePath) => {
    try {
        const currentDirectory = getCurrentDirectory();

        const fullPath = path.isAbsolute(filePath)
            ? filePath
            : path.resolve(currentDirectory, filePath);

        const hash = crypto.createHash("sha256");

        const stream = fs.createReadStream(fullPath);

        stream.on("data", (chunk) => {
            hash.update(chunk);
        });

        stream.on("end", () => {
            console.log(hash.digest("hex"));
        });

        stream.on("error", () => {
            console.log("Operation failed");
        });

    } catch {
        console.log("Operation failed");
    }
};