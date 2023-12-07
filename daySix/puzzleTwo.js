const reader = require('../readFromTextFile.js');
const data = reader.readTextFile('./data.txt')
const { parseData } = require('./common.js')

const combineNumbers = (data) => {
  let timeCombined = ''
  let distanceCombined = ''

  data.forEach(item => {
    const { time, distance } = item;
    timeCombined += time
    distanceCombined += distance
  })

  return [{
    time: Number(timeCombined),
    distance: Number(distanceCombined)
  }]
}

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
  const createSuperNumber = combineNumbers(dataParsed)
  const winningNumbers = findNumberOfWinningDistances(createSuperNumber)
  return winningNumbers
}

console.log(main())