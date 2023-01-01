function getKeys(object, path, defaultValue) {
	defaultValue = typeof defaultValue !== 'undefined' ? defaultValue : undefined;
	if (typeof object !== 'object' || typeof path !== 'string') {
		return defaultValue;
	}

	var keys = path.split('.');

	for (var index in keys) {
		if (typeof object !== 'object' || !(keys[index] in object)) {
			return defaultValue;
		}
		object = object[keys[index]];
	}

	return object;
}

module.exports = getKeys;