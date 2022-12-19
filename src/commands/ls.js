import { workerData, parentPort } from 'worker_threads';
import { readdir } from 'fs';

const { config } = workerData;

readdir(config.currentDir, { withFileTypes: true,  }, (_, files) => {
	const data = files.sort((a, b) => {
		if (a.isFile() && !b.isFile()) {
			return 1;
		} else if (!a.isFile() && b.isFile()) {
			return -1;
		} else {
			return a.name.localeCompare(b.name);
		}
	}).map(file => { 
		return { name: file.name, type: file.isFile() ? 'file' : 'directory' }
	});
	console.table(data);
	parentPort.postMessage(config);
});
