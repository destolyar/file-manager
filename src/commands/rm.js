import { workerData, parentPort } from 'worker_threads';
import { rename, unlink } from 'fs';
import { getFilePathArgs } from '../helpers/helpers.js';
import { InvalidInputError, OperationFailedError } from '../helpers/error.js';

const { config, query } = workerData;

const [ path ] = getFilePathArgs(query, 'rm', 1, config.currentDir);
if (!path) {
	throw new InvalidInputError();
}

new Promise((resolve, _) => {
	unlink(path, (err) => {
		if (err) {
			throw new OperationFailedError(err);
		} else {
			resolve();
		}
	});
}).then(() => {
	parentPort.postMessage(config);
});
