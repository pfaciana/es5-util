const hasKeys = require('./../js/hasKeys');

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
	a: {
		b: {
			c: 'd',
		},
	},
};

const table = [
	['a', {}, false],
	['a', object, true],
	['z', object, false],
	['a.b', object, true],
	['z.b', object, false],
	['a.b.c', object, true],
	['z.a.b.c', object, false],
	['a.b.c.d', object, false],
	['a.b.c.d', object, false],
	['a', [], false],
	['a', associativeArray, true],
	['b', associativeArray, true],
	['a.b', associativeArray, false],
	['a', Foo, false],
	['b', Foo, false],
	['a.b', Foo, false],
	['a', new Foo, true],
	['b', new Foo, true],
	['a.b', new Foo, false],
];

test.each(table)(
	'%s: hasKeys(%j)',
	(path, object, expected) => {
		expect(hasKeys(object, path)).toStrictEqual(expected);
	},
);