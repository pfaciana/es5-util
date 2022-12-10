const substr = require('./../js/substr');

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
	['0', 'abcdef', undefined, undefined, 'abcdef'],
	['1', 'abcdef', 1, undefined, 'bcdef'],
	['1, 3', 'abcdef', 1, 3, 'bcd'],
	['0, 4', 'abcdef', 0, 4, 'abcd'],
	['0, 100', 'abcdef', 0, 100, 'abcdef'],
	['100', 'abcdef', 100, undefined, ''],
	['-1', 'abcdef', -1, 1, 'f'],
	['-1', 'abcdef', -1, undefined, 'f'],
	['-2', 'abcdef', -2, undefined, 'ef'],
	['-3, 1', 'abcdef', -3, 1, 'd'],
	['0, -1', 'abcdef', 0, -1, 'abcde'],
	['2, -1', 'abcdef', 2, -1, 'cde'],
	['4, -4', 'abcdef', 4, -4, ''],
	['-3, -1', 'abcdef', -3, -1, 'de'],
	['undefined', undefined, undefined, undefined, ''],
	['null', null, undefined, undefined, ''],
	['true', true, undefined, undefined, 'true'],
	['false', false, undefined, undefined, 'false'],
	['empty number', 0, undefined, undefined, '0'],
	['non-empty number', 1, undefined, undefined, '1'],
	['non-empty number 2', 2, undefined, undefined, '2'],
	['negative zero', -0, undefined, undefined, '-0'],
	['negative number', -2, undefined, undefined, '-2'],
	['empty float', 0.0, undefined, undefined, '0'],
	['non-empty float', 1.1, undefined, undefined, '1.1'],
	['Infinity', Infinity, undefined, undefined, 'Infinity'],
	['empty number string', '0', undefined, undefined, '0'],
	['non-empty number string', '1', undefined, undefined, '1'],
	['non-empty number string int', ' 2 ', undefined, undefined, ' 2 '],
	['non-empty number string float', ' 3.4 ', undefined, undefined, ' 3.4 '],
	['empty string', '', undefined, undefined, ''],
	['non-empty string', 'abc', undefined, undefined, 'abc'],
	['empty array', [], undefined, undefined, ''],
	['non-empty array', [1, 2, 3], undefined, undefined, '1,2,3'],
	['non-empty associative array', associativeArray, undefined, undefined, '4,a=1,b=2,c=3'],
	['empty object', {}, undefined, undefined, ''],
	['non-empty object', {a: 1, b: 2, c: 3}, undefined, undefined, 'a=1,b=2,c=3'],
	['function', Foo, undefined, undefined, ''],
	['class', new Foo, undefined, undefined, 'a=1,b=2,4,c=3'],
];

expect(substr('abcdef', 4, -4, true)).toStrictEqual('cd');

test.each(table)(
	'%s: substr(%j, %j, %j) %j',
	(message, input, start, length, expected) => {
		expect(substr(input, start, length)).toStrictEqual(expected);
	},
);