var isSetTag = require('./isSetTag');

function isNotSetTag(value) {
	return !isSetTag(value);
}

module.exports = isNotSetTag;