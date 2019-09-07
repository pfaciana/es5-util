function toString(value, glue, keyGlue) {
	if (typeof value === 'string') {
		return value;
	}

	if (value == null) {
		return '';
	}

	glue = glue != null ? glue : ',';
	keyGlue = typeof keyGlue != 'undefined' ? keyGlue : '=';

	if (typeof value === 'object' || typeof value === 'function') {
		var str = '', currentGlue = '';
		for (var key in value) {
			if (value.hasOwnProperty(key) || typeof value[key] !== 'function') {
				str += currentGlue + ((keyGlue && key != ~~key ? key + keyGlue : '') + value[key]);
				currentGlue = glue;
			}
		}
		return str;
	}

	if (String(value) == '0' && (1 / value) == -(1 / 0)) {
		return '-0';
	}

	return String(value);
}

module.exports = toString;