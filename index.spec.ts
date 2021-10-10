
import cur2text, 
  {
    handleOneNumberToString,
    handleTwoNumberToString,
    handleThreeNumberToString,
    removeThousandSeparator,
    addPadding,
    checkValid,
    breakInputToBlocks
  } 
from './index'

describe("handleOneNumberToString(): Should return text with one digit", () => {
  test.each([
    {input: "0", result: "không"},
    {input: "1", result: "một"},
    {input: "2", result: "hai"},
    {input: "3", result: "ba"},
    {input: "4", result: "bốn"},
    {input: "5", result: "năm"},
    {input: "6", result: "sáu"},
    {input: "7", result: "bảy"},
    {input: "8", result: "tám"},
    {input: "9", result: "chín"},
  ])("Should $input tobe $result", ({input, result}) => {
    expect(handleOneNumberToString(input)).toBe(result)
  })
})

describe("handleTwoNumberToString(): Should return text with two digits", () => {
  test.each([
    {input: "00", result: "không"},
    {input: "10", result: "mười"},
    {input: "11", result: "mười một"},
    {input: "20", result: "hai mươi"},
    {input: "34", result: "ba mươi bốn"},
  ])("Should $input tobe $result", ({input, result}) => {
    expect(handleTwoNumberToString(input)).toBe(result)
  })
})

describe("handleThreeNumberToString(): Should return text with three digits", () => {
  test.each([
    {input: "000", result: "không"},
    {input: "100", result: "một trăm"},
    {input: "101", result: "một trăm lẻ một"},
  ])("Should $input tobe $result", ({input, result}) => {
    expect(handleThreeNumberToString(input)).toBe(result)
  })
})

describe("validate input", () => {
  test("Should accept input with thousand separators", () => {
    expect(removeThousandSeparator("00-1 23-4 56_7 89.000")).toBe("123456789000")
  })
  
  test.each([
    {input: '594325', result: true,  desc: "is all number"},
    {input: '54a325', result: false, desc:  "have a 'a' character"},
    {input: '54A325', result: false, desc:  "have a 'A' character"},
  ])('Should input: $input \t toBe $result \t because $desc', ({input, result}) => {
    expect(checkValid(input)).toBe(result)
  })
})

test.each([
  {input: "0", result: "000"},
  {input: "00", result: "000"},
  {input: "00", result: "000"},
  {input: "0000", result: "000000"},
  {input: "0000000", result: "000000000"},
])("Should $input tobe $result", ({input, result}) => {
  expect(addPadding(input)).toBe(result)
})

describe('Should not handle if input empty', () => {
  test.each([
    {input: "0", result: ""},
    {input: "00", result: ""},
    {input: "000", result: ""},
  ])("expect $input tobe $result", ({input, result}) => {
    expect(cur2text(input)).toBe(result)
  })
})

describe('Should text context by last block', () => {
  test.each([
    {input: "1000", result: /.*chẵn$/, desc: "entity last block is 0"},
    {input: "1001", result: /.*đồng$/, desc: "any digit in last block not 0"},
  ])('expect $input tobe $result because $desc', ({input, result}) => {
    expect(cur2text(input)).toMatch(result)
  })
})

test("Should be handle if block length <= 3", () => {
  expect(cur2text("100")).toBe("một trăm đồng")
})

describe('Should get correct currency string with input number', () => {
  test.each([
    {input: "", result: ""},
    {input: "0", result: ""},
    {input: "1000", result: "một ngàn chẵn"},
    {input: "24000", result: "hai mươi bốn ngàn chẵn"},
    {input: "106211", result: "một trăm lẻ sáu ngàn hai trăm mười một đồng"},
    {input: "5106211", result: "năm triệu một trăm lẻ sáu ngàn hai trăm mười một đồng"},
    {input: "1505106211", result: "một tỷ năm trăm lẻ năm triệu một trăm lẻ sáu ngàn hai trăm mười một đồng"},
    {input: "1505000211", result: "một tỷ năm trăm lẻ năm triệu hai trăm mười một đồng"},
  ])("expect $input tobe $result", ({input, result}) => {
    expect(cur2text(input)).toBe(result)
  })
})

describe("Shout be break input to three number blocks", () => {
  test.each([
    {input: "456", result: ["456"], desc: ""},
    {input: "123456789", result: ["123", '456', '789'], desc: ""},
  ])('expect $input tobe $result because $desc', ({input, result}) => {
    expect(breakInputToBlocks(input)).toMatchObject(result)
  })
})