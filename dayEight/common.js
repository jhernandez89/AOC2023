const parseData = function (data) {
  const input = data[0].split('')
  data.shift()
  data.shift()
  const dataMapped = {}
  data.forEach(input => {
    input = input.replace("= ", '')
    input = input.replace('(', '')
    input = input.replace(')', '')
    input = input.replace(', ', ' ')
    input = input.split(' ')
    dataMapped[input[0]] = {
      L: input[1],
      R: input[2]
    }
  })
  return { dataMapped, input }

}


module.exports = {
  parseData
};