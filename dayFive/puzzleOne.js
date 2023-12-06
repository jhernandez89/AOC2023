const reader = require('../readFromTextFile.js');
const data = reader.readTextFile('./data.txt')
const { parseData, order } = require('./common.js')

const findMatches = (data) => {
  const { seeds } = data

  return locations = seeds.map(seed => {
    let currentLocation = seed
    order.forEach(currentConversion => {
      const current = data[currentConversion]
      for (const i in current) {
        const item = current[i]
        const {
          destination,
          sourceMax,
          source,
          rangeLength,
        } = item

        if (currentLocation >= source && currentLocation <= sourceMax) {
          const difference = currentLocation - source
          currentLocation = destination + difference
          return;
        }
      }
    })
    return currentLocation
  })

}

const getSmallestValue = (data) => {
  return Math.min(...data)
}

const main = () => {
  const dataParsed = parseData(data)
  const matches = findMatches(dataParsed)
  const smallestvalue = getSmallestValue(matches)
  return smallestvalue
}

console.log(main())