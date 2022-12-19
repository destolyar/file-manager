//ToDo: remove nodemon
import { fileURLToPath } from 'url';
import { sep as pathSeparator } from 'path'
import { dirname } from 'path';
import { Worker } from 'worker_threads'
import consoleCommands from './commands-map.js'
import consoleColors from './console-colors.js';

const exitFromFileManager = () => {
  process.exit(0)
}

const consoleArguments = process.argv.filter(argument => argument.startsWith("--"))
const username = consoleArguments.find(argument => argument.startsWith("--username")).split("=")[1]

console.log(consoleColors.yellow, `Welcome to the File Manager, ${username}!`, consoleColors.default)

const __fileURLToPath = fileURLToPath(import.meta.url)
let currentPath = dirname(__fileURLToPath)

process.stdin.on("data", (input) => {
  const trimedInput = input.toString().trim()
  const command = consoleCommands[trimedInput]
  
  if(command) {
    const commandPath = consoleCommands[input.toString().trim()].join(pathSeparator)
    const worker = new Worker(commandPath, { workerData: { path: currentPath }})

    worker.on("message", (data) => {
      currentPath = data
      console.log(consoleColors.cyan, "You are currently in " + currentPath, consoleColors.default)
    })
  } else if(trimedInput === ".exit") {
    exitFromFileManager()
  } else {
    console.log(consoleColors.red, "Command not exist", consoleColors.default)
  }
})

process.on('exit', () => {
  console.log(consoleColors.magenta, `Thank you for using File Manager, ${username}, goodbye!`, consoleColors.default)
})

process.stdin.setEncoding("utf8")