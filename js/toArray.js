function toArray(value) {
	if (typeof value === 'undefined' || value === null) {
		return [];
	}

	if (typeof value === 'string') {
		return value.length > 0 ? value.split('') : [value];
	}

	if (Array.isArray(value) || typeof value === 'object') {
		var arr = [];
		for (var key in value) {
			if (Array.isArray(value) || value.hasOwnProperty(key) || typeof value.constructor === 'function') {
				arr.push(value[key]);
			}
		}
		return arr;
	}

	return [value];
}

module.exports = toArray;