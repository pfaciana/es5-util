function round(value, precision) {
	precision |= 0;

	if (precision === 0) {
		return Math.round(value);
	}

	var m = Math.pow(10, precision);
	return Math.round(value * m) / m;
}

module.exports = round;