# ES5 Utilities

A set of lightweight ES5 Utility functions can be either used in the browser or in Node.js. Heavily inspired by [Locutus](http://locutus.io/php/) (formerly php.js), [lodash](https://lodash.com/docs/) and [PHP's Variable and Type Related Extensions](https://www.php.net/manual/en/refs.basic.vartype.php)

## API

```javascript
arrayColumn(array, columnKey = null, indexKey = null)
castArray(input)
compare(a, b)
compare.upperFirst(a, b)
compare.lowerFirst(a, b)
compare.insensitive(a, b)
findReplace(input, find, replace = '')
getFromObjPath(obj, path)
getKey(object, key)
getKeys(object, path)
getUID(length = 7, characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')
getiUID(length = 7)
getUID16(length = 7)
getValues(object)
hasKey(object, key)
hasKeys(object, path)
inArray(needle, haystack, strict = false)
isArrayLike(input)
isArrayLikeObject(input)
isEmptyLoose(input)
isEmptyStrict(input)
isInteger(input)
isNotEmptyLoose(input)
isNotEmptyStrict(input)
isNotSetLoose(input)
isNotSetStrict(input)
isNotSetTag(input)
isObject(input)
isObjectLike(input)
isPlainObject(input)
isSetLoose(input)
isSetStrict(input)
isSetTag(input)
round(input, precision = 0)
safeParse(input, forceParse = true)
safeStringify(input, replacer = null, space = null, forceParse = false)
substr(input, start, length = null, validatePositions = false)
toArray(input, delimiter = '')
toAssociativeArray(input)
toAssociativeObject(input)
toAssociativeValues(input)
toBytes(input, precision = 2)
toHtmlEntities(input)
toInteger(input)
toLowerCase(input, option = null, preserveCase = true)
toNumber(input, precision = null)
toPlainObject(input)
toString(input, glue = ',', keyGlue = '=')
toTime(str, now)
toUnique(duplicates, strict)
toUnixTime(date = null, preserveJsMs = false)
toUpperCase(input, option = null, preserveCase = true)
truncate(input, length, suffix = '&hellip;')
```

## Comparing LoDash's Null/Nil/Empty to ES5 Util's Set/Empty

```
|        LoDash         |       isNotSet        | LDash |    isEmpty    |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| Undef | Null  |  Nil  | Strct | Loose |  Tag  | Empty | Strct | Loose |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
|   x   |       |   x   |   x   |   x   |   x   |   x   |   x   |   x   | undefined
|       |   x   |   x   |   x   |   x   |   x   |   x   |   x   |   x   | null
|       |       |       |       |   x   |   x   |       |       |   x   | "undefined"
|       |       |       |       |   x   |   x   |       |       |   x   | "null"
|       |       |       |       |       |   x   |   x   |   x   |   x   | ""
|       |       |       |       |       |       |   x   |   x   |   x   | false
|       |       |       |       |       |       |   x   |   x   |   x   | 0
|       |       |       |       |       |       |       |   x   |   x   | "0"
|       |       |       |       |       |       |       |       |   x   | "false"
|       |       |       |       |       |       |   x   |       |       | true
|       |       |       |       |       |       |   x   |       |       | 1/any non-zero number
|       |       |       |       |       |       |       |       |       | "1"
|       |       |       |       |       |       |       |       |       | "true"/any non-empty string
|       |       |       |       |       |       |   x   |   x   |   x   | []
|       |       |       |       |       |       |       |       |       | [...]/any non-empty array
|       |       |       |       |       |       |   x   |   x   |   x   | {}
|       |       |       |       |       |       |       |       |       | {...}/any non-empty object
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
```