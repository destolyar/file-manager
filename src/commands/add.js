import { workerData, parentPort } from 'worker_threads';
import { appendFile } from 'fs';
import { getFilePathArgs } from '../helpers/helpers.js';
import { InvalidInputError, OperationFailedError } from '../helpers/error.js';

const { config, query } = workerData;

const [ path ] = getFilePathArgs(query, 'add', 1, config.currentDir);
if (!path) {
	throw new InvalidInputError();
}

new Promise((resolve, _) => {
	appendFile(path, '', (err) => {
		if (err) {
			throw new OperationFailedError(e);
		} else {
			resolve();
		}
	});
}).then(() => {
	parentPort.postMessage(config);
});
