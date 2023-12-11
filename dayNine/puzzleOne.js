const reader = require('../readFromTextFile.js');
const data = reader.readTextFile('./data.txt')
const { parseData } = require('./common.js')

const getTotal = (lines) => {
  let total = 0
  lines.forEach(item => {
    const lastLine = item[item.length - 1]
    const lastValue = lastLine[lastLine.length - 1]
    total += lastValue
  })

  return total

}

const findNextNumberLine = (line) => {
  let nextNumber = 0
  line.forEach(iteration => {
    nextNumber = iteration[iteration.length - 1] + nextNumber
    iteration.push(nextNumber)
    start = nextNumber
  })
  return line
}

const findNextNumbers = (data) => {
  return data.map(line => {
    return findNextNumberLine(line)
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
  const nextNumbers = findNextNumbers(zeros)
  const total = getTotal(nextNumbers)
  return total
  // return zeros
}

console.log(main(data))