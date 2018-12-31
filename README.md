# css-func

Handle CSS style functions with no worries.

[![Build Status](https://travis-ci.org/alexcambose/css-func.svg?branch=master)](https://travis-ci.org/alexcambose/css-func)
[![Coverage Status](https://coveralls.io/repos/github/alexcambose/css-func/badge.svg?branch=master)](https://coveralls.io/github/alexcambose/css-func?branch=master)
![License](https://img.shields.io/github/license/alexcambose/css-func.svg)

## Install

```bash
npm i -S css-func
```

## Usage

Examples on how it can be used

```js
const cssfunc = require('css-func');

// get dom element
const element = document.getElementById('#element');

// different ways to specify function parameters
cssfunc(element, 'transform').add('translate', '10px'); // "translate(10px)"
cssfunc(element, 'transform').add('translate', ['10px']); // "translate(10px)"
cssfunc(element, 'transform').add('translate', ['10px', '20px']); //  "translate(10px, 20px)"

cssfunc(element, 'transform').add('rotate', '20deg'); // "rotate(20deg)"

console.log(element.style.transform); // "translate(10px, 20px) rotate(20deg)"
```

Custom variable that holds the `cssfunc` instance

```js
const filters = cssfunc(element, 'filter');
filters.add('blur', '10px');
filters.add('grayscale', '100%');

filters.update('blur', '20px');
filters.delete('blur');

filters.exists('blur'); // false

filters.get(); // "grayscale(100%)"
```

## API

#### get()

Gets the property from element

##### Examples

```javascript
cssfunc(element, 'transform').get(); // "translate(10px, 20px) scale(1.1)"
```

##### Returns

- `string` Element property value

#### add(fproperty, value[, autoUpdate&#x3D;true])

Adds or updates a function

##### Parameters

| Name                 | Type             | Description                                                                                                  |            |
| -------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------ | ---------- |
| fproperty            | `string`         | CSS function name                                                                                            | &nbsp;     |
| value                | `string` `array` | CSS function parameters                                                                                      | &nbsp;     |
| autoUpdate&#x3D;true | `boolean`        | True to automatically update function if aleady presentTrue to automatically add new function if not present | _Optional_ |

##### Examples

```javascript
cssfunc(element, 'transform').add('rotate', '10px');
cssfunc(element, 'transform').add('translate', ['10px', '20px']);
cssfunc(element, 'transform').add('translateX', ['10px']);
```

##### Returns

- `boolean` True if a function was added or updated

#### update(fproperty, value[, autoAdd&#x3D;true])

Updates or adds a function

##### Parameters

| Name              | Type             | Description                                           |            |
| ----------------- | ---------------- | ----------------------------------------------------- | ---------- |
| fproperty         | `string`         | CSS function name                                     | &nbsp;     |
| value             | `string` `array` | CSS function parameters                               | &nbsp;     |
| autoAdd&#x3D;true | `boolean`        | True to automatically add new function if not present | _Optional_ |

##### Examples

```javascript
cssfunc(element, 'transform').update('rotate');
```

##### Returns

- `boolean` True if a function was updated or added

#### delete(fproperty)

Delete functoin from element style property

##### Parameters

| Name      | Type     | Description       |        |
| --------- | -------- | ----------------- | ------ |
| fproperty | `string` | CSS function name | &nbsp; |

##### Examples

```javascript
cssfunc(element, 'transform').delete('rotate');
```

##### Returns

- `boolean` True if there was a function to delete

#### exists(fproperty)

Returns true if function exists

##### Parameters

| Name      | Type     | Description       |        |
| --------- | -------- | ----------------- | ------ |
| fproperty | `string` | CSS function name | &nbsp; |

##### Examples

```javascript
cssfunc(element, 'transform').exists('rotate');
```

##### Returns

- `boolean` True if function exists

---

## License

[MIT](LICENSE)
