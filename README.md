[![Coverage Status](https://coveralls.io/repos/github/dtanphat9388/currency2text/badge.svg)](https://coveralls.io/github/dtanphat9388/currency2text)

# Description
- convert number to currency text for invoices
- Supported languages: `vi`

[demo](https://dtanphat9388.github.io/opensources/currency2text/)

# TOC
- install
- how to use
- api references

---

1. Install
```sh
npm i currency2text
```

2. How to use

```js
const convert = require('currency2text')
const text = convert(1000000) // expected: `một triệu chẵn'
```

3. API references
```ts
function convert(value: string | number):string
```
