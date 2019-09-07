const findReplace = require('./../js/findReplace');

const associativeArray = [];
associativeArray['a'] = 1;
associativeArray['b'] = 2;
associativeArray['c'] = 3;
associativeArray['3'] = 4;

const Foo = function (x, y, z) {
	this.a = 1;
	this.b = 2;
};

Foo.prototype.c = 3;
Foo.prototype['3'] = 4;

const table = [
	['AaA bBb. CcC dDd', '/a/', 'AA bBb. CcC dDd'],
	['AaA bBb. CcC dDd', '/A/', 'a bBb. CcC dDd'],
	['AaA bBb. CcC dDd', '/a/i', ' bBb. CcC dDd'],
	['AaA bBb. CcC dDd', '/[A-C]|[a-c]/', ' .  dDd'],
	['AaA bBb. CcC dDd', '/[A-C]|[a-c]| |\\./', 'dDd'],
	['AaA bBb. CcC dDd', '/AaA /', 'bBb. CcC dDd'],
	['AaA bBb. CcC dDd', 'AaA ', 'bBb. CcC dDd'],
	['AaA bBb. CcC dDd', '/\\./', 'AaA bBb CcC dDd'],
	['AaA bBb. CcC dDd', '\\.', 'AaA bBb CcC dDd'],
];

test.each(table)(
	'%s: findReplace(%j)',
	(input, find, expected) => {
		expect(findReplace(input, find)).toStrictEqual(expected);
	},
);

const tableReplace = [
	['AaA bBb. CcC dDd', '/[^a|A]/', '!', 'AaA!!!!!!!!!!!!!'],
	['AaA bBb. CcC dDd', '/[^d]/', '!', '!!!!!!!!!!!!!d!d'],
];

test.each(tableReplace)(
	'%s: findReplace(%j)',
	(input, find, replace, expected) => {
		expect(findReplace(input, find, replace)).toStrictEqual(expected);
	},
);

const tableNonStrings = [
	['undefined', undefined],
	['null', null],
	['true', true],
	['false', false],
	['empty number', 0],
	['non-empty number', 1],
	['non-empty number 2', 2],
	['empty float', 0.0],
	['non-empty float', 1.1],
	['Infinity', Infinity],
	['empty array', []],
	['non-empty array', [1, 2, 3]],
	['non-empty associative array', associativeArray],
	['empty object', {}],
	['non-empty object', {a: 1, b: 2, c: 3}],
	['function', Foo],
	['class', new Foo],
];

test.each(tableNonStrings)(
	'%s: findReplace(%j)',
	(message, input) => {
		expect(findReplace(input, undefined)).toStrictEqual(input);
	},
);