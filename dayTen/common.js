const parseData = function (data) {
  return data.map(item => item.split(''))
}

const directions = {
  north: 'NORTH',
  south: 'SOUTH',
  east: 'EAST',
  west: 'WEST'
}

const { north, east, south, west } = directions

const pipes = {
  northSouth: '|',
  eastWest: '-',
  northEast: 'L',
  northWest: 'J',
  southEast: 'F',
  southWest: '7'
}

const pipeMap = {
  'NORTH': {
    xDirection: - 1,
    yDirection: 0,
    pipes: [
      pipes.northSouth,
      pipes.southEast,
      pipes.southWest
    ]
  },
  'SOUTH': {
    xDirection: 1,
    yDirection: 0,
    pipes: [
      pipes.northSouth,
      pipes.northEast,
      pipes.northWest
    ]
  },
  'WEST': {
    xDirection: 0,
    yDirection: -1,
    pipes: [
      pipes.eastWest,
      pipes.southEast,
      pipes.northEast
    ]
  },
  'EAST': {
    xDirection: 0,
    yDirection: 1,
    pipes: [
      pipes.eastWest,
      pipes.southWest,
      pipes.northWest
    ]
  }
}

module.exports = {
  parseData,
  pipeMap,
  directions,
  pipes
};