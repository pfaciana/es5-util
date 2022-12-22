const getValues = require('./../js/getValues');

const associativeArray = [];
associativeArray['a'] = 1;
associativeArray['b'] = 2;
associativeArray['c'] = 3;
associativeArray['3'] = 4;
associativeArray['z'] = undefined;

const Foo = function () {
	this.a = 1;
	this.b = 2;
	this.y = undefined;
};

Foo.prototype.c = 3;
Foo.prototype['3'] = 4;
Foo.prototype.z = undefined;

const object = {
	a: {
		b: {
			c: 'd',
		},
	},
	x: {
		y: {
			z: undefined,
		}
	},
};

const table = [
	['true', true],
	['false', false],
	['empty number', 0],
	['non-empty number', 1],
	['non-empty number 2', 2],
	['empty float', 0.0],
	['non-empty float', 1.1],
	['Infinity', Infinity],
	['undefined string', 'undefined'],
	['null string', 'null'],
	['true string', 'true'],
	['false string', 'false'],
	['empty number string', '0'],
	['non-empty number string', '1'],
	['non-empty number string int', ' 2 '],
	['non-empty number string float', ' 3.4 '],
	['empty string', ''],
	['non-empty string', 'abc'],
	['empty array', []],
	['non-empty array', [1, 2, 3]],
	['non-empty associative array', associativeArray],
	['empty object', {}],
	['non-empty object', {a: 1, b: 2, c: 3}],
	['non-empty nested object', object],
	['function', Foo],
	['class', new Foo],
];

test.each(table)(
	'%s: getValues(%j)',
	(desc, input) => {
		expect(getValues(input)).toStrictEqual(Object.values(input));
	},
);