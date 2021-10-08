
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

test("Should be correct text with one number", () => {
  expect(handleOneNumberToString("0")).toBe("không")
  expect(handleOneNumberToString("1")).toBe("một")
  expect(handleOneNumberToString("2")).toBe("hai")
  expect(handleOneNumberToString("3")).toBe("ba")
  expect(handleOneNumberToString("4")).toBe("bốn")
  expect(handleOneNumberToString("5")).toBe("năm")
  expect(handleOneNumberToString("6")).toBe("sáu")
  expect(handleOneNumberToString("7")).toBe("bảy")
  expect(handleOneNumberToString("8")).toBe("tám")
  expect(handleOneNumberToString("9")).toBe("chín")
})

test("Should be correct text with two number", () => {
  expect(handleTwoNumberToString("00")).toBe("không")
  expect(handleTwoNumberToString("10")).toBe("mười")
  expect(handleTwoNumberToString("11")).toBe("mười một")
  expect(handleTwoNumberToString("20")).toBe("hai mươi")
  expect(handleTwoNumberToString("34")).toBe("ba mươi bốn")
})

test("Should be correct text with three number", () => {
  expect(handleThreeNumberToString("000")).toBe("không")
  expect(handleThreeNumberToString("100")).toBe("một trăm")
  expect(handleThreeNumberToString("101")).toBe("một trăm lẻ một")
})

test("Should corrent input with thousand separators", () => {
  expect(removeThousandSeparator("00-1 23-4 56_7 89.000")).toBe("123456789000")
})

test("Should be input is all number", () => {
  expect(checkValid('54325')).toBe(true)
  expect(checkValid('54a325')).toBe(false)
  expect(checkValid('54A325')).toBe(false)
  expect(checkValid('54 325')).toBe(false)
  expect(checkValid('54-325')).toBe(false)
  expect(checkValid('54.325')).toBe(false)
})

test("Should addPadding to input", () => {
  expect(addPadding("0")).toBe("000")
  expect(addPadding("00")).toBe("000")
  expect(addPadding("000")).toBe("000")
  expect(addPadding("0000")).toBe("000000")
  expect(addPadding("0000000")).toBe("000000000")
})

test("Should not handle if input empty", () => {
  expect(cur2text("0")).toBe("")
  expect(cur2text("00")).toBe("")
  expect(cur2text("000")).toBe("")
})

test("Suffix là 'chẵn' nếu last block === 000", () => {
  expect(cur2text("1000")).toMatch(/.*chẵn$/)
  expect(cur2text("1001")).toMatch(/.*đồng$/)
})

test("Should be handle if block length <= 3", () => {
  expect(cur2text("100")).toBe("một trăm đồng")
})

test("Should be correct currency string", () => {
  expect(cur2text("")).toBe("")
  expect(cur2text("0")).toBe("")
  expect(cur2text("1000")).toBe("một ngàn chẵn")
  expect(cur2text("24000")).toBe("hai mươi bốn ngàn chẵn")
  expect(cur2text("106211")).toBe("một trăm lẻ sáu ngàn hai trăm mười một đồng")
  expect(cur2text("5106211")).toBe("năm triệu một trăm lẻ sáu ngàn hai trăm mười một đồng")
  expect(cur2text("1505106211")).toBe("một tỷ năm trăm lẻ năm triệu một trăm lẻ sáu ngàn hai trăm mười một đồng")
  expect(cur2text("1505000211")).toBe("một tỷ năm trăm lẻ năm triệu hai trăm mười một đồng")
})

test("Shout be break input to three number blocks", () => {
  expect(breakInputToBlocks("456")).toMatchObject(["456"])
  expect(breakInputToBlocks("123456")).toMatchObject(["123","456"])
})