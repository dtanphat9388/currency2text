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