function isInteger(value) {
	return typeof value == 'number' && value == ~~value;
}

module.exports = isInteger;