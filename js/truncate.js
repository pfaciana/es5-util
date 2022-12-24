var isObject = require('./isObject');

function truncate(input, condition, suffix) {
	input = isObject(input) ? JSON.stringify(input) : String(input);
	suffix = typeof suffix != 'undefined' ? suffix : '&hellip;';
	if (condition instanceof Function) {
		condition = condition(input, suffix);
	}

	return (input.length > condition) ? input.slice(0, condition) + suffix : input;
};

module.exports = truncate;