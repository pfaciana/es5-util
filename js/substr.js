var toString = require('./toString');

function substr(string, start, length, validatePositions) {
	length = length != null ? length : null;
	validatePositions = validatePositions != null ? validatePositions : false;

	string = toString(string);
	start |= 0;
	length = ~~(length) || undefined;
	var end = string.length;

	if (start < 0) {
		start += end;
	}

	if (length != null) {
		end = length + (length > 0 ? start : end);
	}

	validatePositions && start > end && (start = [end, end = start][0]);

	return string.slice(start, end);
}

module.exports = substr;