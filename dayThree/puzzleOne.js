const reader = require('../readFromTextFile.js');
const data = reader.readTextFile('./data.txt')
const { parseData, positions, isNumber, isSymbol } = require('./common.js')


const testForSymbol = (currentX, currentY, data) => {
  let hasSymbol = false

  // test each adjecent position to see if it has a match
  positions.forEach(({ x, y }) => {
    const testX = currentX + x
    const testY = currentY + y
    if (data[testX]) {
      const cell = data[testX][testY]
      if (cell && isSymbol(cell)) {
        hasSymbol = true
      }
    }
  })

  return hasSymbol
}

const getNumberPositions = (data) => {
  let total = 0
  data.forEach((row, rowIndex) => {
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const column = row[columnIndex]
      if (isNumber(column)) {
        let hasSymbol = false
        let value = ''
        let currentIndex = columnIndex

        // need to test each number in the series
        while (isNumber(row[currentIndex])) {
          if (testForSymbol(rowIndex, currentIndex, data)) {
            hasSymbol = true
          }
          value += row[currentIndex]
          currentIndex += 1
        }

        // if it has a symbol add it
        if (hasSymbol) {
          total += Number(value)
        }

        columnIndex = currentIndex
      }
    }
  })

  return total
}



const main = () => {
  const dataParsed = parseData(data)
  const numberPositions = getNumberPositions(dataParsed)

  return numberPositions

}

console.log(main())
