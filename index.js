/* 
    unit   :  ty trieu ngan dong
    number : 123   456  789  123
    minor  : abc   abc  abc  abc
    major  : xxx   xxx  xxx  xxx 
 */

/** WORKFLOW
 *   input:                  103 056
 *   fill 0:         000 000 103 056
 *   remove 0:         0   0 103  56
 *   replace 0 = "":  ""  "" 103  56 => handleText
 *   zip           :  ty trieu ngan dong
 */

/** CASE
 *  2 số:  0-9    => không - chín
 *         10     => mười
 *         1x     => mười <x>
 *         xx     => <x> mươi <x>
 *  
 *  3 số:  x0x    => <x> trăm lẻ <x>
 */
const _ = require('lodash')

const defaultOptions = {
  unit: 'đồng',
  blocks: ['triệu', 'ngàn', 'tỷ', 'triệu', 'ngàn'],
  majorLimit: 18
}

/**
 * @param {string|number} number 
 * @param {object} options 
 */
function main(number = 0, options = defaultOptions) {
  try {
    let _number = `${+number}`

    if (!/^\d+$/g.test(_number)) return "Số không hợp lệ";

    _number = _number.slice(-options.majorLimit); // limited to 18 digits

    switch (_number.length) {
      case 1: case 2: case 3: return `${handleDigitToStr(number)} ${options.unit}`
    }

    const { unit } = options;
    options.blocks[5] || options.blocks.push(unit)

    return handleMajor(number, options.blocks, options)
  }
  catch (err) {
    return err.message
  }
}


function handleMajor(major, blocks, options) {
  major = fillNumber(major, options.majorLimit)
  const minorsString = major.match(/\d{3}/g)
  const minorsNumber = _.map(minorsString, (minor) => +minor) // remove 0 trong mỗi minor block

  const minorsMerge = _.zipWith(minorsNumber, blocks, (number, block) => ({ number, block }))
  const minorsCompacted = _.dropWhile(minorsMerge, item => item.number == 0)

  return _.reduce(minorsCompacted, (prev, curr, index, list) => {
    let prevStr = typeof prev !== "string" ? `${handleDigitToStr(prev.number)} ${prev.block}` : prev;
    let currStr = '';

    if (curr.number == 0) {
      if (curr.block == "tỷ") currStr = 'tỷ';
      if (curr.block == 'đồng') currStr = 'chẵn';
    }
    else {
      currStr = `${handleDigitToStr(curr.number)} ${curr.block}`
      switch (`${curr.number}`.length) {
        case 1: prevStr += " không trăm lẻ"; break;
        case 2: prevStr += " không trăm"; break;
      }
    }

    return `${prevStr} ${currStr}`;
  })
}


/**
 * @description thêm 0 vào trước cho đủ  12 số (123456 => 000000123456)
 */
function fillNumber(number, limit) {
  const numberLength = `${number}`.length;
  const fillLength = (numberLength % limit == 0) ? `${number}`
    : _.padStart(`${number}`, limit, 0)
  return fillLength
}


function handleDigitToStr(number) {
  switch (`${number}`.length) {
    case 1: return oneDigitToStr(number);
    case 2: return twoDigitToStr(number);
    case 3: return threeDigitToStr(number);
  }
}

const numberStr = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"]
function oneDigitToStr(number) {
  return numberStr[number]
}

function twoDigitToStr(number) {
  const chuc = parseInt(number / 10);  // 25 => 2                              
  const donvi = number % 10;           // 25 => 5

  const text_chuc = oneDigitToStr(chuc)
  const text_donvi = oneDigitToStr(donvi)

  if (chuc === 1 && donvi === 0) return "mười";                   // 10
  if (chuc === 1 && donvi !== 0) return `muời ${text_chuc}`;      // 1x
  if (chuc !== 1 && donvi === 0) return `${text_donvi} mươi`;     // 20, 30, ..., 90
  return `${text_chuc} mươi ${text_donvi}`;                       // xx
}

function threeDigitToStr(number) {
  const tram = parseInt(number / 100); // 325 => 3
  const chuc = number % 100;           // 325 => 25

  const text_tram = oneDigitToStr(tram)
  const text_chuc = chuc < 10 && chuc > 0 ? `lẻ ${oneDigitToStr(chuc)}` : twoDigitToStr(chuc)

  if (chuc === 0) return `${text_tram} trăm`;
  return `${text_tram} trăm ${text_chuc}`
}

console.log(main("1535432"))
module.exports = main