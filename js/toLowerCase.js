function toLowerCase(s, option, preserveCase) {
	option = option != null ? option : null;
	s = preserveCase || preserveCase == null ? String(s) : String(s).toUpperCase();

	if (['first', false, 0, '0'].indexOf(option) > -1) {
		var first = s.charAt(0).toLowerCase();
		var rest = s.slice(1);

		return first + rest;
	}

	if (['words', true, 1, '1'].indexOf(option) > -1) {
		return s.replace(/^(.)|\s+(.)/g, function ($1) {
			return $1.toLowerCase();
		});
	}

	return s.toLowerCase();
}

module.exports = toLowerCase;