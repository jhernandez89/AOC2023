var exports = module.exports = {};

exports.parseData = function (data) {

    return data.map(input => {
        const seperatedCard = input.split(': ')
        seperatedNumbers = seperatedCard[1].split(' | ')
        const userNumbers = seperatedNumbers[0].split(' ').filter(item => item !== '')
        const winningNumbers = seperatedNumbers[1].split(' ').filter(item => item !== '')
        return { userNumbers, winningNumbers }
    })
}

