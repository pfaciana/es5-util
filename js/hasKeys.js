function hasKeys(object, path) {
	var keys = path.split('.');

	for (var index in keys) {
		object = object[keys[index]];
		if (typeof object === 'undefined') {
			return false;
		}
	}

	return true;
}

module.exports = hasKeys;