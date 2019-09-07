var strtotime = require('locutus/php/datetime/strtotime');

function toUnixTime(date, preserveJsMs) {
	date = ['undefined', 'null', 'false', 'true'].indexOf(String(date)) > -1 ? new Date() : date;
	var divisor = preserveJsMs ? 1 : 1000;

	if (date instanceof Date) {
		return parseInt((date.getTime() / divisor).toFixed(0));
	}

	if (typeof date !== 'string' && typeof date !== 'number') {
		return NaN;
	}

	if (isNaN(date)) {
		date = strtotime(date);
		return isNaN(date) || date === false ? NaN : date;
	}

	if (String(date).length === 14) { // mysql timestamp format of YYYYMMDDHHMMSS
		date = String(date);
		return Math.floor((new Date(date.substr(0, 4), date.substr(4, 2) - 1, date.substr(6, 2), date.substr(8, 2), date.substr(10, 2)).getTime() / divisor));
	}

	return isNaN(date) || date === Infinity ? NaN : ~~date;
}

module.exports = toUnixTime;