const toString = require('./../js/toString');

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
	['undefined', undefined, undefined, undefined, ''],
	['null', null, undefined, undefined, ''],
	['true', true, undefined, undefined, 'true'],
	['false', false, undefined, undefined, 'false'],
	['empty number', 0, undefined, undefined, '0'],
	['non-empty number', 1, undefined, undefined, '1'],
	['non-empty number 2', 2, undefined, undefined, '2'],
	['negative number', -0, undefined, undefined, '-0'],
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
	['non-empty object custom glue', {a: 1, b: 2, c: 3}, '|', undefined, 'a=1|b=2|c=3'],
	['non-empty object custom glues', {a: 1, b: 2, c: 3}, ' and ', ' is ', 'a is 1 and b is 2 and c is 3'],
	['non-empty object keys false', {a: 1, b: 2, c: 3}, undefined, false, '1,2,3'],
	['non-empty object keys null', {a: 1, b: 2, c: 3}, undefined, null, '1,2,3'],
	['non-empty object keys 0', {a: 1, b: 2, c: 3}, undefined, 0, '1,2,3'],
	['non-empty object keys zero as string', {a: 1, b: 2, c: 3}, undefined, '0', 'a01,b02,c03'],
	['function', Foo, undefined, undefined, ''],
	['class', new Foo, undefined, undefined, 'a=1,b=2,4,c=3'],
];

test.each(table)(
	'%s: toString(%j)',
	(message, input, glue, keyGlue, expected) => {
		expect(toString(input, glue, keyGlue)).toStrictEqual(expected);
	},
);