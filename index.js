const currency = "đồng"
const evenCurrency = "chẵn"
const units = [ "ngàn", "triệu", "tỷ" ]

export default function main(currencyNumber) {
  const isValidInput = checkValid(currencyNumber)
  if (!isValidInput) return

  /* remove 0 on start and spaces */
  const rawInput = `${+currencyNumber}`.trim()

  /* '1234' => '001234' */
  const input = addPadding(rawInput)

  let blocks = input.match(/\d{3}/g)
  let lastBlock = blocks.pop()

  const lastBlockText = handleBlock(lastBlock) + (lastBlock === '000' ? evenCurrency : currency)
  const blocksText = handleBlocks(blocks, units)

  return `${blocksText} ${lastBlockText}`
}

function checkValid(input) {
  const regexCheckAllDigits = /^\d+$/g
  const isAllDigits = regexCheckAllDigits.test(input)
  return isAllDigits
}

function addPadding(input) {
  const inputLenght = input.length
  const restBlockLength = inputLenght % 3

  if (restBlockLength === 0) return input
  else {
    const targetLength = inputLenght + (3 - restBlockLength)
    return input.padStart(targetLength, '0')
  }
}

function handleBlock(block) {
  if (block === '000') return ''

  let text = '';
  switch (`${block}`.length) {
    case 1: text = handleOneNumberToString(block); break;
    case 2: text = handleTwoNumberToString(block); break;
    case 3: text = handleThreeNumberToString(block); break;
    default: break;
  }

  return `${text}`
}

function handleBlocks(blocks, units) {
  blocks.reverse()

  const blocksLenght = blocks.length
  const result = blocks.map((block, index) => {
    if (index === blocksLenght - 1) {
      block = block.replace(/^0*/g, '')
    }
    return handleBlock(block)
  })

  const unitsLenght = units.length
  const resultWithUnit = result.map((block, index) => {
    if (!block) return ''
    const unitOfBlock = units[ index % unitsLenght ]
    return `${block} ${unitOfBlock}`
  })

  return resultWithUnit.filter(Boolean).reverse().join(" ")
}

function handleOneNumberToString(block) {
  const numberStr = [ "không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín" ]
  return numberStr[ block ]
}

function handleTwoNumberToString(block) {
  const chuc = parseInt(`${+block / 10}`)  // 25 => 2                              
  const donvi = +block % 10; // 25 => 5

  const text_chuc = handleOneNumberToString(chuc)
  const text_donvi = handleOneNumberToString(donvi)

  if (chuc === 1 && donvi === 0) return "mười";                  // 10
  if (chuc === 1 && donvi !== 0) return `muời ${text_donvi}`;    // 1x
  if (chuc !== 1 && donvi === 0) return `${text_chuc} mươi`;     // x0

  return `${text_chuc} mươi ${text_donvi}`;
}

function handleThreeNumberToString(block) {
  const tram = `${block}`[ 0 ] // 325 => 3
  const chuc = +block % 100; // 325 => 25

  const text_tram = handleOneNumberToString(tram)
  const text_chuc = chuc < 10 && chuc > 0 ? `lẻ ${handleOneNumberToString(chuc)}` : handleTwoNumberToString(chuc)

  if (chuc === 0) return `${text_tram} trăm`;

  return `${text_tram} trăm ${text_chuc}`
}