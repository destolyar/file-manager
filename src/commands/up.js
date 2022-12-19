import { workerData, parentPort } from 'worker_threads';
import { join } from 'path';

const { config } = workerData;

config.currentDir = join(config.currentDir, '..');
parentPort.postMessage(config);
