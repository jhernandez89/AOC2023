const reader = require('../readFromTextFile.js');
const data = reader.readTextFile('./data.txt')
const { parseData } = require('./common.js')

const findLimits = (data) => {
  let total = 0
  data.forEach(game => {
    const limits = { blue: 1, red: 1, green: 1 }
    const { gameParsed } = game

    for (const i in gameParsed) {
      const set = gameParsed[i]
      for (const y in set) {
        const color = set[y]
        const colorName = color[0]
        const colorValue = color[1]

        if (colorValue > limits[colorName]) {
          // if number of blocks is greater than the current limit, set it to the limit
          limits[colorName] = colorValue
        }
      }
    }

    total += limits.blue * limits.green * limits.red
  })
  return total
}


const main = () => {
  const dataParsed = parseData(data)
  const total = findLimits(dataParsed)
  return total
}


console.log(main())