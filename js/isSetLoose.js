function isSetLoose(value) {
	return ['undefined', 'null'].indexOf(String(value)) === -1;
}

module.exports = isSetLoose;