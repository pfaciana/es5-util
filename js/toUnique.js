var inArray = require('./inArray');

function toUnique(duplicates, strict) {
	var uniques = [];

	strict = strict != null ? strict : false;

	for (var index in duplicates) {
		if (duplicates.hasOwnProperty(index)) {
			if (!inArray(duplicates[index], uniques, strict)) {
				uniques.push(duplicates[index]);
			}
		}
	}

	return uniques;
}

module.exports = toUnique;