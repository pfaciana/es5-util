function getKey(object, key, defaultValue) {
	defaultValue = typeof defaultValue !== 'undefined' ? defaultValue : undefined;
	if (typeof object !== 'object' || !(key in object)) {
		return defaultValue;
	}

	return object[key];
}

module.exports = getKey;