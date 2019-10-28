const toUnique = require('./../js/toUnique');

const table = [
	[['Kevin', 'Kevin', 'van', 'Zonneveld', 'Kevin'], undefined, ['Kevin', 'van', 'Zonneveld']],
	[{0: 'red', 1: 'blue', 2: 'red', 'a': 'green', 'b': 'green'}, undefined, ['red', 'blue', 'green']],
	[[1, '1', 2, '2', '3', 3], undefined, [1, 2, '3']],
	[[1, '1', 2, '2', '3', 3], false, [1, 2, '3']],
	[[1, '1', 2, '2', '3', 3], true, [1, '1', 2, '2', '3', 3]],
	[[undefined, null, true, false, 0, 1, '0', '1', '', [], {}], false, [undefined, true, false, {}]],
	[[undefined, null, true, false, 0, 1, '0', '1', '', [], {}], true, [undefined, null, true, false, 0, 1, '0', '1', '', [], {}]],
];

test.each(table)(
	'%j: toUnique(%s, %j)',
	(duplicates, strict, uniques) => {
		expect(toUnique(duplicates, strict)).toStrictEqual(uniques);
	},
);