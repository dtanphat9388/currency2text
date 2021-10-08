
import cur2text from './index'

const tests = [
  {input: "000", expect: '', msg: "not handle full block is 000"},
  {input: "001", expect: "một đồng", msg: "001"},
  {input: "010", expect: "mười đồng", msg: "010"},
  {input: "011", expect: "mười một đồng", msg: "011"},
  {input: "020", expect: "hai mươi đồng", msg: "020"},
  {input: "021", expect: "hai mươi một đồng", msg: "021"},
  {input: "200", expect: "hai trăm đồng", msg: "200"},
  {input: "201", expect: "hai trăm lẻ một đồng", msg: "201"},
  {input: "200", expect: "hai trăm đồng", msg: "200"},
  {input: "1000", expect: "một ngàn chẵn", msg: "1000"},
  {input: "1001", expect: "một ngàn không ertm lẻ một đồng", msg: "1001"},
  {input: "45120006000", expect: "bốn mươi năm tỷ một trăm hai mươi triệu không trăm lẻ sáu ngàn chẵn", msg: "45120006000"},
]

tests.forEach(test => {
  try {
    assert(cur2text(test.input) === test.expect, test.msg);
  }
  catch (e) {
    console.log(e)
  }
})

console.log('DONE')
