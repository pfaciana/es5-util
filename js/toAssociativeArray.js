function toAssociativeArray(obj) {
	if (typeof obj === 'undefined') {
		return [];
	}

	if (Array.isArray(obj)) {
		return obj;
	}

	if (typeof obj !== 'object' || obj === null) {
		return [obj];
	}

	var arr = [];

	for (var key in obj) {
		if (obj.hasOwnProperty(key) || typeof arr[key] !== 'function') {
			arr[key] = obj[key];
		}
	}

	return arr;
}

module.exports = toAssociativeArray;