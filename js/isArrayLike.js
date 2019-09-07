function isArrayLike(value) {
	function isLength(length) {
		return typeof length == 'number' && length > -1;
	}

	if (value == null || typeof value === 'function') {
		return false;
	}

	return typeof value.length != 'undefined' && isLength(value.length);
}

module.exports = isArrayLike;