/*
 * Protection against
 *  - undefined
 *  - other non strings
 *  - non parsable strings
 */

function safeParse(data) {
	if (typeof data !== "string" || typeof data === "undefined") {
		return data;
	}

	try {
		data = data.replace(/(\r\n|\n|\r|\t)/gm, "");
		return JSON.parse(data);
	} catch (e) {
		return data;
	}
}

module.exports = safeParse;