/* 
              ty  trieu ngan dong
    number : 123   456   789 123
    minor  : abc   abc   abc abc
    major  : xxx   xxx   xxx xxx 
 */

 /** WORKFLOW
  *   number:                 103 056
  *   fill 0:         000 000 103 056
  *   remove 0:         0   0 103  56
  *   replace 0 = "":  ""  "" 103  56 => handleText
  *   zip           :  ty trieu ngan dong
  */ 

/** CASE
 *  2 số:  0-9    => không - chính
 *         10     => mười
 *         1x     => mười <x>
 *         xx     => <x> mươi <x>
 *  
 *  3 số:  x0x    => <x> trăm lẻ <x>
 */
const _ = require('lodash')

const blocks = ['tỷ', 'triệu', 'ngàn'];

const defaultOptions = {
  unit: 'đồng',
}

function convert(number, options=defaultOptions) {
  const { unit } = options;

  if (isNaN(number)) throw new Error("Argument have to a number!");

  switch (`${number}`.length) {
    case 1: case 2: case 3: {
      return `${handleDigitToStr(number, "đồng")} ${unit}`
    }
  }

  blocks[3] || blocks.push(unit)

  const mahor = fillNumber(number)
  const minors = mahor.match(/\d{3}/g)
  const minorBlocksTrimed = _.map(minors, (minor) => +minor) // remove 0 trong mỗi minor block

  return _.join(_.compact(_.zipWith(minorBlocksTrimed, blocks, (minor, block) => {
    if (minor == 0 && block == "đồng") return "chẵn";
    if (minor == 0 && block !== "đồng") return "";
    const minorhandled = handleDigitToStr(minor, block);
    return `${minorhandled} ${block}`
  })), " ")
}


/**
 * @description thêm 0 vào trước cho đủ  12 số (123456 => 000000123456)
 */
function fillNumber(number) {
  const numberLength = `${number}`.length;
  const fillLength = (numberLength % 12 == 0) ? `${number}`
                                              : _.padStart(`${number}`, (parseInt(numberLength / 12) + 1) * 12, 0)
  const major = fillLength.match(/\d{12}/g)[0]
  return major
}


function handleDigitToStr(number, unit) {
  switch(`${number}`.length) {
    case 1: return oneDigitToStr(number);
    case 2: return twoDigitToStr(number);
    case 3: return threeDigitToStr(number);
  }
}


function addTextByContext(number) {
  switch (`${number}`.length) {
    case 1: return prevStr += "không trăm lẻ";
    case 2: return prevStr += "không trăm"   ;
    case 3: return prevStr += "không trăm"   ;
  }
}


function oneDigitToStr(number) {
  return number2str(number)
}

function twoDigitToStr(number) {
  if (number == 10) return oneDigitToStr(number); 
  let chuc = parseInt(number / 10);  // 25 => 2                              
  let donvi = number % 10;           // 25 => 5
  return chuc == 1  ? `mười ${oneDigitToStr(donvi)}`
                    : `${oneDigitToStr(chuc)} mươi ${oneDigitToStr(donvi)}`;
}

function threeDigitToStr(number) {
  let tram = parseInt(number / 100); // 325 => 3
  let chuc = number % 100;           // 325 => 25
  if (chuc < 10) chuc = `lẻ ${oneDigitToStr(chuc)}`;
  else { chuc = twoDigitToStr(chuc) };
  return `${oneDigitToStr(tram)} trăm ${chuc}`
}


const numberStr = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mười"]
function number2str(number) {
  return numberStr[number]
}

threeDigitToStr(103)
module.exports = convert