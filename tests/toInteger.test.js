const toInteger = require('./../js/toInteger');

const associativeArray = [];
associativeArray['a'] = 1;
associativeArray['b'] = 2;
associativeArray['c'] = 3;

const Foo = function () {
	this.a = 1;
	this.b = 2;
};

Foo.prototype.c = 3;

const table = [
	['undefined', undefined, 0],
	['null', null, 0],
	['true', true, 1],
	['false', false, 0],
	['empty number', 0, 0],
	['non-empty number', 1, 1],
	['non-empty number 2', 2, 2],
	['empty float', 0.0, 0],
	['non-empty float', 1.1, 1],
	['Infinity', Infinity, 1.7976931348623157e+308],
	['empty number string', '0', 0],
	['non-empty number string', '1', 1],
	['non-empty number string int', ' 2 ', 2],
	['non-empty number string float', ' 3.4 ', 3],
	['empty string', '', 0],
	['non-empty string', 'abc', 0],
	['empty array', [], 0],
	['non-empty array', [1, 2, 3], 0],
	['non-empty associative array', associativeArray, 0],
	['empty object', {}, 0],
	['non-empty object', {a: 1, b: 2, c: 3}, 0],
	['function', Foo, 0],
	['class', new Foo, 0],
];

test.each(table)(
	'%s: toInteger(%j)',
	(message, input, expected) => {
		expect(toInteger(input)).toStrictEqual(expected);
	},
);