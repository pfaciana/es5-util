const inArray = require('./../js/inArray');

const table = [
	[[null, 0, 1, 2, true, false], null, false, true],
	[[null, 0, 1, 2, true, false], 0, false, true],
	[[null, 0, 1, 2, true, false], 1, false, true],
	[[null, 0, 1, 2, true, false], 2, false, true],
	[[null, 0, 1, 2, true, false], 3, false, false],
	[[null, 0, 1, 2, true, false], true, false, true],
	[[null, 0, 1, 2, true, false], false, false, true],
	[[null, 0, 1, 2, true, false], 'null', false, false],
	[[null, 0, 1, 2, true, false], '0', false, true],
	[[null, 0, 1, 2, true, false], '1', false, true],
	[[null, 0, 1, 2, true, false], '2', false, true],
	[[null, 0, 1, 2, true, false], 'true', false, false],
	[[null, 0, 1, 2, true, false], 'false', false, false],
	[[null, 0, 1, 2, true, false], 'abc', false, false],
	[[null, 0, 1, 2, true, false], 'def', false, false],

	[[null, 0, 1, 2, true, false], null, true, true],
	[[null, 0, 1, 2, true, false], 0, true, true],
	[[null, 0, 1, 2, true, false], 1, true, true],
	[[null, 0, 1, 2, true, false], 2, true, true],
	[[null, 0, 1, 2, true, false], 3, true, false],
	[[null, 0, 1, 2, true, false], true, true, true],
	[[null, 0, 1, 2, true, false], false, true, true],
	[[null, 0, 1, 2, true, false], 'null', true, false],
	[[null, 0, 1, 2, true, false], '0', true, false],
	[[null, 0, 1, 2, true, false], '1', true, false],
	[[null, 0, 1, 2, true, false], '2', true, false],
	[[null, 0, 1, 2, true, false], 'true', true, false],
	[[null, 0, 1, 2, true, false], 'false', true, false],
	[[null, 0, 1, 2, true, false], 'abc', true, false],
	[[null, 0, 1, 2, true, false], 'def', true, false],

	[['null', '0', '1', '2', 'true', 'false', 'abc'], null, false, false],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], 0, false, true],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], 1, false, true],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], 2, false, true],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], 3, false, false],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], true, false, true],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], false, false, true],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], 'null', false, true],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], '0', false, true],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], '1', false, true],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], '2', false, true],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], 'true', false, true],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], 'false', false, true],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], 'abc', false, true],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], 'def', false, false],

	[['null', '0', '1', '2', 'true', 'false', 'abc'], null, true, false],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], 0, true, false],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], 1, true, false],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], 2, true, false],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], 3, true, false],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], true, true, false],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], false, true, false],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], 'null', true, true],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], '0', true, true],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], '1', true, true],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], '2', true, true],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], 'true', true, true],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], 'false', true, true],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], 'abc', true, true],
	[['null', '0', '1', '2', 'true', 'false', 'abc'], 'def', true, false],
];

test.each(table)(
	'%j: inArray(needle: %j, strict: %s)',
	(needle, haystack, strict, expected) => {
		expect(inArray(haystack, needle, strict)).toStrictEqual(expected);
	},
);