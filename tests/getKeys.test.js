const getKeys = require('./../js/getKeys');

const missing = 404;

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
	['a', {}, missing],
	['a', object, {b: {c: 'd'}}],
	['z', object, missing],
	['a.b', object, {c: 'd'}],
	['z.b', object, missing],
	['a.b.c', object, 'd'],
	['x.y', object, {z: undefined}],
	['x.y.z', object, undefined],
	['x.y.z.w', object, missing],
	['z.a.b.c', object, missing],
	['a.b.c.d', object, missing],
	['a.b.c.d', object, missing],
	['a', [], missing],
	['a', associativeArray, 1],
	['b', associativeArray, 2],
	['c', associativeArray, 3],
	['3', associativeArray, 4],
	['a.b', associativeArray, missing],
	['a', Foo, missing],
	['b', Foo, missing],
	['a.b', Foo, missing],
	['a', new Foo, 1],
	['b', new Foo, 2],
	['c', new Foo, 3],
	['3', new Foo, 4],
	['z', new Foo, undefined],
	['y', new Foo, undefined],
	['w', new Foo, missing],
	['a.b', new Foo, missing],

	// Edge cases
	['a', 100, missing],
	[100, 'a', missing],
	[100, undefined, missing],
	[undefined, 'a', missing],
	[null, new Map, missing],
	[undefined, new Map, missing],
];

test.each(table)(
	'%s: getKeys(%j)',
	(path, object, expected) => {
		expect(getKeys(object, path, missing)).toStrictEqual(expected);
		expect(getKeys(object, path)).toStrictEqual(expected === missing ? undefined : expected);
	},
);