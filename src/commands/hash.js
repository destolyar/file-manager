import { getFilePathArgs } from "../helpers/helpers.js";
import { readFile } from "fs";
import { parentPort, workerData } from "worker_threads";
import { createHash } from "crypto";
import { InvalidInputError, OperationFailedError } from "../helpers/error.js";

const { config, query } = workerData;

new Promise((resolve) => {
	const [path] = getFilePathArgs(query, 'hash', 1, config.currentDir);
	if (!path) {
		throw new InvalidInputError();
	}
	readFile(path, (err, data) => {
		if (err) {
			throw new OperationFailedError();
		} else {
			const hash = createHash('sha256').update(data.toString()).digest('hex');
			console.log(hash);
			resolve();
		}
	});
}).then(() => {
	parentPort.postMessage(config);
});