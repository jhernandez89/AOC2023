const reader = require('../readFromTextFile.js');
const data = reader.readTextFile('./data.txt')
const { parseData } = require('./common.js')

const findNumberOfWinningDistances = (data) => {
  let winningNumbers = 1
  data.forEach((item) => {

    let currentWinningNumbers = 0
    const { time, distance } = item;

    for (let i = 0; i < time; i++) {
      const timeLeftAfterCharge = time - i
      const distanceTraveled = timeLeftAfterCharge * i

      if (distanceTraveled > distance) {
        currentWinningNumbers += 1
      }
    }

    winningNumbers *= currentWinningNumbers
  })

  return winningNumbers
}

const main = () => {
  const dataParsed = parseData(data)
  const winningNumbers = findNumberOfWinningDistances(dataParsed)
  return winningNumbers
}

console.log(main())