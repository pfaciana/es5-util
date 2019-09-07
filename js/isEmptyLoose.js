var isEmptyStrict = require('./isEmptyStrict');

function isEmptyLoose(value) {
	if (isEmptyStrict(value)) {
		return true;
	}

	return ['undefined', 'null', 'false'].indexOf(String(value)) > -1;
}

module.exports = isEmptyLoose;