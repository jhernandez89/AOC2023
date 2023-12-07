var exports = module.exports = {};

exports.parseData = function (data) {
  const time = data[0].split(' ').filter(item => !isNaN(item) && item !== '')
  const distance = data[1].split(' ').filter(item => !isNaN(item) && item !== '')
  return time.map((item, i) => {
    return { time: Number(item), distance: Number(distance[i]) }
  })
}

