const reader = require('../readFromTextFile.js');
const data = reader.readTextFile('./data.txt')
const { parseData, order } = require('./common.js')

const findSubset = (ranges, sources, destination) => {
  const { sourceStart, sourceEnd } = sources
  ranges.unproccessed.forEach((range, i) => {
    const { seedStart, seedEnd } = range
    const destinationDifference = destination - sourceStart

    const outOfRange = seedStart > sourceEnd || seedEnd < sourceStart

    const processAll = seedStart >= sourceStart && seedEnd <= sourceEnd

    const processFirstHalf = seedStart >= sourceStart && seedEnd > sourceEnd
    const processSecondHalf = seedStart < sourceStart && seedEnd <= sourceEnd

    const fullOverlap = seedStart < sourceStart && seedEnd > sourceEnd



    if (outOfRange) {
      return;
    }

    // all seeds in array should be processed
    if (processAll) {
      const processedSeedStart = seedStart + destinationDifference
      const processedSeedEnd = seedEnd + destinationDifference

      ranges.unproccessed[i] = []
      ranges.processed.push({ seedStart: processedSeedStart, seedEnd: processedSeedEnd })
    }

    // first half of seeds should be processed
    if (processFirstHalf) {
      const processedSeedStart = seedStart + destinationDifference
      const processedSeedEnd = sourceEnd + destinationDifference

      ranges.unproccessed[i] = { seedStart: sourceEnd + 1, seedEnd: seedEnd }
      ranges.processed.push({ seedStart: processedSeedStart, seedEnd: processedSeedEnd })
    }

    // last half of seeds should be processed
    if (processSecondHalf) {
      const processedSeedStart = sourceStart + destinationDifference
      const processedSeedEnd = seedEnd + destinationDifference

      ranges.unproccessed[i] = { seedStart: seedStart, seedEnd: sourceStart - 1 }
      ranges.processed.push({ seedStart: processedSeedStart, seedEnd: processedSeedEnd })
    }

    // seeds exceed source range on both sides
    if (fullOverlap) {
      const processedSeedStart = sourceStart + destinationDifference
      const processedSeedEnd = sourceEnd + destinationDifference

      ranges.unproccessed[i] = { seedStart: seedStart, seedEnd: sourceStart - 1 }
      ranges.unproccessed.push({ seedStart: sourceEnd + 1, seedEnd: seedEnd })
      ranges.processed.push({ seedStart: processedSeedStart, seedEnd: processedSeedEnd })
    }

  })
}

const findMatches = (seeds, data) => {
  seeds.forEach(seedSet => {
    const { ranges } = seedSet
    order.forEach(currentConversion => {
      const current = data[currentConversion]
      for (const i in current) {
        const item = current[i]
        const {
          destination,
          sourceMax,
          source,
        } = item

        findSubset(ranges, { sourceStart: source, sourceEnd: sourceMax }, destination)
      }

      // reset processed items
      ranges.unproccessed = [...ranges.processed, ...ranges.unproccessed].filter(item => item.length !== 0)
      ranges.processed = []
    })
  })
  return seeds
}

const getSeedRanges = (seeds) => {
  return seeds.map((item, i) => {
    if (i % 2 !== 0) {
      const range = item
      const seedValue = seeds[i - 1]

      return {
        ranges: {
          unproccessed: [{
            seedStart: seedValue,
            seedEnd: seedValue + range - 1
          }],
          processed: []
        }
      }
    }
  }).filter(item => item)
}

const getSmallestValue = (data) => {
  let smallest = null
  data.forEach(row => {
    row.ranges.unproccessed.forEach(seeds => {
      const { seedStart } = seeds;
      if (!smallest) {
        smallest = seedStart
      } else if (seedStart < smallest) {
        smallest = seedStart
      }
    })
  })
  return smallest
}

const main = () => {
  const dataParsed = parseData(data)
  const seedRanges = getSeedRanges(dataParsed.seeds)
  const matches = findMatches(seedRanges, dataParsed)
  const smallestvalue = getSmallestValue(matches)
  return smallestvalue
}
console.log(main())
