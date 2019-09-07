const toBytes = require('./../js/toBytes');

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
	[999, 999, undefined, '999 B'],
	[1000, 1000, undefined, '1000 B'],
	[1024, 1024, undefined, '1 KB'],
	[1029.125, 1029.125, undefined, '1.01 KB'],
	[1126.5, 1126.5, undefined, '1.1 KB'],
	[1263.944704, 1263.944704, 0, '1 KB'],
	[1263.944704, 1263.944704, 1, '1.2 KB'],
	[1263.944704, 1263.944704, 2, '1.23 KB'],
	[1263.944704, 1263.944704, 3, '1.234 KB'],
	[1263.944704, 1263.944704, 4, '1.2343 KB'],
	[1263.944704, 1263.944704, 5, '1.23432 KB'],
	[1263.944704, 1263.944704, 6, '1.234321 KB'],
	[1263.944704, 1263.944704, 7, '1.234321 KB'],
	[2035.360552, 2035.360552, 0, '2 KB'],
	[2035.360552, 2035.360552, 1, '2 KB'],
	[2035.360552, 2035.360552, 2, '1.99 KB'],
	[2035.360552, 2035.360552, 3, '1.988 KB'],
	[2035.360552, 2035.360552, 4, '1.9877 KB'],
	[2035.360552, 2035.360552, 5, '1.98766 KB'],
	[2035.360552, 2035.360552, 6, '1.987657 KB'],
	[2035.360552, 2035.360552, 7, '1.9876568 KB'],
	[1048563.360, 1048563.360, 0, '1024 KB'],
	[1048563.360, 1048563.360, 1, '1024 KB'],
	[1048563.360, 1048563.360, 7, '1023.9876563 KB'],
	[1048575.999, 1048575.999, 7, '1023.999999 KB'],
	[1024 ** 2, 1024 ** 2, undefined, '1 MB'],
	[1024 ** 3, 1024 ** 3, undefined, '1 GB'],
	[1024 ** 4, 1024 ** 4, undefined, '1 TB'],
	[1024 ** 5, 1024 ** 5, undefined, '1 PB'],
	[1024 ** 6, 1024 ** 6, undefined, '1024 PB'],
	['undefined', undefined, undefined, '0 B'],
	['null', null, undefined, '0 B'],
	['true', true, undefined, '1 B'],
	['false', false, undefined, '0 B'],
	['empty number', 0, undefined, '0 B'],
	['non-empty number', 1, undefined, '1 B'],
	['non-empty number 2', 2, undefined, '2 B'],
	['empty float', 0.0, undefined, '0 B'],
	['non-empty float', 1.1, undefined, '1.1 B'],
	['Infinity', Infinity, undefined, 'Infinity PB'],
	['empty number string', '0', undefined, '0 B'],
	['non-empty number string', '1', undefined, '1 B'],
	['non-empty number string int', ' 2 ', undefined, '2 B'],
	['non-empty number string float', ' 3.4 ', undefined, '3.4 B'],
	['empty string', '', undefined, '0 B'],
	['non-empty string', 'abc', undefined, '1 B'],
	['empty array', [], undefined, '0 B'],
	['non-empty array', [1, 2, 3], undefined, '1 B'],
	['non-empty associative array', associativeArray, undefined, '1 B'],
	['empty object', {}, undefined, '0 B'],
	['non-empty object', {a: 1, b: 2, c: 3}, undefined, '1 B'],
	['function', Foo, undefined, '1 B'],
	['class', new Foo, undefined, '1 B'],
];

test.each(table)(
	'%s: toBytes(%j, %s)',
	(message, input, precision, expected) => {
		expect(toBytes(input, precision)).toStrictEqual(expected);

	},
);