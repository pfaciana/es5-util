const castArray = require('./../js/castArray');

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
	['undefined', undefined, [undefined]],
	['null', null, [null]],
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
	['non-empty number string int', ' 2 ', [' 2 ']],
	['non-empty number string float', ' 3.4 ', [' 3.4 ']],
	['empty string', '', ['']],
	['non-empty string', 'abc', ['abc']],
	['empty array', [], []],
	['non-empty array', [1, 2, 3], [1, 2, 3]],
	['non-empty associative array', associativeArray, associativeArray],
	['empty object', {}, [{}]],
	['non-empty object', {a: 1, b: 2, c: 3}, [{a: 1, b: 2, c: 3}]],
	['function', Foo, [Foo]],
	['class', new Foo, [new Foo]],
];

expect(castArray()).toStrictEqual([]);

test.each(table)(
	'%s: castArray(%j)',
	(message, input, expected) => {
		expect(castArray(input)).toStrictEqual(expected);
	},
);