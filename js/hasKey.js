function hasKey(object, key) {
	return typeof object === 'object' && key in object;
}

module.exports = hasKey;