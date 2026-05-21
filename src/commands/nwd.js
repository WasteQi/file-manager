import fs from "fs/promises";
import path from "path";
import { currentDirectory, setCurrentDirectory } from "../state.js";

export const handleNwd = async (command) => {
    try {
        const [cmd, arg] = command.split(" ");

        // UP
        if (cmd === "up") {
            const parent = path.dirname(getCurrentDirectory());

            if (parent === currentDirectory) return;

            setCurrentDirectory(parent);
            return;
        }

        // CD
        if (cmd === "cd") {
            if (!arg) {
                console.log("Invalid input");
                return;
            }

            const newPath = path.isAbsolute(arg)
                ? arg
                : path.resolve(getCurrentDirectory(), arg);

            const stat = await fs.stat(newPath);

            if (!stat.isDirectory()) {
                console.log("Invalid input");
                return;
            }

            setCurrentDirectory(newPath);
            return;
        }

        // LS
        if (cmd === "ls") {
            const files = await fs.readdir(getCurrentDirectory(), { withFileTypes: true });

            const dirs = [];
            const fileList = [];

            for (const file of files) {
                if (file.isDirectory()) {
                    dirs.push({ name: file.name, type: "directory" });
                } else {
                    fileList.push({ name: file.name, type: "file" });
                }
            }

            const result = [
                ...dirs.sort((a, b) => a.name.localeCompare(b.name)),
                ...fileList.sort((a, b) => a.name.localeCompare(b.name))
            ];

            console.table(result);
        }

    } catch {
        console.log("Operation failed");
    }
};