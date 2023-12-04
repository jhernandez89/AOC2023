const reader = require('../readFromTextFile.js');
const data = reader.readTextFile('./data.txt')
const { parseData, positions, isNumber, isSymbol } = require('./common.js')

const generateUUID = () => {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

const testSymbols = (currentX, currentY, numberPositions) => {
  const uniqueValues = {}


  // test each adjecent position to see if it has a match
  positions.forEach(({ x, y }) => {
    const testX = currentX + x
    const testY = currentY + y

    // see if there's a number on the grid at this position
    const number = numberPositions[`x${testX}y${testY}`]
    if (number) {
      const { value, identifier } = number
      uniqueValues[identifier] = value
    }
  })

  // if it has two surround numbers add i
  if (Object.keys(uniqueValues).length === 2) {
    return Object.keys(uniqueValues).reduce((previous, key) => previous * uniqueValues[key], 1)
  }

  return 0
}

const findTotal = (data, numberPositions) => {
  let total = 0
  data.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if (column === '*') {
        const gearTotal = testSymbols(rowIndex, columnIndex, numberPositions)
        total += gearTotal
      }
    })
  })

  return total
}

const getNumberPositions = (data) => {
  const positions = {}
  data.forEach((row, rowIndex) => {
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const column = row[columnIndex]
      if (isNumber(column)) {
        let value = ''
        let currentIndex = columnIndex
        const uuid = generateUUID()

        const indexes = []

        // need to test each number in the series
        while (isNumber(row[currentIndex])) {
          indexes.push(currentIndex)


          value += row[currentIndex]
          currentIndex += 1
        }

        indexes.forEach(yPosition => {
          // need to get a map of all the number positions
          positions[`x${rowIndex}y${yPosition}`] = {
            value: Number(value),
            // need to add a unique identifier in case there's adjacent numbers that are the same value
            identifier: uuid
          }
        })

        columnIndex = currentIndex
      }
    }
  })

  return positions
}



const main = () => {
  const dataParsed = parseData(data)
  const numberPositions = getNumberPositions(dataParsed)
  const total = findTotal(dataParsed, numberPositions)

  return total

}

console.log(main())

