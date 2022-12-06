const arrayColumn = require('./../js/arrayColumn');

const table = [
	['columnKey', [
		{a: 1},
		{a: 2},
		{a: 3},
	], 'a', null, [1, 2, 3]],
	['indexKey', [
		{a: 1},
		{a: 2},
		{a: 3},
	], 'a', 'a', {1: 1, 2: 2, 3: 3}],
	['indexKey #2', [
		{k: 'a', v: 101, o: 50},
		{k: 'b', v: 102, o: 51},
		{k: 'c', v: 103, o: 52},
	], 'v', 'k', {a: 101, b: 102, c: 103}],
];

test.each(table)(
	'%s: arrayColumn(%j)',
	(message, array, columnKey, indexKey, expected) => {
		expect(arrayColumn(array, columnKey, indexKey)).toStrictEqual(expected);
	},
);