function hasKeys(object, path) {
	if (typeof object !== 'object' || typeof path !== 'string') {
		return false;
	}

	var keys = path.split('.');

	for (var index in keys) {
		if (keys.hasOwnProperty(index)) {
			if (typeof object !== 'object' || !(keys[index] in object)) {
				return false;
			}
			object = object[keys[index]];
		}
	}

	return true;
}

module.exports = hasKeys;