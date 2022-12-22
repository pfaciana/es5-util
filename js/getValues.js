function getValues(object) {
	var result = [];
	for (var prop in object) {
		if (object.hasOwnProperty(prop)) {
			result.push(object[prop]);
		}
	}

	return result;
}

module.exports = getValues;