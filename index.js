const _ = require('lodash')

const unit = "đồng";
const vn = {
  blocks: ['tỷ', 'triệu', 'ngàn', `${unit}`],
}
const numberStr = [ "không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mười"]


function convert(number, country) {
  if (isNaN(number)) {
    throw new Error("tham so phai la number")
  }
  const majorBlock = fillNumber(number)
  const minorBlocks = majorBlock.match(/\d{3}/g)
  const minorBlocksTrimed = _.map(minorBlocks, (minorBlock, index) => _.trimStart(minorBlock, 0)) // remove 0 trong mỗi minor block
  return _.join(_.compact(_.zipWith(minorBlocksTrimed, country.blocks, (a,b) => {
    if (b == "đồng" && a == "") return "chẵn";
    if (b !== "đồng" && a == "") return "";
    const minorhandled = handleMinor(a);
    return `${minorhandled} ${b}`
  })), " ")
}


/**
 * @description thêm 0 vào trước cho đủ  12 số (123456 => 000000123456)
 */
function fillNumber(number) {
  const length = `${number}`.length;
  const fillLength = _.padStart(`${number}`, (parseInt(length / 12) + 1) * 12, 0)
  const majorBlock = fillLength.match(/\d{12}/g)[0]
  return majorBlock
}

function handleMinor(number) {
  if (!number) return undefined;
  switch(number.length) {
    case 1: return number2str(number);
    case 2: {
      return handleChuc(number, numberStr)
    }
    case 3: {
      let [tram, ...chuc] = number
      tram = number2str(tram)
      chuc = handleChuc(_.join(chuc, ""), 3)
      return `${tram} trăm ${chuc}`
    }
  }
}


function handleChuc(number, digits=2) {
  if (digits == 3 && number < 10) {
    return `lẻ ${number2str(+number)}`
  }
  if (number == 10) return number2str(number)
  let [chuc, donvi] = number
  chuc = number < 20 ? "mười" : `${number2str(chuc)} mươi`;
  return `${chuc} ${number2str(donvi)}`
}


function number2str(number) {
  return numberStr[number]
}


console.log(convert(2016000000, vn))