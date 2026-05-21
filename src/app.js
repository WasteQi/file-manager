import { cat, add, rn, cp, mv, rm } from "./commands/fs.js";
import { handleNwd } from "./commands/nwd.js";
import { handleOS } from "./commands/os.js";
import { hash } from "./commands/hash.js";
import { compress, decompress } from "./commands/compress.js";

export const handleInput = async (input) => {
    const [cmd, ...args] = input.split(" ");

    // NAVIGATION
    if (["up", "cd", "ls"].includes(cmd)) {
        return handleNwd(input);
    }

    // FILE OPS
    switch (cmd) {
        case "cat":
            return cat(args[0]);

        case "add":
            return add(args[0]);

        case "rn":
            return rn(args[0], args[1]);

        case "cp":
            return cp(args[0], args[1]);

        case "mv":
            return mv(args[0], args[1]);

        case "rm":
            return rm(args[0]);

        case "os":
            return handleOS(input);

        case "hash":
            return hash(args[0]);

        case "compress":
            return compress(args[0], args[1]);

        case "decompress":
            return decompress(args[0], args[1]);
    }

    console.log("Invalid input");
};