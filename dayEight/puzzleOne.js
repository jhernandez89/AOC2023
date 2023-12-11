const reader = require('../readFromTextFile.js');
const data = reader.readTextFile('./data.txt')
const { parseData } = require('./common.js')

const findTotalMoves = (data, input) => {
  let current = 'AAA'
  let currentIndex = 0
  let moves = 0

  while (current !== 'ZZZ') {
    let currentMove = input[currentIndex]
    current = data[current][currentMove]

    // iterate everything
    moves += 1
    currentIndex = input[currentIndex + 1] ? currentIndex + 1 : 0
  }

  return moves
}

const main = () => {
  const parsed = parseData(data)
  const { dataMapped, input } = parsed
  const totalMoves = findTotalMoves(dataMapped, input)

  return totalMoves
}


console.log(main())