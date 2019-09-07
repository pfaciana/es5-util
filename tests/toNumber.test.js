const toNumber = require('./../js/toNumber');

const associativeArray = [];
associativeArray['a'] = 1;
associativeArray['b'] = 2;
associativeArray['c'] = 3;

const Foo = function () {
	this.a = 1;
	this.b = 2;
};

Foo.prototype.c = 3;

const table = [
	[1241757, 1241757, -3, 1242000],
	[3.6, 3.6, 0, 4],
	[2.835, 2.835, 2, 2.84],
	[1.1749999999999, 1.1749999999999, 2, 1.17],
	[58551.799999999996, 58551.799999999996, 2, 58551.8],
	['undefined', undefined, undefined, NaN],
	['null', null, undefined, 0],
	['true', true, undefined, 1],
	['false', false, undefined, 0],
	['empty number', 0, undefined, 0],
	['non-empty number', 1, undefined, 1],
	['non-empty number 2', 2, undefined, 2],
	['empty float', 0.0, undefined, 0],
	['non-empty float', 1.1, undefined, 1.1],
	['Infinity', Infinity, undefined, Infinity],
	['empty number string', '0', undefined, 0],
	['non-empty number string', '1', undefined, 1],
	['non-empty number string int', ' 2 ', undefined, 2],
	['non-empty number string float', ' 3.4 ', undefined, 3.4],
	['empty string', '', undefined, 0],
	['non-empty string', 'abc', undefined, NaN],
	['empty array', [], undefined, NaN],
	['non-empty array', [1, 2, 3], undefined, NaN],
	['non-empty associative array', associativeArray, undefined, NaN],
	['empty object', {}, undefined, NaN],
	['non-empty object', {a: 1, b: 2, c: 3}, undefined, NaN],
	['function', Foo, undefined, NaN],
	['class', new Foo, undefined, NaN],
];

test.each(table)(
	'%s: toNumber(%j)',
	(message, input, precision, expected) => {
		expect(toNumber(input, precision)).toStrictEqual(expected);
	},
);