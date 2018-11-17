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
  if (number == 0) return `${number2str(number)} ${unit}`;

  blocks.push(unit)

  const majorBlock = fillNumber(number)
  const minorBlocks = majorBlock.match(/\d{3}/g)
  const minorBlocksTrimed = _.map(minorBlocks, (minorBlock) => +minorBlock) // remove 0 trong mỗi minor block

  return _.join(_.compact(_.zipWith(minorBlocksTrimed, blocks, (a, b) => {
    if (b == "đồng" && a == 0) return "chẵn";
    if (b !== "đồng" && a == 0) return "";
    const minorhandled = handleMinor(a, b);
    return `${minorhandled} ${b}`
  })), " ")
}


/**
 * @description thêm 0 vào trước cho đủ  12 số (123456 => 000000123456)
 */
function fillNumber(number) {
  const numberLength = `${number}`.length;
  const fillLength = (numberLength % 12 == 0) ? `${number}`
                                              : _.padStart(`${number}`, (parseInt(numberLength / 12) + 1) * 12, 0)
  const majorBlock = fillLength.match(/\d{12}/g)[0]
  return majorBlock
}


function handleMinor(number, unit) {
  if (!number) return undefined;
  
  switch(`${number}`.length) {
    case 1: return unit === "đồng" ? `lẻ ${number2str(number)}` : number2str(number);
    case 2: return unit === "đồng" ? `lẻ ${handleChuc(number)}` : handleChuc(number);
    case 3: {
      let tram = parseInt(number / 100); // 325 => 3
      let chuc = number % 100;           // 325 => 25
      return `${number2str(tram)} trăm ${handleChuc(chuc, 3)}`
    }
  }
}


function handleChuc(number, digits=2) {
  if (digits == 3 && number < 10) return `lẻ ${number2str(number)}`;
  if (number == 10) return number2str(number); 
  let chuc = parseInt(number / 10);  // 25 => 2                              
  let donvi = number % 10;           // 25 => 5
  return chuc == 1  ? `mười ${number2str(donvi)}`
                    : `${number2str(chuc)} mươi ${number2str(donvi)}`;
}


const numberStr = [ "không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mười"]
function number2str(number) {
  return numberStr[number]
}


module.exports = convert