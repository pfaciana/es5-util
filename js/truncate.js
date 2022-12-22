var isObject = require('./isObject');

function truncate(input, length, suffix) {
	suffix = typeof suffix != 'undefined' ? suffix : '&hellip;';
	input = isObject(input) ? JSON.stringify(input) : String(input);
	return (input.length > length) ? input.slice(0, length) + suffix : input;
};

module.exports = truncate;