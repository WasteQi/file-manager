import os from "os";

export const handleOS = (command) => {
    try {
        const [cmd, flag] = command.split(" ");

        if (cmd !== "os") return;

        switch (flag) {

            // 1. EOL
            case "--EOL":
                console.log(JSON.stringify(os.EOL));
                break;

            // 2. CPU
            case "--cpus":
                const cpus = os.cpus();

                console.log(`Total CPUs: ${cpus.length}`);

                cpus.forEach((cpu, index) => {
                    console.log(`CPU ${index + 1}:`);
                    console.log(`Model: ${cpu.model}`);
                    console.log(`Speed: ${cpu.speed / 1000} GHz`);
                });

                break;

            // 3. Home dir
            case "--homedir":
                console.log(os.homedir());
                break;

            // 4. Username
            case "--username":
                console.log(os.userInfo().username);
                break;

            // 5. Architecture
            case "--architecture":
                console.log(os.arch());
                break;

            default:
                console.log("Invalid input");
        }

    } catch {
        console.log("Operation failed");
    }
};