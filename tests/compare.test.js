const compare = require('./../js/compare');

function shuffle(ordered) {
	let shuffled = ordered.slice(0);
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

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

const sorted = [
	null, false, true, '',
	// Numbers
	'-99', -98, '-0.0', '98', 99,
	// Chars
	'_', '_ z', '_z', ' _z', ' z', '!', '#', '$', '&',
	// Letters
	'A', 'AA', 'M', 'MM', 'Z', 'ZZ', 'a', 'aa', 'm', 'mm', 'z', 'zz',
	// Arrays
	['1', '2', '3'], ['A', 'B', 'C'], ['X', 'y', 'z'], ['a', 'b', 'c'], ['x', 'y', 'z'], [1, 2, 3], associativeArray,
	// Objects
	{"1": 99}, object, {a: 'a'}, {a: -99}, new Foo, {a: 1}, {a: 99},];

for (let i = 1; i <= 3; i++) {
	test(`sort #${i}`, () => {
		let resorted = shuffle(sorted);
		resorted.sort(compare);
		expect(resorted).toEqual(sorted);
	});
}

const uSorted = [
	null, false, true, '',
	// Numbers
	'-99', -98, '-0.0', '98', 99,
	// Chars
	'_', '_ z', '_z', ' _z', ' z', '!', '&', '#', '$',
	// Letters
	'A', 'a', 'AA', 'aa', 'M', 'm', 'MM', 'mm', 'Z', 'z', 'ZZ', 'zz',
	// Arrays
	['1', '2', '3'], ['A', 'B', 'C'], ['a', 'b', 'c'], ['X', 'y', 'z'], ['x', 'y', 'z'], [1, 2, 3], associativeArray,
	// Objects
	{"1": 99}, object, {a: -99}, {a: 'a'}, new Foo, {a: 1}, {a: 99},];

for (let i = 1; i <= 3; i++) {
	test(`upper #${i}`, () => {
		let resorted = shuffle(uSorted);
		resorted.sort(compare.upperFirst);
		expect(resorted).toEqual(uSorted);
	});
}

const lSorted = [
	null, false, true, '',
	// Numbers
	'-99', -98, '-0.0', '98', 99,
	// Chars
	'_', '_ z', '_z', ' _z', ' z', '!', '&', '#', '$',
	// Letters
	'a', 'A', 'aa', 'AA', 'm', 'M', 'mm', 'MM', 'z', 'Z', 'zz', 'ZZ',
	// Arrays
	['1', '2', '3'], ['a', 'b', 'c'], ['A', 'B', 'C'], ['x', 'y', 'z'], ['X', 'y', 'z'], [1, 2, 3], associativeArray,
	// Objects
	{"1": 99}, object, {a: -99}, {a: 'a'}, new Foo, {a: 1}, {a: 99},];

for (let i = 1; i <= 3; i++) {
	test(`lower #${i}`, () => {
		let resorted = shuffle(lSorted);
		resorted.sort(compare.lowerFirst);
		expect(resorted).toEqual(lSorted);
	});
}

const iSorted = [
	null, false, true, '',
	// Numbers
	'-99', -98, '-0.0', '98', 99,
	// Chars
	'_', '_ z', '_z', ' _z', ' z', '!', '#', '$', '&',
	// Letters
	'A', 'AA', 'M', 'MM', 'Z', 'ZZ',
	// Arrays
	['1', '2', '3'], ['A', 'B', 'C'], ['X', 'y', 'z'], [1, 2, 3], associativeArray,
	// Objects
	{"1": 99}, object, {a: 'a'}, {a: -99}, new Foo, {a: 1}, {a: 99},];

for (let i = 1; i <= 3; i++) {
	test(`insensitive #${i}`, () => {
		let resorted = shuffle(iSorted);
		resorted.sort(compare.insensitive);
		expect(resorted).toEqual(iSorted);
	});
}



