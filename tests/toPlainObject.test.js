const toPlainObject = require('./../js/toPlainObject');

const associativeArray = [];
associativeArray['a'] = 1;
associativeArray['b'] = 2;
associativeArray['c'] = 3;

const Foo = function () {
	this.a = 1;
	this.b = 2;
};

Foo.prototype.c = 3;
Foo.prototype.d = function () {
};

const table = [
	['undefined', undefined, {}],
	['null', null, {}],
	['true', true, {}],
	['false', false, {}],
	['empty number', 0, {}],
	['non-empty number', 1, {}],
	['non-empty number 2', 2, {}],
	['empty float', 0.0, {}],
	['non-empty float', 1.1, {}],
	['Infinity', Infinity, {}],
	['empty number string', '0', {0: '0'}],
	['non-empty number string', '1', {0: '1'}],
	['non-empty number string int', ' 2 ', {0: ' ', 1: '2', 2: ' '}],
	['non-empty number string float', ' 3.4 ', {0: ' ', 1: '3', 2: '.', 3: '4', 4: ' '}],
	['empty string', '', {}],
	['non-empty string', 'abc', {0: 'a', 1: 'b', 2: 'c'}],
	['empty array', [], {}],
	['non-empty array', [1, 2, 3], {0: 1, 1: 2, 2: 3}],
	['non-empty associative array', associativeArray, {a: 1, b: 2, c: 3}],
	['empty object', {}, {}],
	['non-empty object', {a: 1, b: 2, c: 3}, {a: 1, b: 2, c: 3}],
	['function', Foo, {}],
	['class', new Foo, {a: 1, b: 2, c: 3}],
];

test.each(table)(
	'%s: toPlainObject(%j)',
	(message, input, expected) => {
		expect(toPlainObject(input)).toStrictEqual(expected);
	},
);