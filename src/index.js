import { homedir } from "os";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { isMainThread, Worker } from "worker_threads";
import { getScriptPath } from "./command-map.js";
import { handleError } from "./helpers/error.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const userName = (args || [])
  .find((arg) => arg.startsWith("--username"))
  ?.slice(11) || '%Username%';

console.log(`Welcome to the File Manager, ${userName}!`);

let config = {
  currentDir: homedir(),
  logData: null
};
process.stdout.write(`${config.currentDir}> `);

process.stdin.on("data", async (data) => {
  const [command, ..._] = data.toString().trim().split(" ");
  if (command === ".exit") {
    exitProcess();
  }

  config = await executeCommand(data.toString());
  console.log(`You are currently in ${config.currentDir}`);
  process.stdout.write(`${config.currentDir}> `);
});

async function executeCommand(query) {
  const scriptPath = getScriptPath(query);
  if (scriptPath && isMainThread) {
    return new Promise((resolve) => {
      const path = join(__dirname, scriptPath);
      const workerData = { config, query };
      const worker = new Worker(path, { workerData });
      worker.on("message", newConfig => {
		resolve(logDataFromWorker(newConfig));
	  });
	  worker.on('error', (err => {
		handleError(err);
		resolve(config);
	  }));
    });
  } else {
	console.log('Invalid input');
	return Promise.resolve(config);
  }
}

function logDataFromWorker(newConfig) {
	if (newConfig.logData !== null) {
		console.log(newConfig.logData);
		newConfig.logData = null;
	}
	return newConfig;
}

process.on('SIGINT', () => {
	console.log('');
	exitProcess();
});

function exitProcess() {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
}
