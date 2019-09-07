var isSetLoose = require('./isSetLoose');

function isNotSetLoose(value) {
	return !isSetLoose(value);
}

module.exports = isNotSetLoose;