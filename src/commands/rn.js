import { workerData, parentPort } from 'worker_threads';
import { rename } from 'fs';
import { getFilePathAndNameArgs } from '../helpers/helpers.js';
import { InvalidInputError, OperationFailedError } from '../helpers/error.js';
import { dirname, join } from 'path';

const { config, query } = workerData;

const [ path, name ] = getFilePathAndNameArgs(query, 'rn', config.currentDir);
if (!path || !name) {
	throw new InvalidInputError();
}

new Promise((resolve, _) => {
	const __dirname = dirname(path);
	const destinationPath = join(__dirname, name);
	rename(path, destinationPath, (err) => {
		if (err) {
			throw new OperationFailedError(err);
		} else {
			resolve();
		}
	});
}).then(() => {
	parentPort.postMessage(config);
});
