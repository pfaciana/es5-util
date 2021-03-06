const toArray = require('./../js/toArray');

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
	['undefined', undefined, []],
	['null', null, []],
	['true', true, [true]],
	['false', false, [false]],
	['empty number', 0, [0]],
	['non-empty number', 1, [1]],
	['non-empty number 2', 2, [2]],
	['empty float', 0.0, [0]],
	['non-empty float', 1.1, [1.1]],
	['Infinity', Infinity, [Infinity]],
	['empty number string', '0', ['0']],
	['non-empty number string', '1', ['1']],
	['non-empty number string int', ' 2 ', [' ', '2', ' ']],
	['non-empty number string float', ' 3.4 ', [' ', '3', '.', '4', ' ']],
	['empty string', '', ['']],
	['non-empty string', 'abc', ['a', 'b', 'c']],
	['empty array', [], []],
	['non-empty array', [1, 2, 3], [1, 2, 3]],
	['non-empty associative array', associativeArray, [4, 1, 2, 3]],
	['empty object', {}, []],
	['non-empty object', {a: 1, b: 2, c: 3}, [1, 2, 3]],
	['function', Foo, [Foo]],
	['class', new Foo, [1, 2, 4, 3]],
];

test.each(table)(
	'%s: toArray(%j)',
	(message, input, expected) => {
		expect(toArray(input)).toStrictEqual(expected);
	},
);

const tableDelimiter = [
	['non-empty string', 'abc', undefined, ['a', 'b', 'c']],
	['non-empty string', 'a,b,c', undefined, ['a', ',', 'b', ',', 'c']],
	['non-empty string', 'a - b - c', undefined, ['a', ' ', '-', ' ', 'b', ' ', '-', ' ', 'c']],
	['non-empty string', 'abc', '', ['a', 'b', 'c']],
	['non-empty string', 'abc', ',', ['abc']],
	['non-empty string', 'a,b,c', ',', ['a', 'b', 'c']],
	['non-empty string', 'a - b - c', ' - ', ['a', 'b', 'c']],
];

test.each(tableDelimiter)(
	'%s: toArray(%j, %s)',
	(message, input, delimiter, expected) => {
		expect(toArray(input, delimiter)).toStrictEqual(expected);
	},
);