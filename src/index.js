import { homedir } from 'os';
import { stdin as input, stdout as output } from 'process';
import readline from 'readline';
import { printWorkingDirectory } from './utils/printWorkingDirectory.js';
import { handleInput } from './app.js';
import { currentDirectory } from './state.js';

const args = process.argv.slice(2);

const usernameArg = args.find(arg => arg.startsWith('--username='));

const username = usernameArg
    ? usernameArg.split('=')[1]
    : 'Guest';

console.log(`Welcome to the File Manager, ${username}!`);

printWorkingDirectory(currentDirectory);

const rl = readline.createInterface({
    input,
    output
});

rl.on('line', async (input) => {
    input = input.trim();

    if (input === '.exit') {
        exitProgram();
        return;
    }

    await handleInput(input);

    printWorkingDirectory(currentDirectory);
});

process.on('SIGINT', () => {
    exitProgram();
});

function exitProgram() {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);

    rl.close();
    process.exit(0);
}