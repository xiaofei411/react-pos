import Joi from 'joi';
import {
	SubmissionError
} from 'redux-form';

const validator = {
	validate: (obj, schema, callback) => Joi.validate(obj, schema, callback)
};

export const validate = (values, schema, callback) => {
	let result = validator.validate(values, schema, {
		abortEarly: false
	}, callback);

	if (callback)
		return;

	if (result.error != null) {
		let res = parseToReduxError(result.error);
		// res._error = 'Form has errors!';
		return res;
	}
};

export const parseToReduxError = errorDefinition => {
	if (!errorDefinition || !errorDefinition.details) return;

	let resultObj = {};

	errorDefinition.details.forEach(eDetails => {
		resultObj[`${eDetails.context.key}`] = eDetails.message;
	});

	return resultObj;
};

export const throwIfServerError = (action, statusMessages) => {
	let reduxErrors = {};

	// override API exceptions to custom status messages.
	if (statusMessages && action.payload) {
		let keys = Object.keys(statusMessages);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];

			if (action.payload.status && action.payload.status.toString() === key) {
				if (statusMessages[key].hasOwnProperty("fieldTo"))
					reduxErrors[statusMessages[key].fieldTo] = statusMessages[key].message;

				reduxErrors._error = statusMessages[key].message;
			}

			throw new SubmissionError(reduxErrors);
		}
	}

	// throw if there is an exception from API
	if (action.payload && action.payload.exMessage) {
		reduxErrors._error = action.payload.exMessage;
		throw new SubmissionError(reduxErrors);
	}
}