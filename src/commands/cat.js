import { workerData, parentPort } from 'worker_threads';
import { createReadStream } from 'fs';
import { getFilePathArgs } from '../helpers/helpers.js';
import { InvalidInputError, OperationFailedError } from '../helpers/error.js';
import { pipeline } from 'stream';

const { config, query } = workerData;

const [ path ] = getFilePathArgs(query, 'cat', 1, config.currentDir);
if (!path) {
	throw new InvalidInputError();
}

new Promise((resolve, _) => {
	const stream = createReadStream(path);
	pipeline(stream, process.stdout, (err) => {
		if (err) {
			throw new OperationFailedError(err);
		} else {
			config.logData = '';
			resolve();
		}
	});
}).then(() => {
	parentPort.postMessage(config);
});
