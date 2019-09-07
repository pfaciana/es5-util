const isEmptyLoose = require('./../js/isEmptyLoose');

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
	['undefined', undefined, true],
	['null', null, true],
	['true', true, false],
	['false', false, true],
	['empty number', 0, true],
	['non-empty number', 1, false],
	['non-empty number 2', 2, false],
	['empty float', 0.0, true],
	['non-empty float', 1.1, false],
	['Infinity', Infinity, false],
	['undefined string', 'undefined', true],
	['null string', 'null', true],
	['true string', 'true', false],
	['false string', 'false', true],
	['empty number string', '0', true],
	['non-empty number string', '1', false],
	['non-empty number string int', ' 2 ', false],
	['non-empty number string float', ' 3.4 ', false],
	['empty string', '', true],
	['non-empty string', 'abc', false],
	['empty array', [], true],
	['non-empty array', [1, 2, 3], false],
	['non-empty associative array', associativeArray, false],
	['empty object', {}, true],
	['non-empty object', {a: 1, b: 2, c: 3}, false],
	['function', Foo, false],
	['class', new Foo, false],
];

expect(isEmptyLoose()).toStrictEqual(true);

test.each(table)(
	'%s: isEmptyLoose(%j)',
	(message, input, expected) => {
		expect(isEmptyLoose(input)).toStrictEqual(expected);
	},
);