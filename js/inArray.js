function inArray(needle, haystack, strict) {
	strict = strict != null ? strict : false;

	if (!strict) {
		for (var key in haystack) {
			if (haystack[key] == needle) {
				return true;
			}
		}
	}

	return haystack.indexOf(needle) > -1;
}

module.exports = inArray;