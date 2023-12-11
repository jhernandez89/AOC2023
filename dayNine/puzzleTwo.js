const reader = require('../readFromTextFile.js');
const data = reader.readTextFile('./data.txt')
const { parseData } = require('./common.js')

const getTotal = (lines) => {
  let total = 0
  lines.forEach(item => {
    const lastLine = item[item.length - 1]
    const firstValue = lastLine[0]
    total += firstValue
  })

  return total

}

const findPreviousNumbersLine = (line) => {
  let nextNumber = 0
  line.forEach(iteration => {
    nextNumber = iteration[0] - nextNumber
    iteration.unshift(nextNumber)
    start = nextNumber
  })
  return line
}

const findPreviousNumbers = (data) => {
  return data.map(line => {
    return findPreviousNumbersLine(line)
  })
}

const successCondition = (line) => {
  return line.filter(item => item !== 0).length === 0
}

const findZeroLines = (line) => {
  let newLine = structuredClone(line)
  const allLines = [newLine]
  while (successCondition(newLine) === false) {
    const nextLine = []
    newLine.forEach((item, i) => {
      const nextItem = newLine[i + 1]
      if (typeof nextItem !== 'undefined') {
        nextLine.push(nextItem - item)
      }
    })
    newLine = structuredClone(nextLine)
    allLines.unshift(structuredClone(nextLine))
  }
  return allLines
}

const findZeros = (dataParsed) => {
  return dataParsed.map(line => {
    return findZeroLines(line)
  })
}


const main = (data) => {
  const dataParsed = parseData(data)
  const zeros = findZeros(dataParsed)
  const previousNumbers = findPreviousNumbers(zeros)
  const total = getTotal(previousNumbers)
  return total
}

console.log(main(data))
