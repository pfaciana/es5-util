var round = require('./round');

function toNumber(value, precision) {
	precision = precision != null ? precision : null;

	if (['number', 'boolean', 'string'].indexOf(typeof value) > -1) {
		if (typeof value == 'string') {
			value = value.replace(/^\s+|\s+$/g, '');
		}

		return precision != null ? round(+value, precision) : +value;
	}

	return value === null ? 0 : NaN;
}

module.exports = toNumber;