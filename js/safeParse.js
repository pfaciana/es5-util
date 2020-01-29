/*
 * Protection against
 *  - undefined
 *  - other non strings
 *  - non parsable strings
 */

function safeParse(data, convertScalarType) {
	if (typeof data !== "string" || typeof data === "undefined") {
		return data;
	}

	convertScalarType = convertScalarType != null ? convertScalarType : true;

	try {
		var parsedData = JSON.parse(data.replace(/(\r\n|\n|\r|\t)/gm, ""));

		if (!convertScalarType) {
			return typeof parsedData !== 'object' || parsedData === null ? data : parsedData;
		}

		return parsedData;
	} catch (e) {
		return data;
	}
}

module.exports = safeParse;