[demo](https://dtanphat9388.github.io/opensources/currency2text/)

# Notes:
- hiện tại chỉ convert tối đa 18 số

1. Install

```sh
npm i currency2text
```

2. How to use

```js
const convert = require('currency2text')
const text = convert(1000000) // expected: `một triệu chẵn'
```

3. API
```ts
function convert(value: string | number):string
```
