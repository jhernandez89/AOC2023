const reader = require('../readFromTextFile.js');
const data = reader.readTextFile('./data.txt')
const { parseData } = require('./common.js')

const findCommonItems = (data) => {
    return data.map(item => {
        const { userNumbers, winningNumbers } = item
        const filteredArray = userNumbers.filter(value => winningNumbers.includes(value));
        return { totalCards: 1, winningLength: filteredArray.length }
    })
}

const findCardNumbers = (data) => {
    data.forEach((item, i) => {
        let { winningLength, totalCards } = item;
        let currentIndex = 1

        // increase all the cards that need to be increased
        while (winningLength > 0) {
            const currentItem = data[currentIndex + i]
            if (currentItem) {
                data[currentIndex + i].totalCards += 1 * totalCards
            }

            winningLength -= 1
            currentIndex += 1
        }
    })

    return data.reduce((winningNumber, a) => winningNumber + a.totalCards, 0);
}



const main = () => {
    const dataParsed = parseData(data)
    const commonItems = findCommonItems(dataParsed)
    const trueCardNumber = findCardNumbers(commonItems)

    return trueCardNumber
}

console.log(main())
