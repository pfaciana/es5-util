const isInteger = require('./../js/isInteger');

const associativeArray = [];
associativeArray['a'] = 1;
associativeArray['b'] = 2;
associativeArray['c'] = 3;
associativeArray['3'] = 4;

const Foo = function (x, y, z) {
	this.a = 1;
	this.b = 2;
};

Foo.prototype.c = 3;
Foo.prototype['3'] = 4;

const table = [
	['undefined', undefined, false],
	['null', null, false],
	['true', true, false],
	['false', false, false],
	['empty number', 0, true],
	['non-empty number', 1, true],
	['non-empty number 2', 2, true],
	['empty float', 0.0, true],
	['non-empty float', 1.1, false],
	['Infinity', Infinity, false],
	['empty number string', '0', false],
	['non-empty number string', '1', false],
	['non-empty number string int', ' 2 ', false],
	['non-empty number string float', ' 3.4 ', false],
	['empty string', '', false],
	['non-empty string', 'abc', false],
	['empty array', [], false],
	['non-empty array', [1, 2, 3], false],
	['non-empty associative array', associativeArray, false],
	['empty object', {}, false],
	['non-empty object', {a: 1, b: 2, c: 3}, false],
	['function', Foo, false],
	['class', new Foo, false],
];

test.each(table)(
	'%s: isInteger(%j)',
	(message, input, expected) => {
		expect(isInteger(input)).toStrictEqual(expected);
	},
);