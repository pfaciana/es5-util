function isArrayLikeObject(value) {
	function isLength(length) {
		return typeof length == 'number' && length > -1;
	}

	return value !== null && typeof value == 'object' && isLength(value.length);
}

module.exports = isArrayLikeObject;