const toLowerCase = require('./../js/toLowerCase');

const table = [
	/* Default */
	['aaa bbb. ccc ddd', undefined, undefined, 'aaa bbb. ccc ddd'],
	['Aaa bbb. Ccc ddd', undefined, undefined, 'aaa bbb. ccc ddd'],
	['Aaa Bbb. Ccc Ddd', undefined, undefined, 'aaa bbb. ccc ddd'],
	['AaA bBb. cCc dDd', undefined, undefined, 'aaa bbb. ccc ddd'],
	['AAA BBB. CCC DDD', undefined, undefined, 'aaa bbb. ccc ddd'],

	['aaa bbb. ccc ddd', 'first', true, 'aaa bbb. ccc ddd'],
	['Aaa bbb. Ccc ddd', 'first', true, 'aaa bbb. Ccc ddd'],
	['Aaa Bbb. Ccc Ddd', 'first', true, 'aaa Bbb. Ccc Ddd'],
	['AaA bBb. cCc dDd', 'first', true, 'aaA bBb. cCc dDd'],
	['AAA BBB. CCC DDD', 'first', true, 'aAA BBB. CCC DDD'],

	['aaa bbb. ccc ddd', 'first', false, 'aAA BBB. CCC DDD'],
	['Aaa bbb. Ccc ddd', 'first', false, 'aAA BBB. CCC DDD'],
	['Aaa Bbb. Ccc Ddd', 'first', false, 'aAA BBB. CCC DDD'],
	['AaA bBb. cCc dDd', 'first', false, 'aAA BBB. CCC DDD'],
	['AAA BBB. CCC DDD', 'first', false, 'aAA BBB. CCC DDD'],

	['aaa bbb. ccc ddd', 'words', true, 'aaa bbb. ccc ddd'],
	['Aaa bbb. Ccc ddd', 'words', true, 'aaa bbb. ccc ddd'],
	['Aaa Bbb. Ccc Ddd', 'words', true, 'aaa bbb. ccc ddd'],
	['AaA bBb. cCc dDd', 'words', true, 'aaA bBb. cCc dDd'],
	['AAA BBB. CCC DDD', 'words', true, 'aAA bBB. cCC dDD'],

	['aaa bbb. ccc ddd', 'words', false, 'aAA bBB. cCC dDD'],
	['Aaa bbb. Ccc ddd', 'words', false, 'aAA bBB. cCC dDD'],
	['Aaa Bbb. Ccc Ddd', 'words', false, 'aAA bBB. cCC dDD'],
	['AaA bBb. cCc dDd', 'words', false, 'aAA bBB. cCC dDD'],
	['AAA BBB. CCC DDD', 'words', false, 'aAA bBB. cCC dDD'],
];

test.each(table)(
	'%s: toLowerCase(type: %s, preserveCase: %s)',
	(input, type, preserveCase, expected) => {
		expect(toLowerCase(input, type, preserveCase)).toStrictEqual(expected);
	},
);