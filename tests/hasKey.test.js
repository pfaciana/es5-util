const hasKey = require('./../js/hasKey');

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

const object = {
	a: 1,
	b: 2,
	c: 3,
	3: 4,
};

const table = [
	['a', {}, false],
	['a', object, true],
	[3, object, true],
	['3', object, true],
	['z', object, false],
	['a', [], false],
	['b', associativeArray, true],
	[3, associativeArray, true],
	['3', associativeArray, true],
	['y', associativeArray, false],
	['c', Foo, false],
	[3, Foo, false],
	['3', Foo, false],
	['x', Foo, false],
	['a', new Foo, true],
	[3, new Foo, true],
	['3', new Foo, true],
	['w', new Foo, false],

	// Edge cases
	['a', 100, false],
	[100, 'a', false],
	[100, undefined, false],
	[100, null, false],
	[undefined, 'a', false],
	[null, new Map, false],
	[undefined, new Map, false],
];

test.each(table)(
	'%s: hasKey(%j)',
	(key, object, expected) => {
		expect(hasKey(object, key)).toStrictEqual(expected);
	},
);