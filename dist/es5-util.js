(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports.arrayColumn = require('./js/arrayColumn');
module.exports.castArray = require('./js/castArray');
module.exports.compare = require('./js/compare');
module.exports.getFromObjPath = require('./js/getFromObjPath');
module.exports.findReplace = require('./js/findReplace');
module.exports.getKey = require('./js/getKey');
module.exports.getKeys = require('./js/getKeys');
module.exports.getUID = require('./js/getUID');
module.exports.getiUID = require('./js/getUID').getiUID;
module.exports.getUID16 = require('./js/getUID').getUID16;
module.exports.getValues = require('./js/getValues');
module.exports.hasKey = require('./js/hasKey');
module.exports.hasKeys = require('./js/hasKeys');
module.exports.inArray = require('./js/inArray');
module.exports.isArrayLike = require('./js/isArrayLike');
module.exports.isArrayLikeObject = require('./js/isArrayLikeObject');
module.exports.isEmptyLoose = require('./js/isEmptyLoose');
module.exports.isEmptyStrict = require('./js/isEmptyStrict');
module.exports.isInteger = require('./js/isInteger');
module.exports.isNotEmptyLoose = require('./js/isNotEmptyLoose');
module.exports.isNotEmptyStrict = require('./js/isNotEmptyStrict');
module.exports.isNotSetLoose = require('./js/isNotSetLoose');
module.exports.isNotSetStrict = require('./js/isNotSetStrict');
module.exports.isNotSetTag = require('./js/isNotSetTag');
module.exports.isObject = require('./js/isObject');
module.exports.isObjectLike = require('./js/isObjectLike');
module.exports.isPlainObject = require('./js/isPlainObject');
module.exports.isSetLoose = require('./js/isSetLoose');
module.exports.isSetStrict = require('./js/isSetStrict');
module.exports.isSetTag = require('./js/isSetTag');
module.exports.round = require('./js/round');
module.exports.safeParse = require('./js/safeParse');
module.exports.safeStringify = require('./js/safeStringify');
module.exports.substr = require('./js/substr');
module.exports.toArray = require('./js/toArray');
module.exports.toAssociativeArray = require('./js/toAssociativeArray');
module.exports.toAssociativeObject = require('./js/toAssociativeObject');
module.exports.toAssociativeValues = require('./js/toAssociativeValues');
module.exports.toBytes = require('./js/toBytes');
module.exports.toHtmlEntities = require('./js/toHtmlEntities');
module.exports.toInteger = require('./js/toInteger');
module.exports.toLowerCase = require('./js/toLowerCase');
module.exports.toNumber = require('./js/toNumber');
module.exports.toPlainObject = require('./js/toPlainObject');
module.exports.toString = require('./js/toString');
module.exports.toUnique = require('./js/toUnique');
module.exports.toUnixTime = require('./js/toUnixTime');
module.exports.toUpperCase = require('./js/toUpperCase');
module.exports.truncate = require('./js/truncate');

if (typeof window === 'object') {
	window.es5utils = module.exports;
}
},{"./js/arrayColumn":2,"./js/castArray":3,"./js/compare":4,"./js/findReplace":5,"./js/getFromObjPath":6,"./js/getKey":7,"./js/getKeys":8,"./js/getUID":9,"./js/getValues":10,"./js/hasKey":11,"./js/hasKeys":12,"./js/inArray":13,"./js/isArrayLike":14,"./js/isArrayLikeObject":15,"./js/isEmptyLoose":16,"./js/isEmptyStrict":17,"./js/isInteger":18,"./js/isNotEmptyLoose":19,"./js/isNotEmptyStrict":20,"./js/isNotSetLoose":21,"./js/isNotSetStrict":22,"./js/isNotSetTag":23,"./js/isObject":24,"./js/isObjectLike":25,"./js/isPlainObject":26,"./js/isSetLoose":27,"./js/isSetStrict":28,"./js/isSetTag":29,"./js/round":30,"./js/safeParse":31,"./js/safeStringify":32,"./js/substr":33,"./js/toArray":34,"./js/toAssociativeArray":35,"./js/toAssociativeObject":36,"./js/toAssociativeValues":37,"./js/toBytes":38,"./js/toHtmlEntities":39,"./js/toInteger":40,"./js/toLowerCase":41,"./js/toNumber":42,"./js/toPlainObject":43,"./js/toString":44,"./js/toUnique":46,"./js/toUnixTime":47,"./js/toUpperCase":48,"./js/truncate":49}],2:[function(require,module,exports){
const getFromObjPath = require('./getFromObjPath');
const getValues = require('./getValues');

function arrayColumn(array, columnKey, indexKey) {
	columnKey = columnKey != null ? columnKey : null;
	indexKey = indexKey != null ? indexKey : null;
	if (indexKey !== null) {
		let obj = {};
		for (var index in array) {
			if (array.hasOwnProperty(index) || typeof array[index] !== 'function') {
				obj[getFromObjPath(array[index], indexKey)] = columnKey !== null ? (typeof columnKey === 'function' ? columnKey(array[index]) : getFromObjPath(array[index], columnKey)) : array[index];
			}
		}
		return obj;
	}

	array = Array.isArray(array) ? array : getValues(array);
	return array.map(function (value, index) {
		return typeof columnKey === 'function' ? columnKey(value) : getFromObjPath(value, columnKey);
	})
}

module.exports = arrayColumn;
},{"./getFromObjPath":6,"./getValues":10}],3:[function(require,module,exports){
function castArray() {
	if (!arguments.length) {
		return [];
	}
	var value = arguments[0];
	return Array.isArray(value) ? value : [value];
}

module.exports = castArray;
},{}],4:[function(require,module,exports){
function isArray(value) {
	return Array.isArray(value);
}

function isObject(value) {
	return isCompound(value) && !isArray(value);
}

function isCompound(value) {
	return typeof value === 'object' || typeof value === 'function';
}

function compare(type, locale) {
	type = type != null ? type : 'sort';
	locale = locale != null ? locale : 'en-US';
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
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
function getFromObjPath(obj, path) {
	if (typeof path !== 'string' && !(path instanceof String)) {
		return obj[path];
	}
	return path.split('.').reduce((o, i) => o[i], obj);
}

module.exports = getFromObjPath;
},{}],7:[function(require,module,exports){
function getKey(object, key, defaultValue) {
	defaultValue = typeof defaultValue !== 'undefined' ? defaultValue : undefined;
	if (typeof object !== 'object' || !(key in object)) {
		return defaultValue;
	}

	return object[key];
}

module.exports = getKey;
},{}],8:[function(require,module,exports){
function getKeys(object, path, defaultValue) {
	defaultValue = typeof defaultValue !== 'undefined' ? defaultValue : undefined;
	if (typeof object !== 'object' || typeof path !== 'string') {
		return defaultValue;
	}

	var keys = path.split('.');

	for (var index in keys) {
		if (typeof object !== 'object' || !(keys[index] in object)) {
			return defaultValue;
		}
		object = object[keys[index]];
	}

	return object;
}

module.exports = getKeys;
},{}],9:[function(require,module,exports){
function getUID(length, characters) {
	var charactersLength, result = '';

	length = length != null ? length : 7;
	characters = characters != null ? characters : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	charactersLength = characters.length;

	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

function getiUID(length) {
	return getUID(length, 'abcdefghijklmnopqrstuvwxyz0123456789');
}

function getUID16(length) {
	return getUID(length, '0123456789abcdef')
}

module.exports = getUID;

module.exports.getiUID = getiUID;

module.exports.getUID16 = getUID16;

},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
function hasKey(object, key) {
	return typeof object === 'object' && object !== null && key in object;
}

module.exports = hasKey;
},{}],12:[function(require,module,exports){
function hasKeys(object, path) {
	if (typeof object !== 'object' || typeof path !== 'string') {
		return false;
	}

	var keys = path.split('.');

	for (var index in keys) {
		if (keys.hasOwnProperty(index)) {
			if (typeof object !== 'object' || !(keys[index] in object)) {
				return false;
			}
			object = object[keys[index]];
		}
	}

	return true;
}

module.exports = hasKeys;
},{}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){
function isArrayLike(value) {
	function isLength(length) {
		return typeof length == 'number' && length > -1;
	}

	if (value == null || typeof value === 'function') {
		return false;
	}

	return typeof value.length != 'undefined' && isLength(value.length);
}

module.exports = isArrayLike;
},{}],15:[function(require,module,exports){
function isArrayLikeObject(value) {
	function isLength(length) {
		return typeof length == 'number' && length > -1;
	}

	return value !== null && typeof value == 'object' && isLength(value.length);
}

module.exports = isArrayLikeObject;
},{}],16:[function(require,module,exports){
var isEmptyStrict = require('./isEmptyStrict');

function isEmptyLoose(value) {
	if (isEmptyStrict(value)) {
		return true;
	}

	return ['undefined', 'null', 'false'].indexOf(String(value)) > -1;
}

module.exports = isEmptyLoose;
},{"./isEmptyStrict":17}],17:[function(require,module,exports){
function isEmptyStrict(value) {
	if (typeof value === 'object') {
		for (var key in value) {
			if (value.hasOwnProperty(key) || typeof value[key] !== 'function') {
				return false;
			}
		}
		return true;
	}

	return [undefined, false, 0, '0', ''].indexOf(value) > -1;
}

module.exports = isEmptyStrict;
},{}],18:[function(require,module,exports){
function isInteger(value) {
	return typeof value == 'number' && value == ~~value;
}

module.exports = isInteger;
},{}],19:[function(require,module,exports){
var isEmptyLoose = require('./isEmptyLoose');

function isNotEmptyLoose(value) {
	return !isEmptyLoose(value);
}

module.exports = isNotEmptyLoose;
},{"./isEmptyLoose":16}],20:[function(require,module,exports){
var isEmptyStrict = require('./isEmptyStrict');

function isNotEmptyStrict(value) {
	return !isEmptyStrict(value);
}

module.exports = isNotEmptyStrict;
},{"./isEmptyStrict":17}],21:[function(require,module,exports){
var isSetLoose = require('./isSetLoose');

function isNotSetLoose(value) {
	return !isSetLoose(value);
}

module.exports = isNotSetLoose;
},{"./isSetLoose":27}],22:[function(require,module,exports){
var isSetStrict = require('./isSetStrict');

function isNotSetStrict(value) {
	return !isSetStrict(value);
}

module.exports = isNotSetStrict;
},{"./isSetStrict":28}],23:[function(require,module,exports){
var isSetTag = require('./isSetTag');

function isNotSetTag(value) {
	return !isSetTag(value);
}

module.exports = isNotSetTag;
},{"./isSetTag":29}],24:[function(require,module,exports){
function isObject(value) {
	return (typeof value == 'object' || typeof value == 'function') && value !== null;
}

module.exports = isObject;
},{}],25:[function(require,module,exports){
function isObjectLike(value) {
	return typeof value == 'object' && value !== null;
}

module.exports = isObjectLike;
},{}],26:[function(require,module,exports){
function isPlainObject(value) {
	if (typeof value !== 'object' || value == null) {
		return false;
	}

	var Ctor = Object.getPrototypeOf(Object(value)).constructor;

	return Ctor instanceof Ctor;
}

module.exports = isPlainObject;
},{}],27:[function(require,module,exports){
function isSetLoose(value) {
	return ['undefined', 'null'].indexOf(String(value)) === -1;
}

module.exports = isSetLoose;
},{}],28:[function(require,module,exports){
function isSetStrict(value) {
	return value != null;
}

module.exports = isSetStrict;
},{}],29:[function(require,module,exports){
function isSetTag(value) {
	return ['undefined', 'null'].indexOf(String(value)) === -1 && value !== '';
}

module.exports = isSetTag;
},{}],30:[function(require,module,exports){
function round(value, precision) {
	precision |= 0;

	if (precision === 0) {
		return Math.round(value);
	}

	var m = Math.pow(10, precision);
	return Math.round(value * m) / m;
}

module.exports = round;
},{}],31:[function(require,module,exports){
/*
 * Protection against
 *  - undefined
 *  - other non strings
 *  - non parsable strings
 */

function safeParse(data, forceParse) {
	if (typeof data !== "string") {
		return data;
	}

	forceParse = forceParse != null ? forceParse : true;

	try {
		if (data === 'NULL') {
			data = 'null';
		}

		var parsedData = JSON.parse(data.replace(/(\r\n|\n|\r|\t)/gm, ""));

		if (!forceParse && (typeof parsedData !== 'object' || parsedData === null)) {
			return data;
		}

		return parsedData;
	} catch (e) {
		return data;
	}
}

module.exports = safeParse;
},{}],32:[function(require,module,exports){
/*
 * Differs from just JSON.stringify because it does not escapes strings
 *
 * so 'abc' stays 'abc', and not "'abc'"
 * and '5' stays '5', not "'5'"
 *
 * Therefor  safeParse(safeStringify("5"))    =  5
 * but       JSON.parse(JSON.stringify("5"))  = "5"
 *
 */

var safeParse = require('./safeParse');

function safeStringify(data, replacer, space, forceParse) {
	replacer = replacer != null ? replacer : null;
	space = space != null ? space : null;
	forceParse = forceParse != null ? forceParse : false;
	var stringData = String(data);

	if (stringData == '0' && (1 / data) == -(1 / 0)) {
		return '-0';
	}

	if (stringData === 'Infinity' || stringData === 'NaN') {
		return stringData;
	}

	if (forceParse) {
		data = safeParse(data);
	}

	return typeof data === "string" ? data : JSON.stringify(data, replacer, space);
}

module.exports = safeStringify;
},{"./safeParse":31}],33:[function(require,module,exports){
var toString = require('./toString');

function substr(string, start, length, validatePositions) {
	length = length != null ? length : null;
	validatePositions = validatePositions != null ? validatePositions : false;

	string = toString(string);
	start |= 0;
	length = ~~(length) || undefined;
	var end = string.length;

	if (start < 0) {
		start += end;
	}

	if (length != null) {
		end = length + (length > 0 ? start : end);
	}

	validatePositions && start > end && (start = [end, end = start][0]);

	return string.slice(start, end);
}

module.exports = substr;
},{"./toString":44}],34:[function(require,module,exports){
function toArray(value, delimiter) {
	if (typeof value === 'undefined' || value === null) {
		return [];
	}

	if (typeof value === 'string') {
		return value.length > 0 ? value.split(delimiter != null ? delimiter : '') : [value];
	}

	if (Array.isArray(value) || typeof value === 'object') {
		var arr = [];
		for (var key in value) {
			if (Array.isArray(value) || value.hasOwnProperty(key) || typeof value.constructor === 'function') {
				arr.push(value[key]);
			}
		}
		return arr;
	}

	return [value];
}

module.exports = toArray;
},{}],35:[function(require,module,exports){
function toAssociativeArray(obj) {
	if (typeof obj === 'undefined') {
		return [];
	}

	if (Array.isArray(obj)) {
		return obj;
	}

	if (typeof obj !== 'object' || obj === null) {
		return [obj];
	}

	var arr = [];

	for (var key in obj) {
		if (obj.hasOwnProperty(key) || typeof arr[key] !== 'function') {
			arr[key] = obj[key];
		}
	}

	return arr;
}

module.exports = toAssociativeArray;
},{}],36:[function(require,module,exports){
var isPlainObject = require('./isPlainObject');

function toAssociativeObject(arr) {
	if (typeof arr == 'undefined') {
		return {};
	}

	if (isPlainObject(arr)) {
		return arr;
	}

	if (typeof arr !== 'object' || arr === null) {
		arr = [arr];
	}

	var obj = {};

	for (var key in arr) {
		if (arr.hasOwnProperty(key) || typeof arr[key] !== 'function') {
			obj[key] = arr[key];
		}
	}

	return obj;
}

module.exports = toAssociativeObject;
},{"./isPlainObject":26}],37:[function(require,module,exports){
function toAssociativeValues(value) {
	if (typeof value === 'undefined') {
		return [];
	}

	if (typeof value !== 'object' || value === null) {
		return [value];
	}

	var arr = [];

	for (var key in value) {
		if (value.hasOwnProperty(key) || typeof value[key] !== 'function') {
			arr.push(value[key]);
		}
	}

	return arr;
}

module.exports = toAssociativeValues;
},{}],38:[function(require,module,exports){
var toNumber = require('./toNumber');

function toBytes(value, precision) {
	if (value == null || +value == 0) {
		return '0 B';
	}

	if (value === true || typeof value === 'function') {
		return '1 B';
	}

	if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'bigint') {
		for (var key in value) {
			if (value.hasOwnProperty(key)) {
				return '1 B';
			}
		}
		return '0 B';
	}

	var bytes = +(String(value).replace(/^\s+|\s+$/g, ''));

	if (isNaN(bytes)) {
		return '1 B';
	}

	var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
	var end = units.slice(-1)[0];
	var unit = units[0];

	for (var i = 0, len = units.length; i < len; i++) {
		unit = units[i];
		if ((Math.abs(bytes) || 0) < 1024 || unit === end) {
			break;
		}
		bytes = bytes / 1024;
	}

	return toNumber(bytes, (precision != null ? precision : 2)) + ' ' + unit;
}

module.exports = toBytes;
},{"./toNumber":42}],39:[function(require,module,exports){
function toHtmlEntities(input) {
	return input.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
};

module.exports = toHtmlEntities;
},{}],40:[function(require,module,exports){
function toInteger(value) {
	if (value == Infinity) {
		return 1.7976931348623157e+308;
	}

	return ~~value; // bitwise, or bitwise |= or value - (value % 1)
}

module.exports = toInteger;
},{}],41:[function(require,module,exports){
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
},{}],42:[function(require,module,exports){
var round = require('./round');

function toNumber(value, precision) {
	precision = precision != null ? precision : null;

	if (['number', 'boolean', 'string'].indexOf(typeof value) > -1) {
		if (typeof value == 'string') {
			value = value.replace(/^\s+|\s+$/g, '');
		}

		return precision != null ? round(+value, precision) : +value;
	}

	return value === null ? 0 : NaN;
}

module.exports = toNumber;
},{"./round":30}],43:[function(require,module,exports){
function toPlainObject(value) {
	if (typeof value === 'string') {
		value = value.split('');
	}

	var obj = {};

	for (var key in value) {
		if (value.hasOwnProperty(key) || typeof value[key] !== 'function') {
			obj[key] = value[key];
		}
	}

	return obj;
}

module.exports = toPlainObject;
},{}],44:[function(require,module,exports){
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
},{}],45:[function(require,module,exports){
'use strict';

var reSpace = '[ \\t]+';
var reSpaceOpt = '[ \\t]*';
var reMeridian = '(?:([ap])\\.?m\\.?([\\t ]|$))';
var reHour24 = '(2[0-4]|[01]?[0-9])';
var reHour24lz = '([01][0-9]|2[0-4])';
var reHour12 = '(0?[1-9]|1[0-2])';
var reMinute = '([0-5]?[0-9])';
var reMinutelz = '([0-5][0-9])';
var reSecond = '(60|[0-5]?[0-9])';
var reSecondlz = '(60|[0-5][0-9])';
var reFrac = '(?:\\.([0-9]+))';

var reDayfull = 'sunday|monday|tuesday|wednesday|thursday|friday|saturday';
var reDayabbr = 'sun|mon|tue|wed|thu|fri|sat';
var reDaytext = reDayfull + '|' + reDayabbr + '|weekdays?';

var reReltextnumber = 'first|second|third|fourth|fifth|sixth|seventh|eighth?|ninth|tenth|eleventh|twelfth';
var reReltexttext = 'next|last|previous|this';
var reReltextunit = '(?:second|sec|minute|min|hour|day|fortnight|forthnight|month|year)s?|weeks|' + reDaytext;

var reYear = '([0-9]{1,4})';
var reYear2 = '([0-9]{2})';
var reYear4 = '([0-9]{4})';
var reYear4withSign = '([+-]?[0-9]{4})';
var reMonth = '(1[0-2]|0?[0-9])';
var reMonthlz = '(0[0-9]|1[0-2])';
var reDay = '(?:(3[01]|[0-2]?[0-9])(?:st|nd|rd|th)?)';
var reDaylz = '(0[0-9]|[1-2][0-9]|3[01])';

var reMonthFull = 'january|february|march|april|may|june|july|august|september|october|november|december';
var reMonthAbbr = 'jan|feb|mar|apr|may|jun|jul|aug|sept?|oct|nov|dec';
var reMonthroman = 'i[vx]|vi{0,3}|xi{0,2}|i{1,3}';
var reMonthText = '(' + reMonthFull + '|' + reMonthAbbr + '|' + reMonthroman + ')';

var reTzCorrection = '((?:GMT)?([+-])' + reHour24 + ':?' + reMinute + '?)';
var reDayOfYear = '(00[1-9]|0[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6])';
var reWeekOfYear = '(0[1-9]|[1-4][0-9]|5[0-3])';

var reDateNoYear = reMonthText + '[ .\\t-]*' + reDay + '[,.stndrh\\t ]*';

function processMeridian(hour, meridian) {
	meridian = meridian && meridian.toLowerCase();

	switch (meridian) {
		case 'a':
			hour += hour === 12 ? -12 : 0;
			break;
		case 'p':
			hour += hour !== 12 ? 12 : 0;
			break;
	}

	return hour;
}

function processYear(yearStr) {
	var year = +yearStr;

	if (yearStr.length < 4 && year < 100) {
		year += year < 70 ? 2000 : 1900;
	}

	return year;
}

function lookupMonth(monthStr) {
	return {
		jan: 0,
		january: 0,
		i: 0,
		feb: 1,
		february: 1,
		ii: 1,
		mar: 2,
		march: 2,
		iii: 2,
		apr: 3,
		april: 3,
		iv: 3,
		may: 4,
		v: 4,
		jun: 5,
		june: 5,
		vi: 5,
		jul: 6,
		july: 6,
		vii: 6,
		aug: 7,
		august: 7,
		viii: 7,
		sep: 8,
		sept: 8,
		september: 8,
		ix: 8,
		oct: 9,
		october: 9,
		x: 9,
		nov: 10,
		november: 10,
		xi: 10,
		dec: 11,
		december: 11,
		xii: 11
	}[monthStr.toLowerCase()];
}

function lookupWeekday(dayStr) {
	var desiredSundayNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	var dayNumbers = {
		mon: 1,
		monday: 1,
		tue: 2,
		tuesday: 2,
		wed: 3,
		wednesday: 3,
		thu: 4,
		thursday: 4,
		fri: 5,
		friday: 5,
		sat: 6,
		saturday: 6,
		sun: 0,
		sunday: 0
	};

	return dayNumbers[dayStr.toLowerCase()] || desiredSundayNumber;
}

function lookupRelative(relText) {
	var relativeNumbers = {
		last: -1,
		previous: -1,
		this: 0,
		first: 1,
		next: 1,
		second: 2,
		third: 3,
		fourth: 4,
		fifth: 5,
		sixth: 6,
		seventh: 7,
		eight: 8,
		eighth: 8,
		ninth: 9,
		tenth: 10,
		eleventh: 11,
		twelfth: 12
	};

	var relativeBehavior = {
		this: 1
	};

	var relTextLower = relText.toLowerCase();

	return {
		amount: relativeNumbers[relTextLower],
		behavior: relativeBehavior[relTextLower] || 0
	};
}

function processTzCorrection(tzOffset, oldValue) {
	var reTzCorrectionLoose = /(?:GMT)?([+-])(\d+)(:?)(\d{0,2})/i;
	tzOffset = tzOffset && tzOffset.match(reTzCorrectionLoose);

	if (!tzOffset) {
		return oldValue;
	}

	var sign = tzOffset[1] === '-' ? 1 : -1;
	var hours = +tzOffset[2];
	var minutes = +tzOffset[4];

	if (!tzOffset[4] && !tzOffset[3]) {
		minutes = Math.floor(hours % 100);
		hours = Math.floor(hours / 100);
	}

	return sign * (hours * 60 + minutes);
}

var formats = {
	yesterday: {
		regex: /^yesterday/i,
		name: 'yesterday',
		callback: function callback() {
			this.rd -= 1;
			return this.resetTime();
		}
	},

	now: {
		regex: /^now/i,
		name: 'now'
		// do nothing
	},

	noon: {
		regex: /^noon/i,
		name: 'noon',
		callback: function callback() {
			return this.resetTime() && this.time(12, 0, 0, 0);
		}
	},

	midnightOrToday: {
		regex: /^(midnight|today)/i,
		name: 'midnight | today',
		callback: function callback() {
			return this.resetTime();
		}
	},

	tomorrow: {
		regex: /^tomorrow/i,
		name: 'tomorrow',
		callback: function callback() {
			this.rd += 1;
			return this.resetTime();
		}
	},

	timestamp: {
		regex: /^@(-?\d+)/i,
		name: 'timestamp',
		callback: function callback(match, timestamp) {
			this.rs += +timestamp;
			this.y = 1970;
			this.m = 0;
			this.d = 1;
			this.dates = 0;

			return this.resetTime() && this.zone(0);
		}
	},

	firstOrLastDay: {
		regex: /^(first|last) day of/i,
		name: 'firstdayof | lastdayof',
		callback: function callback(match, day) {
			if (day.toLowerCase() === 'first') {
				this.firstOrLastDayOfMonth = 1;
			} else {
				this.firstOrLastDayOfMonth = -1;
			}
		}
	},

	backOrFrontOf: {
		regex: RegExp('^(back|front) of ' + reHour24 + reSpaceOpt + reMeridian + '?', 'i'),
		name: 'backof | frontof',
		callback: function callback(match, side, hours, meridian) {
			var back = side.toLowerCase() === 'back';
			var hour = +hours;
			var minute = 15;

			if (!back) {
				hour -= 1;
				minute = 45;
			}

			hour = processMeridian(hour, meridian);

			return this.resetTime() && this.time(hour, minute, 0, 0);
		}
	},

	weekdayOf: {
		regex: RegExp('^(' + reReltextnumber + '|' + reReltexttext + ')' + reSpace + '(' + reDayfull + '|' + reDayabbr + ')' + reSpace + 'of', 'i'),
		name: 'weekdayof'
		// todo
	},

	mssqltime: {
		regex: RegExp('^' + reHour12 + ':' + reMinutelz + ':' + reSecondlz + '[:.]([0-9]+)' + reMeridian, 'i'),
		name: 'mssqltime',
		callback: function callback(match, hour, minute, second, frac, meridian) {
			return this.time(processMeridian(+hour, meridian), +minute, +second, +frac.substr(0, 3));
		}
	},

	timeLong12: {
		regex: RegExp('^' + reHour12 + '[:.]' + reMinute + '[:.]' + reSecondlz + reSpaceOpt + reMeridian, 'i'),
		name: 'timelong12',
		callback: function callback(match, hour, minute, second, meridian) {
			return this.time(processMeridian(+hour, meridian), +minute, +second, 0);
		}
	},

	timeShort12: {
		regex: RegExp('^' + reHour12 + '[:.]' + reMinutelz + reSpaceOpt + reMeridian, 'i'),
		name: 'timeshort12',
		callback: function callback(match, hour, minute, meridian) {
			return this.time(processMeridian(+hour, meridian), +minute, 0, 0);
		}
	},

	timeTiny12: {
		regex: RegExp('^' + reHour12 + reSpaceOpt + reMeridian, 'i'),
		name: 'timetiny12',
		callback: function callback(match, hour, meridian) {
			return this.time(processMeridian(+hour, meridian), 0, 0, 0);
		}
	},

	soap: {
		regex: RegExp('^' + reYear4 + '-' + reMonthlz + '-' + reDaylz + 'T' + reHour24lz + ':' + reMinutelz + ':' + reSecondlz + reFrac + reTzCorrection + '?', 'i'),
		name: 'soap',
		callback: function callback(match, year, month, day, hour, minute, second, frac, tzCorrection) {
			return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, +frac.substr(0, 3)) && this.zone(processTzCorrection(tzCorrection));
		}
	},

	wddx: {
		regex: RegExp('^' + reYear4 + '-' + reMonth + '-' + reDay + 'T' + reHour24 + ':' + reMinute + ':' + reSecond),
		name: 'wddx',
		callback: function callback(match, year, month, day, hour, minute, second) {
			return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0);
		}
	},

	exif: {
		regex: RegExp('^' + reYear4 + ':' + reMonthlz + ':' + reDaylz + ' ' + reHour24lz + ':' + reMinutelz + ':' + reSecondlz, 'i'),
		name: 'exif',
		callback: function callback(match, year, month, day, hour, minute, second) {
			return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0);
		}
	},

	xmlRpc: {
		regex: RegExp('^' + reYear4 + reMonthlz + reDaylz + 'T' + reHour24 + ':' + reMinutelz + ':' + reSecondlz),
		name: 'xmlrpc',
		callback: function callback(match, year, month, day, hour, minute, second) {
			return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0);
		}
	},

	xmlRpcNoColon: {
		regex: RegExp('^' + reYear4 + reMonthlz + reDaylz + '[Tt]' + reHour24 + reMinutelz + reSecondlz),
		name: 'xmlrpcnocolon',
		callback: function callback(match, year, month, day, hour, minute, second) {
			return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0);
		}
	},

	clf: {
		regex: RegExp('^' + reDay + '/(' + reMonthAbbr + ')/' + reYear4 + ':' + reHour24lz + ':' + reMinutelz + ':' + reSecondlz + reSpace + reTzCorrection, 'i'),
		name: 'clf',
		callback: function callback(match, day, month, year, hour, minute, second, tzCorrection) {
			return this.ymd(+year, lookupMonth(month), +day) && this.time(+hour, +minute, +second, 0) && this.zone(processTzCorrection(tzCorrection));
		}
	},

	iso8601long: {
		regex: RegExp('^t?' + reHour24 + '[:.]' + reMinute + '[:.]' + reSecond + reFrac, 'i'),
		name: 'iso8601long',
		callback: function callback(match, hour, minute, second, frac) {
			return this.time(+hour, +minute, +second, +frac.substr(0, 3));
		}
	},

	dateTextual: {
		regex: RegExp('^' + reMonthText + '[ .\\t-]*' + reDay + '[,.stndrh\\t ]+' + reYear, 'i'),
		name: 'datetextual',
		callback: function callback(match, month, day, year) {
			return this.ymd(processYear(year), lookupMonth(month), +day);
		}
	},

	pointedDate4: {
		regex: RegExp('^' + reDay + '[.\\t-]' + reMonth + '[.-]' + reYear4),
		name: 'pointeddate4',
		callback: function callback(match, day, month, year) {
			return this.ymd(+year, month - 1, +day);
		}
	},

	pointedDate2: {
		regex: RegExp('^' + reDay + '[.\\t]' + reMonth + '\\.' + reYear2),
		name: 'pointeddate2',
		callback: function callback(match, day, month, year) {
			return this.ymd(processYear(year), month - 1, +day);
		}
	},

	timeLong24: {
		regex: RegExp('^t?' + reHour24 + '[:.]' + reMinute + '[:.]' + reSecond),
		name: 'timelong24',
		callback: function callback(match, hour, minute, second) {
			return this.time(+hour, +minute, +second, 0);
		}
	},

	dateNoColon: {
		regex: RegExp('^' + reYear4 + reMonthlz + reDaylz),
		name: 'datenocolon',
		callback: function callback(match, year, month, day) {
			return this.ymd(+year, month - 1, +day);
		}
	},

	pgydotd: {
		regex: RegExp('^' + reYear4 + '\\.?' + reDayOfYear),
		name: 'pgydotd',
		callback: function callback(match, year, day) {
			return this.ymd(+year, 0, +day);
		}
	},

	timeShort24: {
		regex: RegExp('^t?' + reHour24 + '[:.]' + reMinute, 'i'),
		name: 'timeshort24',
		callback: function callback(match, hour, minute) {
			return this.time(+hour, +minute, 0, 0);
		}
	},

	iso8601noColon: {
		regex: RegExp('^t?' + reHour24lz + reMinutelz + reSecondlz, 'i'),
		name: 'iso8601nocolon',
		callback: function callback(match, hour, minute, second) {
			return this.time(+hour, +minute, +second, 0);
		}
	},

	iso8601dateSlash: {
		// eventhough the trailing slash is optional in PHP
		// here it's mandatory and inputs without the slash
		// are handled by dateslash
		regex: RegExp('^' + reYear4 + '/' + reMonthlz + '/' + reDaylz + '/'),
		name: 'iso8601dateslash',
		callback: function callback(match, year, month, day) {
			return this.ymd(+year, month - 1, +day);
		}
	},

	dateSlash: {
		regex: RegExp('^' + reYear4 + '/' + reMonth + '/' + reDay),
		name: 'dateslash',
		callback: function callback(match, year, month, day) {
			return this.ymd(+year, month - 1, +day);
		}
	},

	american: {
		regex: RegExp('^' + reMonth + '/' + reDay + '/' + reYear),
		name: 'american',
		callback: function callback(match, month, day, year) {
			return this.ymd(processYear(year), month - 1, +day);
		}
	},

	americanShort: {
		regex: RegExp('^' + reMonth + '/' + reDay),
		name: 'americanshort',
		callback: function callback(match, month, day) {
			return this.ymd(this.y, month - 1, +day);
		}
	},

	gnuDateShortOrIso8601date2: {
		// iso8601date2 is complete subset of gnudateshort
		regex: RegExp('^' + reYear + '-' + reMonth + '-' + reDay),
		name: 'gnudateshort | iso8601date2',
		callback: function callback(match, year, month, day) {
			return this.ymd(processYear(year), month - 1, +day);
		}
	},

	iso8601date4: {
		regex: RegExp('^' + reYear4withSign + '-' + reMonthlz + '-' + reDaylz),
		name: 'iso8601date4',
		callback: function callback(match, year, month, day) {
			return this.ymd(+year, month - 1, +day);
		}
	},

	gnuNoColon: {
		regex: RegExp('^t?' + reHour24lz + reMinutelz, 'i'),
		name: 'gnunocolon',
		callback: function callback(match, hour, minute) {
			// this rule is a special case
			// if time was already set once by any preceding rule, it sets the captured value as year
			switch (this.times) {
				case 0:
					return this.time(+hour, +minute, 0, this.f);
				case 1:
					this.y = hour * 100 + +minute;
					this.times++;

					return true;
				default:
					return false;
			}
		}
	},

	gnuDateShorter: {
		regex: RegExp('^' + reYear4 + '-' + reMonth),
		name: 'gnudateshorter',
		callback: function callback(match, year, month) {
			return this.ymd(+year, month - 1, 1);
		}
	},

	pgTextReverse: {
		// note: allowed years are from 32-9999
		// years below 32 should be treated as days in datefull
		regex: RegExp('^' + '(\\d{3,4}|[4-9]\\d|3[2-9])-(' + reMonthAbbr + ')-' + reDaylz, 'i'),
		name: 'pgtextreverse',
		callback: function callback(match, year, month, day) {
			return this.ymd(processYear(year), lookupMonth(month), +day);
		}
	},

	dateFull: {
		regex: RegExp('^' + reDay + '[ \\t.-]*' + reMonthText + '[ \\t.-]*' + reYear, 'i'),
		name: 'datefull',
		callback: function callback(match, day, month, year) {
			return this.ymd(processYear(year), lookupMonth(month), +day);
		}
	},

	dateNoDay: {
		regex: RegExp('^' + reMonthText + '[ .\\t-]*' + reYear4, 'i'),
		name: 'datenoday',
		callback: function callback(match, month, year) {
			return this.ymd(+year, lookupMonth(month), 1);
		}
	},

	dateNoDayRev: {
		regex: RegExp('^' + reYear4 + '[ .\\t-]*' + reMonthText, 'i'),
		name: 'datenodayrev',
		callback: function callback(match, year, month) {
			return this.ymd(+year, lookupMonth(month), 1);
		}
	},

	pgTextShort: {
		regex: RegExp('^(' + reMonthAbbr + ')-' + reDaylz + '-' + reYear, 'i'),
		name: 'pgtextshort',
		callback: function callback(match, month, day, year) {
			return this.ymd(processYear(year), lookupMonth(month), +day);
		}
	},

	dateNoYear: {
		regex: RegExp('^' + reDateNoYear, 'i'),
		name: 'datenoyear',
		callback: function callback(match, month, day) {
			return this.ymd(this.y, lookupMonth(month), +day);
		}
	},

	dateNoYearRev: {
		regex: RegExp('^' + reDay + '[ .\\t-]*' + reMonthText, 'i'),
		name: 'datenoyearrev',
		callback: function callback(match, day, month) {
			return this.ymd(this.y, lookupMonth(month), +day);
		}
	},

	isoWeekDay: {
		regex: RegExp('^' + reYear4 + '-?W' + reWeekOfYear + '(?:-?([0-7]))?'),
		name: 'isoweekday | isoweek',
		callback: function callback(match, year, week, day) {
			day = day ? +day : 1;

			if (!this.ymd(+year, 0, 1)) {
				return false;
			}

			// get day of week for Jan 1st
			var dayOfWeek = new Date(this.y, this.m, this.d).getDay();

			// and use the day to figure out the offset for day 1 of week 1
			dayOfWeek = 0 - (dayOfWeek > 4 ? dayOfWeek - 7 : dayOfWeek);

			this.rd += dayOfWeek + (week - 1) * 7 + day;
		}
	},

	relativeText: {
		regex: RegExp('^(' + reReltextnumber + '|' + reReltexttext + ')' + reSpace + '(' + reReltextunit + ')', 'i'),
		name: 'relativetext',
		callback: function callback(match, relValue, relUnit) {
			// todo: implement handling of 'this time-unit'
			// eslint-disable-next-line no-unused-vars
			var _lookupRelative = lookupRelative(relValue),
				amount = _lookupRelative.amount,
				behavior = _lookupRelative.behavior;

			switch (relUnit.toLowerCase()) {
				case 'sec':
				case 'secs':
				case 'second':
				case 'seconds':
					this.rs += amount;
					break;
				case 'min':
				case 'mins':
				case 'minute':
				case 'minutes':
					this.ri += amount;
					break;
				case 'hour':
				case 'hours':
					this.rh += amount;
					break;
				case 'day':
				case 'days':
					this.rd += amount;
					break;
				case 'fortnight':
				case 'fortnights':
				case 'forthnight':
				case 'forthnights':
					this.rd += amount * 14;
					break;
				case 'week':
				case 'weeks':
					this.rd += amount * 7;
					break;
				case 'month':
				case 'months':
					this.rm += amount;
					break;
				case 'year':
				case 'years':
					this.ry += amount;
					break;
				case 'mon':
				case 'monday':
				case 'tue':
				case 'tuesday':
				case 'wed':
				case 'wednesday':
				case 'thu':
				case 'thursday':
				case 'fri':
				case 'friday':
				case 'sat':
				case 'saturday':
				case 'sun':
				case 'sunday':
					this.resetTime();
					this.weekday = lookupWeekday(relUnit, 7);
					this.weekdayBehavior = 1;
					this.rd += (amount > 0 ? amount - 1 : amount) * 7;
					break;
				case 'weekday':
				case 'weekdays':
					// todo
					break;
			}
		}
	},

	relative: {
		regex: RegExp('^([+-]*)[ \\t]*(\\d+)' + reSpaceOpt + '(' + reReltextunit + '|week)', 'i'),
		name: 'relative',
		callback: function callback(match, signs, relValue, relUnit) {
			var minuses = signs.replace(/[^-]/g, '').length;

			var amount = +relValue * Math.pow(-1, minuses);

			switch (relUnit.toLowerCase()) {
				case 'sec':
				case 'secs':
				case 'second':
				case 'seconds':
					this.rs += amount;
					break;
				case 'min':
				case 'mins':
				case 'minute':
				case 'minutes':
					this.ri += amount;
					break;
				case 'hour':
				case 'hours':
					this.rh += amount;
					break;
				case 'day':
				case 'days':
					this.rd += amount;
					break;
				case 'fortnight':
				case 'fortnights':
				case 'forthnight':
				case 'forthnights':
					this.rd += amount * 14;
					break;
				case 'week':
				case 'weeks':
					this.rd += amount * 7;
					break;
				case 'month':
				case 'months':
					this.rm += amount;
					break;
				case 'year':
				case 'years':
					this.ry += amount;
					break;
				case 'mon':
				case 'monday':
				case 'tue':
				case 'tuesday':
				case 'wed':
				case 'wednesday':
				case 'thu':
				case 'thursday':
				case 'fri':
				case 'friday':
				case 'sat':
				case 'saturday':
				case 'sun':
				case 'sunday':
					this.resetTime();
					this.weekday = lookupWeekday(relUnit, 7);
					this.weekdayBehavior = 1;
					this.rd += (amount > 0 ? amount - 1 : amount) * 7;
					break;
				case 'weekday':
				case 'weekdays':
					// todo
					break;
			}
		}
	},

	dayText: {
		regex: RegExp('^(' + reDaytext + ')', 'i'),
		name: 'daytext',
		callback: function callback(match, dayText) {
			this.resetTime();
			this.weekday = lookupWeekday(dayText, 0);

			if (this.weekdayBehavior !== 2) {
				this.weekdayBehavior = 1;
			}
		}
	},

	relativeTextWeek: {
		regex: RegExp('^(' + reReltexttext + ')' + reSpace + 'week', 'i'),
		name: 'relativetextweek',
		callback: function callback(match, relText) {
			this.weekdayBehavior = 2;

			switch (relText.toLowerCase()) {
				case 'this':
					this.rd += 0;
					break;
				case 'next':
					this.rd += 7;
					break;
				case 'last':
				case 'previous':
					this.rd -= 7;
					break;
			}

			if (isNaN(this.weekday)) {
				this.weekday = 1;
			}
		}
	},

	monthFullOrMonthAbbr: {
		regex: RegExp('^(' + reMonthFull + '|' + reMonthAbbr + ')', 'i'),
		name: 'monthfull | monthabbr',
		callback: function callback(match, month) {
			return this.ymd(this.y, lookupMonth(month), this.d);
		}
	},

	tzCorrection: {
		regex: RegExp('^' + reTzCorrection, 'i'),
		name: 'tzcorrection',
		callback: function callback(tzCorrection) {
			return this.zone(processTzCorrection(tzCorrection));
		}
	},

	ago: {
		regex: /^ago/i,
		name: 'ago',
		callback: function callback() {
			this.ry = -this.ry;
			this.rm = -this.rm;
			this.rd = -this.rd;
			this.rh = -this.rh;
			this.ri = -this.ri;
			this.rs = -this.rs;
			this.rf = -this.rf;
		}
	},

	year4: {
		regex: RegExp('^' + reYear4),
		name: 'year4',
		callback: function callback(match, year) {
			this.y = +year;
			return true;
		}
	},

	whitespace: {
		regex: /^[ .,\t]+/,
		name: 'whitespace'
		// do nothing
	},

	dateShortWithTimeLong: {
		regex: RegExp('^' + reDateNoYear + 't?' + reHour24 + '[:.]' + reMinute + '[:.]' + reSecond, 'i'),
		name: 'dateshortwithtimelong',
		callback: function callback(match, month, day, hour, minute, second) {
			return this.ymd(this.y, lookupMonth(month), +day) && this.time(+hour, +minute, +second, 0);
		}
	},

	dateShortWithTimeLong12: {
		regex: RegExp('^' + reDateNoYear + reHour12 + '[:.]' + reMinute + '[:.]' + reSecondlz + reSpaceOpt + reMeridian, 'i'),
		name: 'dateshortwithtimelong12',
		callback: function callback(match, month, day, hour, minute, second, meridian) {
			return this.ymd(this.y, lookupMonth(month), +day) && this.time(processMeridian(+hour, meridian), +minute, +second, 0);
		}
	},

	dateShortWithTimeShort: {
		regex: RegExp('^' + reDateNoYear + 't?' + reHour24 + '[:.]' + reMinute, 'i'),
		name: 'dateshortwithtimeshort',
		callback: function callback(match, month, day, hour, minute) {
			return this.ymd(this.y, lookupMonth(month), +day) && this.time(+hour, +minute, 0, 0);
		}
	},

	dateShortWithTimeShort12: {
		regex: RegExp('^' + reDateNoYear + reHour12 + '[:.]' + reMinutelz + reSpaceOpt + reMeridian, 'i'),
		name: 'dateshortwithtimeshort12',
		callback: function callback(match, month, day, hour, minute, meridian) {
			return this.ymd(this.y, lookupMonth(month), +day) && this.time(processMeridian(+hour, meridian), +minute, 0, 0);
		}
	}
};

var resultProto = {
	// date
	y: NaN,
	m: NaN,
	d: NaN,
	// time
	h: NaN,
	i: NaN,
	s: NaN,
	f: NaN,

	// relative shifts
	ry: 0,
	rm: 0,
	rd: 0,
	rh: 0,
	ri: 0,
	rs: 0,
	rf: 0,

	// weekday related shifts
	weekday: NaN,
	weekdayBehavior: 0,

	// first or last day of month
	// 0 none, 1 first, -1 last
	firstOrLastDayOfMonth: 0,

	// timezone correction in minutes
	z: NaN,

	// counters
	dates: 0,
	times: 0,
	zones: 0,

	// helper functions
	ymd: function ymd(y, m, d) {
		if (this.dates > 0) {
			return false;
		}

		this.dates++;
		this.y = y;
		this.m = m;
		this.d = d;
		return true;
	},
	time: function time(h, i, s, f) {
		if (this.times > 0) {
			return false;
		}

		this.times++;
		this.h = h;
		this.i = i;
		this.s = s;
		this.f = f;

		return true;
	},
	resetTime: function resetTime() {
		this.h = 0;
		this.i = 0;
		this.s = 0;
		this.f = 0;
		this.times = 0;

		return true;
	},
	zone: function zone(minutes) {
		if (this.zones <= 1) {
			this.zones++;
			this.z = minutes;
			return true;
		}

		return false;
	},
	toDate: function toDate(relativeTo) {
		if (this.dates && !this.times) {
			this.h = this.i = this.s = this.f = 0;
		}

		// fill holes
		if (isNaN(this.y)) {
			this.y = relativeTo.getFullYear();
		}

		if (isNaN(this.m)) {
			this.m = relativeTo.getMonth();
		}

		if (isNaN(this.d)) {
			this.d = relativeTo.getDate();
		}

		if (isNaN(this.h)) {
			this.h = relativeTo.getHours();
		}

		if (isNaN(this.i)) {
			this.i = relativeTo.getMinutes();
		}

		if (isNaN(this.s)) {
			this.s = relativeTo.getSeconds();
		}

		if (isNaN(this.f)) {
			this.f = relativeTo.getMilliseconds();
		}

		// adjust special early
		switch (this.firstOrLastDayOfMonth) {
			case 1:
				this.d = 1;
				break;
			case -1:
				this.d = 0;
				this.m += 1;
				break;
		}

		if (!isNaN(this.weekday)) {
			var date = new Date(relativeTo.getTime());
			date.setFullYear(this.y, this.m, this.d);
			date.setHours(this.h, this.i, this.s, this.f);

			var dow = date.getDay();

			if (this.weekdayBehavior === 2) {
				// To make "this week" work, where the current day of week is a "sunday"
				if (dow === 0 && this.weekday !== 0) {
					this.weekday = -6;
				}

				// To make "sunday this week" work, where the current day of week is not a "sunday"
				if (this.weekday === 0 && dow !== 0) {
					this.weekday = 7;
				}

				this.d -= dow;
				this.d += this.weekday;
			} else {
				var diff = this.weekday - dow;

				// some PHP magic
				if (this.rd < 0 && diff < 0 || this.rd >= 0 && diff <= -this.weekdayBehavior) {
					diff += 7;
				}

				if (this.weekday >= 0) {
					this.d += diff;
				} else {
					this.d -= 7 - (Math.abs(this.weekday) - dow);
				}

				this.weekday = NaN;
			}
		}

		// adjust relative
		this.y += this.ry;
		this.m += this.rm;
		this.d += this.rd;

		this.h += this.rh;
		this.i += this.ri;
		this.s += this.rs;
		this.f += this.rf;

		this.ry = this.rm = this.rd = 0;
		this.rh = this.ri = this.rs = this.rf = 0;

		var result = new Date(relativeTo.getTime());
		// since Date constructor treats years <= 99 as 1900+
		// it can't be used, thus this weird way
		result.setFullYear(this.y, this.m, this.d);
		result.setHours(this.h, this.i, this.s, this.f);

		// note: this is done twice in PHP
		// early when processing special relatives
		// and late
		// todo: check if the logic can be reduced
		// to just one time action
		switch (this.firstOrLastDayOfMonth) {
			case 1:
				result.setDate(1);
				break;
			case -1:
				result.setMonth(result.getMonth() + 1, 0);
				break;
		}

		// adjust timezone
		if (!isNaN(this.z) && result.getTimezoneOffset() !== this.z) {
			result.setUTCFullYear(result.getFullYear(), result.getMonth(), result.getDate());

			result.setUTCHours(result.getHours(), result.getMinutes() + this.z, result.getSeconds(), result.getMilliseconds());
		}

		return result;
	}
};

module.exports = function toTime(str, now) {
	//       discuss at: https://locutus.io/php/toTime/
	//      original by: Caio Ariede (https://caioariede.com)
	//      improved by: Kevin van Zonneveld (https://kvz.io)
	//      improved by: Caio Ariede (https://caioariede.com)
	//      improved by: A. Matías Quezada (https://amatiasq.com)
	//      improved by: preuter
	//      improved by: Brett Zamir (https://brett-zamir.me)
	//      improved by: Mirko Faber
	//         input by: David
	//      bugfixed by: Wagner B. Soares
	//      bugfixed by: Artur Tchernychev
	//      bugfixed by: Stephan Bösch-Plepelits (https://github.com/plepe)
	// reimplemented by: Rafał Kukawski
	//           note 1: Examples all have a fixed timestamp to prevent
	//           note 1: tests to fail because of variable time(zones)
	//        example 1: toTime('+1 day', 1129633200)
	//        returns 1: 1129719600
	//        example 2: toTime('+1 week 2 days 4 hours 2 seconds', 1129633200)
	//        returns 2: 1130425202
	//        example 3: toTime('last month', 1129633200)
	//        returns 3: 1127041200
	//        example 4: toTime('2009-05-04 08:30:00+00')
	//        returns 4: 1241425800
	//        example 5: toTime('2009-05-04 08:30:00+02:00')
	//        returns 5: 1241418600

	if (now == null) {
		now = Math.floor(Date.now() / 1000);
	}

	// the rule order is important
	// if multiple rules match, the longest match wins
	// if multiple rules match the same string, the first match wins
	var rules = [formats.yesterday, formats.now, formats.noon, formats.midnightOrToday, formats.tomorrow, formats.timestamp, formats.firstOrLastDay, formats.backOrFrontOf,
		// formats.weekdayOf, // not yet implemented
		formats.timeTiny12, formats.timeShort12, formats.timeLong12, formats.mssqltime, formats.timeShort24, formats.timeLong24, formats.iso8601long, formats.gnuNoColon, formats.iso8601noColon, formats.americanShort, formats.american, formats.iso8601date4, formats.iso8601dateSlash, formats.dateSlash, formats.gnuDateShortOrIso8601date2, formats.gnuDateShorter, formats.dateFull, formats.pointedDate4, formats.pointedDate2, formats.dateNoDay, formats.dateNoDayRev, formats.dateTextual, formats.dateNoYear, formats.dateNoYearRev, formats.dateNoColon, formats.xmlRpc, formats.xmlRpcNoColon, formats.soap, formats.wddx, formats.exif, formats.pgydotd, formats.isoWeekDay, formats.pgTextShort, formats.pgTextReverse, formats.clf, formats.year4, formats.ago, formats.dayText, formats.relativeTextWeek, formats.relativeText, formats.monthFullOrMonthAbbr, formats.tzCorrection, formats.dateShortWithTimeShort12, formats.dateShortWithTimeLong12, formats.dateShortWithTimeShort, formats.dateShortWithTimeLong, formats.relative, formats.whitespace];

	var result = Object.create(resultProto);

	while (str.length) {
		var longestMatch = null;
		var finalRule = null;

		for (var i = 0, l = rules.length; i < l; i++) {
			var format = rules[i];

			var match = str.match(format.regex);

			if (match) {
				if (!longestMatch || match[0].length > longestMatch[0].length) {
					longestMatch = match;
					finalRule = format;
				}
			}
		}

		if (!finalRule || finalRule.callback && finalRule.callback.apply(result, longestMatch) === false) {
			return false;
		}

		str = str.substr(longestMatch[0].length);
		finalRule = null;
		longestMatch = null;
	}

	return Math.floor(result.toDate(new Date(now * 1000)) / 1000);
};
},{}],46:[function(require,module,exports){
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
},{"./inArray":13}],47:[function(require,module,exports){
var toTime = require('./toTime');

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
		date = toTime(date);
		return isNaN(date) || date === false ? NaN : date;
	}

	if (String(date).length === 14) { // mysql timestamp format of YYYYMMDDHHMMSS
		date = String(date);
		return Math.floor((new Date(date.substr(0, 4), date.substr(4, 2) - 1, date.substr(6, 2), date.substr(8, 2), date.substr(10, 2)).getTime() / divisor));
	}

	return isNaN(date) || date === Infinity ? NaN : ~~date;
}

module.exports = toUnixTime;
},{"./toTime":45}],48:[function(require,module,exports){
function toUpperCase(s, option, preserveCase) {
	option = option != null ? option : null;
	s = preserveCase || preserveCase == null ? String(s) : String(s).toLowerCase();

	if (['first', false, 0, '0'].indexOf(option) > -1) {
		var first = s.charAt(0).toUpperCase();
		var rest = s.slice(1);

		return first + rest;
	}

	if (['words', true, 1, '1'].indexOf(option) > -1) {

		return s.replace(/^(.)|\s+(.)/g, function ($1) {
			return $1.toUpperCase();
		});
	}

	return s.toUpperCase();
}

module.exports = toUpperCase;
},{}],49:[function(require,module,exports){
var isObject = require('./isObject');

function truncate(input, condition, suffix) {
	input = isObject(input) ? JSON.stringify(input) : String(input);
	suffix = typeof suffix != 'undefined' ? suffix : '&hellip;';
	if (condition instanceof Function) {
		condition = condition(input, suffix);
	}

	return (input.length > condition) ? input.slice(0, condition) + suffix : input;
};

module.exports = truncate;
},{"./isObject":24}]},{},[1]);
