const getFromObjPath = require('./getFromObjPath');
const getValues = require('./getValues');

function arrayColumn(array, columnKey, indexKey) {
	columnKey = columnKey != null ? columnKey : null;
	indexKey = indexKey != null ? indexKey : null;
	if (indexKey !== null) {
		let obj = {};
		for (var index in array) {
			if (array.hasOwnProperty(index) || typeof array[index] !== 'function') {
				obj[getFromObjPath(array[index], indexKey)] = columnKey !== null ? (typeof columnKey === 'function' ? columnKey(array[index]) : getFromObjPath(array[index], columnKey)) : array[index];
			}
		}
		return obj;
	}

	array = Array.isArray(array) ? array : getValues(array);
	return array.map(function (value, index) {
		return typeof columnKey === 'function' ? columnKey(value) : getFromObjPath(value, columnKey);
	})
}

module.exports = arrayColumn;