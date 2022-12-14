const safeStringify = require('./../js/safeStringify');

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
	['undefined', undefined, undefined],
	['null', null, 'null'],
	['true', true, 'true'],
	['false', false, 'false'],
	['empty number', 0, '0'],
	['non-empty number', 1, '1'],
	['non-empty number 2', 2, '2'],
	['empty float', 0.0, '0'],
	['non-empty float', 1.1, '1.1'],
	['negative number', -0, '-0'],
	['negative number', -0.0, '-0'],
	['Infinity', Infinity, 'Infinity'],
	['Infinity', NaN, 'NaN'],
	['empty number string', '0', '0'],
	['non-empty number string', '1', '1'],
	['non-empty number string int', ' 2 ', ' 2 '],
	['non-empty number string float', ' 3.4 ', ' 3.4 '],
	['empty string', '', ''],
	['non-empty string', 'abc', 'abc'],
	['empty array', [], '[]'],
	['non-empty array', [1, 2, 3], '[1,2,3]'],
	['non-empty associative array', associativeArray, '[null,null,null,4]'],
	['empty object', {}, '{}'],
	['non-empty object', {a: 1, b: 2, c: 3}, '{"a":1,"b":2,"c":3}'],
	['function', Foo, undefined],
	['class', new Foo, '{"a":1,"b":2}'],
];

test.each(table)(
	'%s: safeStringify(%j)',
	(message, input, expected) => {
		expect(safeStringify(input)).toStrictEqual(expected);
	},
);

const tableForce = [
	['undefined', undefined, undefined],
	['null', null, 'null'],
	['true', true, 'true'],
	['false', false, 'false'],
	['empty number', 0, '0'],
	['non-empty number', 1, '1'],
	['non-empty number 2', 2, '2'],
	['empty float', 0.0, '0'],
	['non-empty float', 1.1, '1.1'],
	['negative number', -0, '-0'],
	['negative number', -0.0, '-0'],
	['Infinity', Infinity, 'Infinity'],
	['Infinity', NaN, 'NaN'],
	['empty number string', '0', '0'],
	['non-empty number string', '1', '1'],
	['non-empty number string int', ' 2 ', '2'],
	['non-empty number string float', ' 3.4 ', '3.4'],
	['empty string', '', ''],
	['non-empty string', 'abc', 'abc'],
	['empty array', [], '[]'],
	['non-empty array', [1, 2, 3], '[1,2,3]'],
	['non-empty array', '[ 1, 2, 3 ]', '[1,2,3]'],
	['non-empty associative array', associativeArray, '[null,null,null,4]'],
	['empty object', {}, '{}'],
	['non-empty object', {a: 1, b: 2, c: 3}, '{"a":1,"b":2,"c":3}'],
	['non-empty object', '{"a": 1,  "b": 2,  "c": 3}', '{"a":1,"b":2,"c":3}'],
	['function', Foo, undefined],
	['class', new Foo, '{"a":1,"b":2}'],
];

test.each(tableForce)(
	'%s: safeStringify(%j)',
	(message, input, expected) => {
		expect(safeStringify(input, undefined, undefined, true)).toStrictEqual(expected);
	},
);