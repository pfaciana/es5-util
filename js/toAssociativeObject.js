var isPlainObject = require('./isPlainObject');

function toAssociativeObject(arr) {
	if (typeof arr == 'undefined') {
		return {};
	}

	if (isPlainObject(arr)) {
		return arr;
	}

	if (typeof arr !== 'object' || arr === null) {
		arr = [arr];
	}

	var obj = {};

	for (var key in arr) {
		if (arr.hasOwnProperty(key) || typeof arr[key] !== 'function') {
			obj[key] = arr[key];
		}
	}

	return obj;
}

module.exports = toAssociativeObject;