function getKey(object, key, defaultValue = undefined) {
	if (typeof object !== 'object' || !(key in object)) {
		return defaultValue;
	}

	return object[key];
}

module.exports = getKey;