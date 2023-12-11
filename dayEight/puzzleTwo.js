const reader = require('../readFromTextFile.js');
const data = reader.readTextFile('./data.txt')
const { parseData } = require('./common.js')

const getLastCharacter = (key) => {
  return key.charAt(key.length - 1)
}

const getAllAValues = (data) => {
  const aValues = {}
  for (const key in data) {
    let lastValue = getLastCharacter(key)
    if (lastValue === 'A') {

      aValues[key] = { currentValue: key, currentIteration: 0 }
    }
  }
  return aValues

}

const calculateLCM = (...arr) => {
  const gcd2 = (a, b) => {
    // Greatest common divisor of 2 integers
    if (!b) return b === 0 ? a : NaN;
    return gcd2(b, a % b);
  };
  const lcm2 = (a, b) => {
    // Least common multiple of 2 integers
    return a * b / gcd2(a, b);
  }
  // Least common multiple of a list of integers
  let n = 1;
  for (let i = 0; i < arr.length; ++i) {
    n = lcm2(arr[i], n);
  }
  return n;
};

const findLCM = (values) => {
  const arrayOfValues = Object.keys(values).map((key) => {
    return values[key].currentIteration
  })
  const answer = calculateLCM(...arrayOfValues)

}


const checkWinningConditions = (currentValues) => {
  for (const key in currentValues) {
    // console.log('current', currentValues[i])
    if (getLastCharacter(currentValues[key].currentValue) !== 'Z') {
      return true
    }
  }
  return false
}

const findTotalMoves = (data, input) => {
  let current = getAllAValues(data)


  for (const key in current) {
    let currentIndex = 0
    let moves = 0

    while (getLastCharacter(current[key].currentValue) !== 'Z') {

      let currentMove = input[currentIndex]
      current[key].currentValue = data[current[key].currentValue][currentMove]
      current[key].currentIteration = current[key].currentIteration + 1

      // iterate everything
      currentIndex = input[currentIndex + 1] ? currentIndex + 1 : 0
    }

  }

  return current
}

const main = () => {
  const parsed = parseData(data)
  const { dataMapped, input } = parsed
  const allAValues = getAllAValues(dataMapped)
  const totalMoves = findTotalMoves(dataMapped, input)
  const lCM = findLCM(totalMoves)

  return totalMoves
}


console.log(main())