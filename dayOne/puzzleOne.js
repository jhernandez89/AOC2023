const reader = require('../readFromTextFile.js');
const data = reader.readTextFile('./data.txt')

const removeLetters = (data) => {
    return data.map(string => {
        return string.replace(/\D/g,'');
    })
}

const calculateTotal = (data) => {
    let total = 0
    data.forEach(item => {
        const firstNumber = item[0]
        const lastNumber = item[item.length - 1]

        total += Number(firstNumber+lastNumber)
    })
    return total
}

const main = () => {
    const lettersRemoved = removeLetters(data)
    const total = calculateTotal(lettersRemoved)
    
    return total
}

console.log(main())