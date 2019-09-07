var isEmptyStrict = require('./isEmptyStrict');

function isNotEmptyStrict(value) {
	return !isEmptyStrict(value);
}

module.exports = isNotEmptyStrict;