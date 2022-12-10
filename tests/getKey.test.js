const getKey = require('./../js/getKey');

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
	a: 1,
	b: 2,
	c: 3,
	3: 4,
	z: undefined,
};

const table = [
	['a', {}, missing],
	['a', object, 1],
	[3, object, 4],
	['3', object, 4],
	['z', object, undefined],
	['x', object, missing],
	['a', [], missing],
	['b', associativeArray, 2],
	[3, associativeArray, 4],
	['3', associativeArray, 4],
	['z', associativeArray, undefined],
	['x', associativeArray, missing],
	['y', associativeArray, missing],
	['c', Foo, missing],
	[3, Foo, missing],
	['3', Foo, missing],
	['x', Foo, missing],
	['z', Foo, missing],
	['x', Foo, missing],
	['a', new Foo, 1],
	[3, new Foo, 4],
	['3', new Foo, 4],
	['z', new Foo, undefined],
	['y', new Foo, undefined],
	['w', new Foo, missing],

	// Edge cases
	['a', 100, missing],
	[100, 'a', missing],
	[100, undefined, missing],
	[undefined, 'a', missing],
	[null, new Map, missing],
	[undefined, new Map, missing],
];

test.each(table)(
	'%s: getKey(%j)',
	(key, object, expected) => {
		expect(getKey(object, key, missing)).toStrictEqual(expected);
		expect(getKey(object, key)).toStrictEqual(expected === missing ? undefined : expected);
	},
);