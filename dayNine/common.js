const parseData = function (data) {
  return data.map(item => {
    return item.split(' ').map(item => Number(item))
  })
}


module.exports = {
  parseData
};