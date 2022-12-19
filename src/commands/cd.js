import { workerData, parentPort } from 'worker_threads';
import { stat } from 'fs';
import { getFilePathArgs } from '../helpers/helpers.js';
import { InvalidInputError, OperationFailedError } from '../helpers/error.js';

const { config, query } = workerData;

const [ path ] = getFilePathArgs(query, 'cd', 1, config.currentDir);
if (!path) {
	throw new InvalidInputError();
}

new Promise(resolve => {
	stat(path, (err, stat) => {
		if (err || !stat?.isDirectory()) {
			throw new OperationFailedError();
		} else {
			config.currentDir = path;
			resolve();
		}
	})
}).then(() => {
	parentPort.postMessage(config);
});
