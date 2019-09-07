function isSetTag(value) {
	return ['undefined', 'null'].indexOf(String(value)) === -1 && value !== '';
}

module.exports = isSetTag;