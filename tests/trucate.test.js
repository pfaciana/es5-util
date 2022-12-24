const truncate = require('./../js/truncate');

const table = [
	['abc&hellip;', 'abcdefghi', 3],
	['abc...', 'abcdefghi', 3, '...'],
	['abcde...', 'abcdefghi', 5, '...'],
	['abcdefghi', 'abcdefghi', 9e9],
	['abcdefghi', 'abcdefghi', 9],
	['abcdefgh...', 'abcdefghi', 8, '...'],
	['a...', 'abcdefghi', 1, '...'],
	['...', 'abcdefghi', 0, '...'],
	['1234567890.0...', 1234567890.0987654321, 12, '...'],
	['12345...', 1234567890.0987654321, 5, '...'],
	['undefined', undefined, 9e9, '...'],
	['null', null, 9e9, '...'],
	['false', false, 9e9, '...'],
	['true', true, 9e9, '...'],
	['[1,2,3]', [1, 2, 3], 9e9, '...'],
	['[1,2,...', [1, 2, 3], 5, '...'],
	[`{"a":1,"b":2,"c":3}`, {a: 1, b: 2, c: 3}, 9e9, '...'],
	[`{"a":1,"b...`, {a: 1, b: 2, c: 3}, 9, '...'],

	[`[...`, JSON.stringify([1, 2, 3], null, 1), input => input.split("\n").slice(0, 1).join("\n").length, '...'],
	[`[\n 1,\n 2,...`, JSON.stringify([1, 2, 3], null, 1), input => input.split("\n").slice(0, 3).join("\n").length, '...'],
	[`[\n 1,\n 2,\n 3\n]`, JSON.stringify([1, 2, 3], null, 1), input => input.split("\n").slice(0, 5).join("\n").length, '...'],
];

test.each(table)(
	'%# %s truncate(%j, %j, %j)',
	(expected, input, length, suffix = undefined) => {
		expect(truncate(input, length, suffix)).toStrictEqual(expected);
	},
);