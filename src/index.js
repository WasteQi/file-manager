import { homedir } from 'os';
import { stdin as input, stdout as output } from 'process';
import readline from 'readline';
import { printWorkingDirectory } from './utils/printWorkingDirectory.js';

const args = process.argv.slice(2);

const usernameArg = args.find(arg => arg.startsWith('--username='));

const username = usernameArg
    ? usernameArg.split('=')[1]
    : 'Guest';

let currentDirectory = homedir();

console.log(`Welcome to the File Manager, ${username}!`);

printWorkingDirectory(currentDirectory);

const rl = readline.createInterface({
    input,
    output
});

rl.on('line', (command) => {

    command = command.trim();

    if (command === '.exit') {
        exitProgram();
        return;
    }

    console.log('Invalid input');

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