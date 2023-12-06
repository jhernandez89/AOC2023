var exports = module.exports = {};

const map = {
  seeds: 'seeds:',
  seedToSoil: 'seed-to-soil',
  soilToFertilizer: 'soil-to-fertilizer',
  fertilizerToWater: 'fertilizer-to-water',
  waterToLight: 'water-to-light',
  lightToTempature: 'light-to-temperature',
  tempatureToHumidity: 'temperature-to-humidity',
  humidityToLocation: 'humidity-to-location',
}
exports.order = [
  'seedToSoil',
  'soilToFertilizer',
  'fertilizerToWater',
  'waterToLight',
  'lightToTempature',
  'tempatureToHumidity',
  'humidityToLocation',
]

exports.parseData = function (data) {
  const seeds = []
  const seedToSoil = []
  const soilToFertilizer = []
  const fertilizerToWater = []
  const waterToLight = []
  const lightToTempature = []
  const tempatureToHumidity = []
  const humidityToLocation = []

  let current = null
  data.forEach(input => {

    if (input.trim() === '') {
      isSeeds = false
      current = null
    }

    if (current) {
      const inputSeperated = input.split(' ')

      current.push({
        destination: Number(inputSeperated[0]),
        source: Number(inputSeperated[1]),
        sourceMax: Number(inputSeperated[1]) + Number(inputSeperated[2]) - 1,
        rangeLength: Number(inputSeperated[2])
      })
    }

    if (input.includes(map.seeds)) {
      const inputSeperated = input.split(' ')
      inputSeperated.shift()
      inputSeperated.forEach(item => seeds.push(Number(item)))
    }
    if (input.includes(map.seedToSoil)) {
      current = seedToSoil
    }
    if (input.includes(map.soilToFertilizer)) {
      current = soilToFertilizer
    }
    if (input.includes(map.fertilizerToWater)) {
      current = fertilizerToWater
    }
    if (input.includes(map.waterToLight)) {
      current = waterToLight
    }
    if (input.includes(map.lightToTempature)) {
      current = lightToTempature
    }
    if (input.includes(map.tempatureToHumidity)) {
      current = tempatureToHumidity
    }
    if (input.includes(map.humidityToLocation)) {
      current = humidityToLocation
    }


  })
  return {
    seeds,
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTempature,
    tempatureToHumidity,
    humidityToLocation,
  }
}

