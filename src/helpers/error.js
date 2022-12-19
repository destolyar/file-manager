
class ErrorBase extends Error {
	constructor(originalError) {
		super();
		this.originalError = originalError;
	}
}

export class InvalidInputError extends ErrorBase {
	constructor(e) {
		super(e);
		this.type = 'InvalidInputError';
	}
}

export class OperationFailedError extends ErrorBase {
	constructor(e) {
		super(e);
		this.type = 'OperationFailedError';
	}
}

export function handleError(error) {
	if (error.type === 'InvalidInputError') {
		console.log('Invalid input');
	} else if (error.type === 'OperationFailedError') {
		console.log('Operation failed');
	}
	
	if (error.originalError) {
		//console.log('original error:', error.originalError);
	}
}