function isArray(value) {
	return Array.isArray(value);
}

function isObject(value) {
	return isCompound(value) && !isArray(value);
}

function isCompound(value) {
	return typeof value === 'object' || typeof value === 'function';
}

function compare(type = 'sort', locale = 'en-US') {
	return function (a, b) {
		if (a === b) {
			return 0;
		}
		if (a === undefined || b === undefined) {
			return (a === undefined) ? -1 : 1;
		}
		if (a === null || b === null) {
			return (a === null) ? -1 : 1;
		}
		if (a === false || b === false) {
			return (a === false) ? -1 : 1;
		}
		if (a === true || b === true) {
			return (a === true) ? -1 : 1;
		}
		if (a === '' || b === '') {
			return (a === '') ? -1 : 1;
		}
		if (!isNaN(a) && !isNaN(b)) {
			return a - b;
		}
		if (!isNaN(a) || !isNaN(b)) {
			return (!isNaN(a)) ? -1 : 1;
		}
		if (isCompound(a) && !isCompound(b)) {
			return 1;
		}
		if (isCompound(b) && !isCompound(a)) {
			return -1;
		}
		if (isArray(a) && isObject(b)) {
			return -1;
		}
		if (isArray(b) && isObject(a)) {
			return 1;
		}
		if (a[0] === '_' && b[0] !== '_') {
			return -1;
		}
		if (b[0] === '_' && a[0] !== '_') {
			return 1;
		}
		if (typeof a !== 'string') {
			a = JSON.stringify(a);
		}
		if (typeof b !== 'string') {
			b = JSON.stringify(b);
		}
		if (type[0] === 'u') {
			return a.localeCompare(b, locale + '-u-kf-upper');
		}
		if (type[0] === 'l') {
			return a.localeCompare(b, locale + '-u-kf-lower');
		}
		if (type[0] === 'i') {
			a = a.toLowerCase();
			b = b.toLowerCase();
		}

		var temp = [a, b];
		temp.sort();
		return temp[0] === a ? -1 : 1;
	};
}

module.exports = compare();
module.exports.upperFirst = compare('u');
module.exports.lowerFirst = compare('l');
module.exports.insensitive = compare('i');
module.exports.compare = compare;