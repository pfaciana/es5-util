function toInteger(value) {
	if (value == Infinity) {
		return 1.7976931348623157e+308;
	}

	return ~~value; // bitwise, or bitwise |= or value - (value % 1)
}

module.exports = toInteger;