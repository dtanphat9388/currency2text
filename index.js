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
      return `${handleDigitToStr(number)} ${unit}`
    }
  }

  blocks[3] || blocks.push(unit)

  const major = fillNumber(number)
  const minorsString = major.match(/\d{3}/g)
  const minorsNumber = _.map(minorsString, (minor) => +minor) // remove 0 trong mỗi minor block

  const minorsCompacted = _.compact(_.zipWith(minorsNumber, blocks, (number, block) => {
    if (number == 0 && block == "đồng") return "chẵn";
    if (number == 0) return number;
    return {number, block}
  }))

  return _.reduce(minorsCompacted, (prev, curr, index, list) => {
    let prevStr = typeof prev !== "string" ? `${handleDigitToStr(prev.number)} ${prev.block}` : prev;
    let currStr = typeof curr !== "string" ? `${handleDigitToStr(curr.number)} ${curr.block}` : curr;

    if (currStr !== "chẵn") {
      switch (`${curr.number}`.length) {
        case 1: prevStr += " không trăm lẻ"; break;
        case 2: prevStr += " không trăm"   ; break;
      }
    }

    const unit = typeof currStr === "string" ? currStr : options.unit;
    return (list[-1] !== curr) ? `${prevStr} ${currStr}`
                               : `${prevStr} ${currStr} ${unit}`
  })
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


function handleDigitToStr(number) {
  switch(`${number}`.length) {
    case 1: return oneDigitToStr(number);
    case 2: return twoDigitToStr(number);
    case 3: return threeDigitToStr(number);
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
  if (chuc === 0) return `${oneDigitToStr(tram)} trăm`;
  if (chuc < 10 && chuc > 0) chuc = `lẻ ${oneDigitToStr(chuc)}`;
  else { chuc = twoDigitToStr(chuc) };
  return `${oneDigitToStr(tram)} trăm ${chuc}`
}


const numberStr = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mười"]
function number2str(number) {
  return numberStr[number]
}


module.exports = convert