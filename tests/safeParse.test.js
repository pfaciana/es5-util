const safeParse = require('./../js/safeParse');

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

const table = [
	['null string', 'null', null],
	['true string', 'true', true],
	['false string', 'false', false],
	['empty number string', '0', 0],
	['non-empty number string', '1', 1],
	['non-empty number string int', ' 2 ', 2],
	['non-empty number string float', ' 3.4 ', 3.4],
	['empty string', '', ''],
	['non-empty string', 'abc', 'abc'],
	['empty array string', '[]', []],
	['non-empty array string', '[1,2,3]', [1, 2, 3]],
	['empty object string', '{}', {}],
	['non-empty object string', '{"a":1,"b":2,"c":3}', {a: 1, b: 2, c: 3}],
	['undefined', undefined, undefined],
	['null', null, null],
	['true', true, true],
	['false', false, false],
	['empty number', 0, 0],
	['non-empty number', 1, 1],
	['non-empty number 2', 2, 2],
	['empty float', 0.0, 0.0],
	['non-empty float', 1.1, 1.1],
	['empty array', [], []],
	['non-empty array', [1, 2, 3], [1, 2, 3]],
	['non-empty associative array', associativeArray, associativeArray],
	['empty object', {}, {}],
	['non-empty object', {a: 1, b: 2, c: 3}, {a: 1, b: 2, c: 3}],
	['function', Foo, Foo],
	['class', new Foo, new Foo],
];

test.each(table)(
	'%s: safeParse(%j)',
	(message, input, expected) => {
		expect(safeParse(input)).toStrictEqual(expected);
	},
);