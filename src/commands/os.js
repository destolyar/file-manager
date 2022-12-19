import { parentPort, workerData } from "worker_threads";
import { EOL, cpus, homedir, userInfo, arch } from "os";
import { InvalidInputError } from "../helpers/error.js";
import { getDashedArgs } from "../helpers/helpers.js";

const { config, query } = workerData;
const arg = getDashedArgs(query);
switch (arg) {
  case "--EOL":
	console.log(JSON.stringify(EOL));
    break;
  case "--cpus":
	const arr = cpus();
	const info = arr.map((cpu, i) => {
		return `CPU ${i + 1}: ${cpu.model}`;
	})
	console.log(`Overall CPUS amount: ${arr.length}\n`, info.join('\n'));
    break;
  case "--homedir":
	console.log(homedir());
    break;
  case "--username":
	console.log(userInfo().username);
    break;
  case "--architecture":
	console.log(arch());
    break;
  default:
    throw new InvalidInputError();
}
parentPort.postMessage(config);
