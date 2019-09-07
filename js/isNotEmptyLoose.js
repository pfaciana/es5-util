var isEmptyLoose = require('./isEmptyLoose');

function isNotEmptyLoose(value) {
	return !isEmptyLoose(value);
}

module.exports = isNotEmptyLoose;