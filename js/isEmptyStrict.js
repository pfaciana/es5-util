function isEmptyStrict(value) {
	if (typeof value === 'object') {
		for (var key in value) {
			if (value.hasOwnProperty(key) || typeof value[key] !== 'function') {
				return false;
			}
		}
		return true;
	}

	return [undefined, false, 0, '0', ''].indexOf(value) > -1;
}

module.exports = isEmptyStrict;