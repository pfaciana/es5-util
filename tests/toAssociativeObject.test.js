const toAssociativeObject = require('./../js/toAssociativeObject');

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
	['null', null, {0: null}],
	['true', true, {0: true}],
	['false', false, {0: false}],
	['empty number', 0, {0: 0}],
	['non-empty number', 1, {0: 1}],
	['non-empty number 2', 2, {0: 2}],
	['empty float', 0.0, {0: 0}],
	['non-empty float', 1.1, {0: 1.1}],
	['Infinity', Infinity, {0: Infinity}],
	['empty number string', '0', {0: '0'}],
	['non-empty number string', '1', {0: '1'}],
	['non-empty number string int', ' 2 ', {0: ' 2 '}],
	['non-empty number string float', ' 3.4 ', {0: ' 3.4 '}],
	['empty string', '', {0: ''}],
	['non-empty string', 'abc', {0: 'abc'}],
	['empty array', [], {}],
	['non-empty array', [1, 2, 3], {0: 1, 1: 2, 2: 3}],
	['non-empty associative array', associativeArray, {a: 1, b: 2, c: 3}],
	['empty object', {}, {}],
	['non-empty object', {a: 1, b: 2, c: 3}, {a: 1, b: 2, c: 3}],
	['function', Foo, {0: Foo}],
	['class', new Foo, {a: 1, b: 2, c: 3}],
];

test.each(table)(
	'%s: toAssociativeObject(%j)',
	(message, input, expected) => {
		expect(toAssociativeObject(input)).toStrictEqual(expected);
	},
);