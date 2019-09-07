function toAssociativeValues(value) {
	if (typeof value === 'undefined') {
		return [];
	}

	if (typeof value !== 'object' || value === null) {
		return [value];
	}

	var arr = [];

	for (var key in value) {
		if (value.hasOwnProperty(key) || typeof value[key] !== 'function') {
			arr.push(value[key]);
		}
	}

	return arr;
}

module.exports = toAssociativeValues;