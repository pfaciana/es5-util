function findReplace(string, find, replace) {
	replace = replace != null ? replace : '';

	if (typeof string !== 'string') {
		return string;
	}

	var pattern, regex;
	if ((pattern = find.match(/^ *\/(.*)\/(.*) *$/))) {
		regex = new RegExp(pattern[1], 'g' + (pattern.length > 1 ? pattern[2] : ''));
	} else {
		regex = new RegExp(find, 'g');
	}

	return string.replace(regex, replace);
}

module.exports = findReplace;