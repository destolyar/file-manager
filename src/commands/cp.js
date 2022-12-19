import { workerData, parentPort } from 'worker_threads';
import { copyFile } from 'fs';
import { getFilePathArgs } from '../helpers/helpers.js';
import { InvalidInputError, OperationFailedError } from '../helpers/error.js';

const { config, query } = workerData;

const [ originalPath, destinationPath ] = getFilePathArgs(query, 'cp', 2, config.currentDir);
if (!originalPath || !destinationPath) {
	throw new InvalidInputError();
}

new Promise((resolve, _) => {
	copyFile(originalPath, destinationPath, (err) => {
		if (err) {
			throw new OperationFailedError(err);
		} else {
			resolve();
		}
	});
}).then(() => {
	parentPort.postMessage(config);
});
