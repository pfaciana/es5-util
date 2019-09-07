var isSetStrict = require('./isSetStrict');

function isNotSetStrict(value) {
	return !isSetStrict(value);
}

module.exports = isNotSetStrict;