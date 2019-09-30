const getUID = require('./../js/getUID');
const {getiUID, getUID16} = getUID;

const getUIDTable = [
	[undefined, undefined, /[A-Za-z0-9]{7}/, true],
	[undefined, undefined, /[^A-Za-z0-9]{7}/, false],
	[5, undefined, /[A-Za-z0-9]{5}/, true],
	[3, 'Aa0', /[Aa0]{3}/, true],
	[3, 'A', /[a]{3}/, false],
	[3, 'A', /[a]{3}/i, true],
	[undefined, '123', /[1-3]{7}/, true],
];

test.each(getUIDTable)(
	'getUID(%j, %j)',
	(length, characters, regex, match) => {
		const actual = getUID(length, characters);
		expect(regex.test(actual)).toStrictEqual(match);
	},
);

const getiUIDTable = [
	[undefined, /[a-z0-9]{7}/, true],
	[undefined, /[^a-z0-9]{7}/, false],
	[undefined, /[A-Z0-9]{7}/, false],
	[undefined, /[A-Z0-9]{7}/i, true],
	[5, /[a-z0-9]{5}/, true],
];

test.each(getiUIDTable)(
	'getiUID(%j, %j)',
	(length, regex, match) => {
		const actual = getiUID(length);
		expect(regex.test(actual)).toStrictEqual(match);
	},
);

const getUID16Table = [
	[undefined, /[a-f0-9]{7}/, true],
	[undefined, /[^a-f0-9]{7}/, false],
	[undefined, /[A-F0-9]{7}/, false],
	[undefined, /[A-F0-9]{7}/i, true],
	[5, /[a-f0-9]{5}/, true],
];

test.each(getUID16Table)(
	'getiUID(%j, %j)',
	(length, regex, match) => {
		const actual = getUID16(length);
		expect(regex.test(actual)).toStrictEqual(match);
	},
);