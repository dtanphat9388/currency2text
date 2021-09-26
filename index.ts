type block = string | number

const currency = "đông"
const units = [ "ngàn", "triệu", "tỷ" ]
export default function main(input:string): string {
  if (!inputValidation(input)) {
    let blocks:string[];

    const firstBlock:number = input.length % 3
    if (firstBlock === 0) {
      blocks = input.match(/\d{3}/g)
    } else {
      const firstBlockNumber = [ input.slice(0, firstBlock) ]
      const restBlockNumber = input.slice(firstBlock).match(/\d{3}/g)
      blocks = [].concat(firstBlockNumber, restBlockNumber)
    }

    blocks.reverse()

    const unitsLenght = units.length
    const result = blocks.map((block, index) => {
      const unitOfBlock = units[index % unitsLenght]
      return handleBlock(block, unitOfBlock)
    })
    return result.reverse().join(" ")
  }
  else {
    return ""
  }
}

function inputValidation(input:string):boolean {
  const regexCheckAlphaExist = /[a-zA-Z]/g
  const strExisted = regexCheckAlphaExist.test(input)
  return strExisted
}

function handleBlock(block:string, unit:string): string {
  let text:string = '';
  switch (`${block}`.length) {
    case 1: text = handleOneNumberToString(block); break;
    case 2: text =  handleTwoNumberToString(block); break;
    case 3: text = handleThreeNumberToString(block); break;
    default: break;
  }
  return `${text} ${unit}`
}

function handleOneNumberToString(block:block): string {
  const numberStr = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"]
  return numberStr[block]
}

function handleTwoNumberToString(block:block): string {
  const chuc = parseInt(`${+block / 10}`)  // 25 => 2                              
  const donvi = +block % 10; // 25 => 5

  const text_chuc = handleOneNumberToString(chuc)
  const text_donvi = handleOneNumberToString(donvi)

  if (chuc === 1 && donvi === 0) return "mười";                  // 10
  if (chuc === 1 && donvi !== 0) return `muời ${text_donvi}`;    // 1x
  if (chuc !== 1 && donvi === 0) return `${text_chuc} mươi`;     // x0
  return `${text_chuc} mươi ${text_donvi}`;  
}

function handleThreeNumberToString(block:block): string {
  const tram = `${block}`[0] // 325 => 3
  const chuc = +block % 100; // 325 => 25

  const text_tram = handleOneNumberToString(tram)
  const text_chuc = chuc < 10 && chuc > 0 ? `lẻ ${handleOneNumberToString(chuc)}` : handleTwoNumberToString(chuc)

  if (chuc === 0) return `${text_tram} trăm`;
  return `${text_tram} trăm ${text_chuc}`
}