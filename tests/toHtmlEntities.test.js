const toHtmlEntities = require('./../js/toHtmlEntities');

const table = [
	['&lt;a&gt;link&lt;/a&gt;', '<a>link</a>'],
	['abc', 'abc'],
	[
		'&lt;a href=&quot;?a=1&amp;b=2&quot; target=&#039;_blank&#039;&gt;Jonn&#039;s &amp; Jane&#039;s&lt;/a&gt;',
		`<a href="?a=1&b=2" target='_blank'>Jonn's & Jane's</a>`
	],
];

test.each(table)(
	'%# %s expect(%j)',
	(expected, input) => {
		expect(toHtmlEntities(input)).toStrictEqual(expected);
	},
);