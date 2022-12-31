function hasKey(object, key) {
	return typeof object === 'object' && object !== null && key in object;
}

module.exports = hasKey;