let input = "140982174982174"

const UNIT = "đông"
const separators = [ "ngàn", "triệu", "tỷ" ]

console.log("separators\t", separators)
export default function main(input: string):string {

  if (!inputValidation(input)) {
    let blocks:string[];
    const firstBlock: number = input.length % 3
    if (firstBlock === 0) {
      blocks = input.match(/\d{3}/g)
    } else {
      const firstBlockNumber = [ input.slice(0, firstBlock) ]
      const restBlockNumber = input.slice(firstBlock).match(/\d{3}/g)
      blocks = [].concat(firstBlockNumber, restBlockNumber)
    }
    blocks.reverse()
    console.log("input\t\t", input)
    console.log('blocks\t\t', blocks)
  
    const blocksLength = blocks.length
    console.log('blocksLength\t', blocksLength)
    const textResult = handleBlocks(blocks, separators)
    console.log(textResult)
    return textResult
  }
  else {
    return ""
  }
}

function inputValidation(input) {
  const regexCheckAlphaExist = /[a-zA-Z]/g
  const strExisted = regexCheckAlphaExist.test(input)
  return strExisted
}

function handleBlocks(blocks: string[], units:string[]): string {
  const result = blocks.map((block, index) => {
    const unit = separators[index % 3]
    let _str:string;
    const numberBlock:number = +block // remove zero ahead
    switch (`${numberBlock}`.length) {
      case 1: _str = handleOneNumberToString(numberBlock); break;
      case 2: _str =  handleTwoNumberToString(numberBlock); break;
      case 3: _str = handleThreeNumberToString(numberBlock); break;
      default: break;
    }
    return `${_str} ${unit}`
  })
  return result.reverse().join(" ")
}

function handleOneNumberToString(block: number): string {
  const numberStr = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"]
  return numberStr[block]
}

function handleTwoNumberToString(block: number): string {
  const chuc = parseInt(`${block / 10}`)  // 25 => 2                              
  const donvi = block % 10; // 25 => 5

  const text_chuc = handleOneNumberToString(chuc)
  const text_donvi = handleOneNumberToString(donvi)

  if (chuc === 1 && donvi === 0) return "mười";                   // 10
  if (chuc === 1 && donvi !== 0) return `muời ${text_donvi}`;      // 1x
  if (chuc !== 1 && donvi === 0) return `${text_chuc} mươi`;     // 20, 30, ..., 90
  return `${text_chuc} mươi ${text_donvi}`;  
}

function handleThreeNumberToString(block:number): string {
  const tram = parseInt(`${block / 100}`) // 325 => 3
  const chuc = block % 100; // 325 => 25

  const text_tram = handleOneNumberToString(tram)
  const text_chuc = chuc < 10 && chuc > 0 ? `lẻ ${handleOneNumberToString(chuc)}` : handleTwoNumberToString(chuc)

  if (chuc === 0) return `${text_tram} trăm`;
  return `${text_tram} trăm ${text_chuc}`
}