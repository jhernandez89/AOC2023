const reader = require('../readFromTextFile.js');
const data = reader.readTextFile('./data.txt')
const { parseData, limits } = require('./common.js')

const findPossibleGames = (data) => {
  let total = 0
  data.forEach(game => {
    const { number, gameParsed } = game

    // for loops to easily exit once a game is found to be impossible
    for (const i in gameParsed) {
      const set = gameParsed[i]
      for (const y in set) {
        const color = set[y]
        const colorName = color[0]
        const colorValue = color[1]

        if (colorValue > limits[colorName]) {
          // First time its found impossible we can go to the next game
          return
        }
      }
    }
    // if we never found one that's impossible we can add it to the total
    total += number
  })
  return total
}


const main = () => {
  const dataParsed = parseData(data)
  const total = findPossibleGames(dataParsed)
  return total
}


console.log(main())