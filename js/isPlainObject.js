function isPlainObject(value) {
	if (typeof value !== 'object' || value == null) {
		return false;
	}

	var Ctor = Object.getPrototypeOf(Object(value)).constructor;

	return Ctor instanceof Ctor;
}

module.exports = isPlainObject;