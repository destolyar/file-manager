import { isAbsolute, join } from 'path';

export const filePathRegexString = '[\\s\\w\\d-\\\\\_:./]+';

export function getFilePathRegex(command, argsCount) {
	const args = Array.from({ length: argsCount }, () => `['"]?(${filePathRegexString})['"]?`);
	const result = new RegExp(`${command} ${args.join(' ')}`);
	return result;
}

export function getFilePathAndNameArgs(query, command, currentDir) {
	const regex = new RegExp(`${command} ['"]?(${filePathRegexString})['"]?\\s([\\d\\w.]+)`);
	const groups = regex.exec(query);
	if (groups?.length >= 3) {
		let [ path, name, ..._ ] = groups.slice(1);
		path = path.trim();
		path = isAbsolute(path) ? path : join(currentDir, path);
		name = name.trim();
		return [ path, name ];
	} else {
		return [];
	}
}

export function getFilePathArgs(query, command, count, currentDir) {
	const regex = getFilePathRegex(command, count);
	const groups = regex.exec(query);
	if (groups?.length >= count + 1) {
		return groups.slice(1, count + 1).map(arg => {
			const trimmedArg = arg.trim();
			return isAbsolute(trimmedArg) ? trimmedArg : join(currentDir, trimmedArg);
		});
	} else {
		return [];
	}
}

export function getDashedArgs(query) {
	const arr = query?.split(" ");
	return arr?.length > 1 && arr[1].trim();
}