import { createReadStream, createWriteStream, unlink } from 'fs';
import { pipeline } from 'stream';
import { parentPort, workerData } from 'worker_threads';
import { createBrotliCompress } from 'zlib';
import { InvalidInputError, OperationFailedError } from '../helpers/error.js';
import { getFilePathArgs } from '../helpers/helpers.js';

const { config, query } = workerData;

const [ originPath, destinationPath ] = getFilePathArgs(query, 'compress', 2, config.currentDir);
if (!originPath || !destinationPath) {
	throw new InvalidInputError();
}
new Promise((resolve) => {
	const readStream = createReadStream(originPath);
	const writeStream = createWriteStream(destinationPath);
	const compress = createBrotliCompress();
	pipeline(readStream, compress, writeStream, (err) => {
		if (err) {
			unlink(destinationPath, () => {})
			throw new OperationFailedError();
		} else {
			resolve();
		}
	});
}).then(() => {
	parentPort.postMessage(config);
})