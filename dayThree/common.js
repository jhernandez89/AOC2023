var exports = module.exports = {};

exports.parseData = function (data) {
  return data.map(row => {
    return row.split('')
  })
}

exports.positions = [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
]

exports.isNumber = (number) => {
  return /^\d+$/.test(number)
}

exports.isSymbol = (char) => {
  return isNaN(char) && char !== '.'
}