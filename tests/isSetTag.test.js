const isSetTag = require('./../js/isSetTag');

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
	['true', true, true],
	['false', false, true],
	['empty number', 0, true],
	['non-empty number', 1, true],
	['non-empty number 2', 2, true],
	['empty float', 0.0, true],
	['non-empty float', 1.1, true],
	['Infinity', Infinity, true],
	['undefined string', 'undefined', false],
	['null string', 'null', false],
	['true string', 'true', true],
	['false string', 'false', true],
	['empty number string', '0', true],
	['non-empty number string', '1', true],
	['non-empty number string int', ' 2 ', true],
	['non-empty number string float', ' 3.4 ', true],
	['empty string', '', false],
	['non-empty string', 'abc', true],
	['empty array', [], true],
	['non-empty array', [1, 2, 3], true],
	['non-empty associative array', associativeArray, true],
	['empty object', {}, true],
	['non-empty object', {a: 1, b: 2, c: 3}, true],
	['function', Foo, true],
	['class', new Foo, true],
];

expect(isSetTag()).toStrictEqual(false);

test.each(table)(
	'%s: isSetTag(%j)',
	(message, input, expected) => {
		expect(isSetTag(input)).toStrictEqual(expected);
	},
);