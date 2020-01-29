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
	// Scalars
	['null string', 'null', null, true],
	['true string', 'true', true, true],
	['false string', 'false', false, true],
	['empty number string', '0', 0, true],
	['non-empty number string', '1', 1, true],
	['non-empty number string int', ' 2 ', 2, true],
	['non-empty number string float', ' 3.4 ', 3.4, true],
	['empty string', '', '', true],
	['non-empty string', 'abc', 'abc', true],
	['undefined', undefined, undefined, true],
	['null', null, null, true],
	['true', true, true, true],
	['false', false, false, true],
	['empty number', 0, 0, true],
	['non-empty number', 1, 1, true],
	['non-empty number 2', 2, 2, true],
	['empty float', 0.0, 0.0, true],
	['non-empty float', 1.1, 1.1, true],
	// Arrays
	['empty array string', '[]', []],
	['non-empty array string', '[1,2,3]', [1, 2, 3]],
	['empty array', [], []],
	['non-empty array', [1, 2, 3], [1, 2, 3]],
	['non-empty associative array', associativeArray, associativeArray],
	// Objects
	['empty object string', '{}', {}],
	['non-empty object string', '{"a":1,"b":2,"c":3}', {a: 1, b: 2, c: 3}],
	['empty object', {}, {}],
	['non-empty object', {a: 1, b: 2, c: 3}, {a: 1, b: 2, c: 3}],
	// Functions
	['function', Foo, Foo],
	['class', new Foo, new Foo],
];

test.each(table)(
	'%s: safeParse(%j)',
	(message, input, expected, preserveScalarType = false) => {
		expect(safeParse(input)).toStrictEqual(expected);
		expect(safeParse(input, false)).toStrictEqual(preserveScalarType ? input : expected);
	},
);