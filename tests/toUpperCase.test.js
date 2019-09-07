const toUpperCase = require('./../js/toUpperCase');

const table = [
	/* Default */
	['aaa bbb. ccc ddd', undefined, undefined, 'AAA BBB. CCC DDD'],
	['Aaa bbb. Ccc ddd', undefined, undefined, 'AAA BBB. CCC DDD'],
	['Aaa Bbb. Ccc Ddd', undefined, undefined, 'AAA BBB. CCC DDD'],
	['AaA bBb. cCc dDd', undefined, undefined, 'AAA BBB. CCC DDD'],
	['AAA BBB. CCC DDD', undefined, undefined, 'AAA BBB. CCC DDD'],

	['aaa bbb. ccc ddd', 'first', true, 'Aaa bbb. ccc ddd'],
	['Aaa bbb. Ccc ddd', 'first', true, 'Aaa bbb. Ccc ddd'],
	['Aaa Bbb. Ccc Ddd', 'first', true, 'Aaa Bbb. Ccc Ddd'],
	['AaA bBb. cCc dDd', 'first', true, 'AaA bBb. cCc dDd'],
	['AAA BBB. CCC DDD', 'first', true, 'AAA BBB. CCC DDD'],

	['aaa bbb. ccc ddd', 'first', false, 'Aaa bbb. ccc ddd'],
	['Aaa bbb. Ccc ddd', 'first', false, 'Aaa bbb. ccc ddd'],
	['Aaa Bbb. Ccc Ddd', 'first', false, 'Aaa bbb. ccc ddd'],
	['AaA bBb. cCc dDd', 'first', false, 'Aaa bbb. ccc ddd'],
	['AAA BBB. CCC DDD', 'first', false, 'Aaa bbb. ccc ddd'],

	['aaa bbb. ccc ddd', 'words', true, 'Aaa Bbb. Ccc Ddd'],
	['Aaa bbb. Ccc ddd', 'words', true, 'Aaa Bbb. Ccc Ddd'],
	['Aaa Bbb. Ccc Ddd', 'words', true, 'Aaa Bbb. Ccc Ddd'],
	['AaA bBb. cCc dDd', 'words', true, 'AaA BBb. CCc DDd'],
	['AAA BBB. CCC DDD', 'words', true, 'AAA BBB. CCC DDD'],

	['aaa bbb. ccc ddd', 'words', false, 'Aaa Bbb. Ccc Ddd'],
	['Aaa bbb. Ccc ddd', 'words', false, 'Aaa Bbb. Ccc Ddd'],
	['Aaa Bbb. Ccc Ddd', 'words', false, 'Aaa Bbb. Ccc Ddd'],
	['AaA bBb. cCc dDd', 'words', false, 'Aaa Bbb. Ccc Ddd'],
	['AAA BBB. CCC DDD', 'words', false, 'Aaa Bbb. Ccc Ddd'],
];

test.each(table)(
	'%s: toUpperCase(type: %s, preserveCase: %s)',
	(input, type, preserveCase, expected) => {
		expect(toUpperCase(input, type, preserveCase)).toStrictEqual(expected);
	},
);