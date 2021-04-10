const toUnixTime = require('./../js/toUnixTime');

const associativeArray = [];
associativeArray['a'] = 1;
associativeArray['b'] = 2;
associativeArray['c'] = 3;
associativeArray['3'] = 4;

const Foo = function () {
	this.a = 1;
	this.b = 2;
};

Foo.prototype.c = 3;
Foo.prototype['3'] = 4;

const tableTimezone = [
	['New Years 1970', '19700101000000', undefined, 0],
	['New Years 2000', '20000101000000', undefined, 946684800],
	['New Years 2020', '20200101000000', undefined, 1577836800],
	['Random Date', '19820723211223', undefined, 396306743],
	['now', 'now', undefined, ~~(new Date().getTime() / 1000)],
	['tomorrow', 'tomorrow', undefined, ~~(new Date().getTime() / 1000) + 86400],
	['last week', 'last week', undefined, ~~(new Date().getTime() / 1000) - 604800],
	['YYYYMMDDHHMMSS', '19820724011215', undefined, 396321135],
	['YYYYMMDDHHMMSS JsMs', '19820724011215', true, 396321135000],
];

test.each(tableTimezone)(
	'%s: toString(%j)',
	(message, input, preserveJsMs, expected) => {
		expect(toUnixTime(input, preserveJsMs)).toBeCloseTo(expected, !isNaN(expected) ? (preserveJsMs ? -8 : -7) : undefined);
	},
);

const table = [
	['undefined', undefined, undefined, ~~(new Date().getTime() / 1000)],
	['null', null, undefined, ~~(new Date().getTime() / 1000)],
	['true', true, undefined, ~~(new Date().getTime() / 1000)],
	['false', false, undefined, ~~(new Date().getTime() / 1000)],
	['empty number', 0, undefined, 0],
	['non-empty number', 1, undefined, 1],
	['non-empty number 2', 2, undefined, 2],
	['negative number', -0, undefined, 0],
	['empty float', 0.0, undefined, 0],
	['non-empty float', 1.1, undefined, 1],
	['empty number string', '0', undefined, 0],
	['non-empty number string', '1', undefined, 1],
	['non-empty number string int', ' 2 ', undefined, 2],
	['non-empty number string float', ' 3.4 ', undefined, 3],
	['empty string', '', undefined, 0],
];

test.each(table)(
	'%s: toString(%j)',
	(message, input, preserveJsMs, expected) => {
		expect(toUnixTime(input, preserveJsMs)).toBeCloseTo(expected, !isNaN(expected) ? -1 : undefined);
	},
);

const tableMs = [
	['undefined', undefined, true, new Date().getTime()],
];

test.each(tableMs)(
	'%s: toString(%j)',
	(message, input, preserveJsMs, expected) => {
		expect(toUnixTime(input, preserveJsMs)).toBeCloseTo(expected, !isNaN(expected) ? -3 : undefined);
	},
);

const tableNaN = [
	['Infinity', Infinity, undefined, NaN],
	['non-empty string', 'abc', undefined, NaN],
	['empty array', [], undefined, NaN],
	['non-empty array', [1, 2, 3], undefined, NaN],
	['non-empty associative array', associativeArray, undefined, NaN],
	['empty object', {}, undefined, NaN],
	['non-empty object', {a: 1, b: 2, c: 3}, undefined, NaN],
	['function', Foo, undefined, NaN],
	['class', new Foo, undefined, NaN],
];

test.each(tableNaN)(
	'%s: toString(%j)',
	(message, input, preserveJsMs, expected) => {
		expect(toUnixTime(input, preserveJsMs)).toStrictEqual(expected, !isNaN(expected) ? -1 : undefined);
	},
);