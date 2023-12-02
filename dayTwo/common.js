var exports = module.exports = {};

exports.parseData = function (data) {

    return data.map(game => {
        const splitByColon = game.split(': ')
        const number = Number(splitByColon[0].split(' ')[1])

        const splitBySets = splitByColon[1].split('; ')
        const gameParsed = splitBySets.map(set => {
            const setSplit = set.split(', ')
            return setSplit.map(item => {
                const colorAndNumber = item.split(' ')
                const color = colorAndNumber[1]
                const numberValue = colorAndNumber[0]

                return [color, Number(numberValue)]

            })

        })

        return { number, gameParsed }
    })
}

exports.limits = { red: 12, green: 13, blue: 14 }