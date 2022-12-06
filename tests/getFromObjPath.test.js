const getFromObjPath = require('./../js/getFromObjPath');

const table = [
	['simple', {a: 1}, 'a', 1],
	['advanced', {a: {b: {c: 3}}}, 'a.b.c', 3],
];

test.each(table)(
	'%s: getFromObjPath(%j, %j)',
	(message, obj, path, expected) => {
		expect(getFromObjPath(obj, path)).toStrictEqual(expected);
	},
);