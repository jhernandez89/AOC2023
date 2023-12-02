const reader = require('../readFromTextFile.js');
const data = reader.readTextFile('./data.txt')

const numbers = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  ZERO: 0
}

const matches = (input, numberArray, i) => {
  // if it's a number just record it on the array
  if (!isNaN(input[i])) {
    numberArray.push(input[i])
    return numberArray
  }

  // record any string numbers and push them on the array
  for (const key in numbers) {
    if (input.substring(i).startsWith(key)) {
      numberArray.push(numbers[key])
    }
  }

  return numberArray
}

const getNumbers = (data) => {
  return data.map(inputString => {
    let numberArray = []
    let uCInputString = inputString.toUpperCase()
    for (let i in uCInputString) {
      numberArray = matches(uCInputString, numberArray, i)
    }
    return numberArray.join('')
  })
}

const calculateTotal = (data) => {
  let total = 0
  data.forEach(item => {
    const firstNumber = item[0]
    const lastNumber = item[item.length - 1]

    total += Number(firstNumber + lastNumber)
  })
  return total
}

const main = () => {
  const replaced = getNumbers(data)
  const total = calculateTotal(replaced)

  return total
}

console.log(main())
