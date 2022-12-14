/*
 * Differs from just JSON.stringify because it does not escapes strings
 *
 * so 'abc' stays 'abc', and not "'abc'"
 * and '5' stays '5', not "'5'"
 *
 * Therefor  safeParse(safeStringify("5"))    =  5
 * but       JSON.parse(JSON.stringify("5"))  = "5"
 *
 */

var safeParse = require('./safeParse');

function safeStringify(data, replacer, space, forceParse) {
	replacer = replacer != null ? replacer : null;
	space = space != null ? space : null;
	forceParse = forceParse != null ? forceParse : false;
	var stringData = String(data);

	if (stringData == '0' && (1 / data) == -(1 / 0)) {
		return '-0';
	}

	if (stringData === 'Infinity' || stringData === 'NaN') {
		return stringData;
	}

	if (forceParse) {
		data = safeParse(data);
	}

	return typeof data === "string" ? data : JSON.stringify(data, replacer, space);
}

module.exports = safeStringify;