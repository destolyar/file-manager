import { join } from 'path';

const commandsMap = {
	'up': ['commands', 'up.js'],
	'ls': ['commands', 'ls.js'],
	'cd': ['commands', 'cd.js'],
	'os': ['commands', 'os.js'],
	'hash': ['commands', 'hash.js'],
	'compress': ['commands', 'compress.js'],
	'decompress': ['commands', 'decompress.js'],
	'cat': ['commands', 'cat.js'],
	'add': ['commands', 'add.js'],
	'rn': ['commands', 'rn.js'],
	'cp': ['commands', 'cp.js'],
	'mv': ['commands', 'mv.js'],
	'rm': ['commands', 'rm.js'],
}

export function getScriptPath(query) {
	const command = Object.keys(commandsMap).find(key => query.startsWith(key));
	return command && join(...commandsMap[command]);
}