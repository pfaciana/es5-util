var toNumber = require('./toNumber');

function toBytes(value, precision) {
	if (value == null || +value == 0) {
		return '0 B';
	}

	if (value === true || typeof value === 'function') {
		return '1 B';
	}

	if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'bigint') {
		for (var key in value) {
			if (value.hasOwnProperty(key)) {
				return '1 B';
			}
		}
		return '0 B';
	}

	var bytes = +(String(value).replace(/^\s+|\s+$/g, ''));

	if (isNaN(bytes)) {
		return '1 B';
	}

	var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
	var end = units.slice(-1)[0];
	var unit = units[0];

	for (var i = 0, len = units.length; i < len; i++) {
		unit = units[i];
		if ((Math.abs(bytes) || 0) < 1024 || unit === end) {
			break;
		}
		bytes = bytes / 1024;
	}

	return toNumber(bytes, (precision != null ? precision : 2)) + ' ' + unit;
}

module.exports = toBytes;