function toPlainObject(value) {
	if (typeof value === 'string') {
		value = value.split('');
	}

	var obj = {};

	for (var key in value) {
		if (value.hasOwnProperty(key) || typeof value[key] !== 'function') {
			obj[key] = value[key];
		}
	}

	return obj;
}

module.exports = toPlainObject;