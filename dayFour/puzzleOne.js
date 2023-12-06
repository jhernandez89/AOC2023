const reader = require('../readFromTextFile.js');
const data = reader.readTextFile('./data.txt')
const { parseData } = require('./common.js')

const findCommonItems = (data) => {
    return data.map(item => {
        const { userNumbers, winningNumbers } = item
        const filteredArray = userNumbers.filter(value => winningNumbers.includes(value));
        return filteredArray
    })
}

const findTotalOfWinningNumbers = (data) => {
    const eachGameValue = data.map(item => {
        let total = 0

        item.forEach(item => {
            if (total === 0) {
                total = 1
            } else {
                total *= 2
            }
        })

        return total
    })

    return eachGameValue.reduce((winningNumber, a) => winningNumber + a, 0);

}

const main = () => {
    const dataParsed = parseData(data)
    const commonItems = findCommonItems(dataParsed)
    const total = findTotalOfWinningNumbers(commonItems)
    return total
}

console.log(main())
