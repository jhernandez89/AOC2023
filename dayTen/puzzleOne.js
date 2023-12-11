const reader = require('../readFromTextFile.js');
const data = reader.readTextFile('./data.txt')
const { parseData, pipeMap, pipes, directions } = require('./common.js')

const {
  northSouth,
  eastWest,
  northEast,
  northWest,
  southEast,
  southWest,
} = pipes

const { north, south, east, west } = directions


const getNextDirection = (direction, itemInDirection) => {
  if (direction === north) {
    if (itemInDirection === southEast) {
      return east
    }
    if (itemInDirection === southWest) {
      return west
    }
    if (itemInDirection === northSouth) {
      return north
    }
  }
  if (direction === south) {
    if (itemInDirection === northEast) {
      return east
    }
    if (itemInDirection === northWest) {
      return west
    }
    if (itemInDirection === northSouth) {
      return south
    }
  }
  if (direction === west) {
    if (itemInDirection === northEast) {
      return north
    }
    if (itemInDirection === southEast) {
      return south
    }
    if (itemInDirection === eastWest) {
      return west
    }
  }
  if (direction === east) {
    if (itemInDirection === northWest) {
      return north
    }
    if (itemInDirection === southWest) {
      return south
    }
    if (itemInDirection === eastWest) {
      return east
    }
  }
}

const findSPosition = (data) => {
  let x
  let y

  data.forEach((row, xIndex) => {
    row.forEach((cell, yIndex) => {
      if (cell === 'S') {
        x = xIndex
        y = yIndex
      }
    })
  })
  return { x, y }
}

const getFirstPositions = (parsed, sPosition) => {
  let branches = [sPosition]
  const tracker = {}
  let newBranches = []
  branches.forEach((branch) => {
    const { x, y } = branch
    const nextPostions = Object.keys(pipeMap).reduce((newPositions, key) => {
      const directionObject = pipeMap[key]
      const { xDirection, yDirection, pipes } = directionObject
      const nextY = y + yDirection
      const nextX = x + xDirection
      const itemInDirection = parsed[nextX][nextY]
      if (pipes.includes(itemInDirection) && !tracker[`x${nextX}y${nextY}`]) {
        newPositions.push({ x: nextX, y: nextY, nextDirection: getNextDirection(key, itemInDirection) })
      }
      return newPositions
    }, [])
    newBranches.push.apply(newBranches, nextPostions)
  })

  return newBranches
}

const getTotalSteps = (parsed, firstPositions) => {
  let branches = firstPositions
  let totalSteps = 1
  const tracker = {}
  // firstPositions.forEach(item => {
  //   tracker[`x${item.x}y${item.y}`] == totalSteps
  // })
  let limiter = 0
  while (true) {
    totalSteps += 1

    const newPostions = branches.reduce((newPositions, item) => {
      const { x, y, nextDirection } = item;
      const direction = pipeMap[nextDirection]
      const { xDirection, yDirection, pipes } = direction
      const nextY = y + yDirection
      const nextX = x + xDirection
      const itemInDirection = parsed[nextX][nextY]
      const coordinates = `x${nextX}y${nextY}`


      if (pipes.includes(itemInDirection) && !tracker[coordinates]) {
        tracker[coordinates] = totalSteps
        const nextPosition = { x: nextX, y: nextY, nextDirection: getNextDirection(item.nextDirection, itemInDirection) }
        newPositions.push(nextPosition)

      }
      return newPositions
    }, [])
    branches = structuredClone(newPostions)

    if (branches.length === 0) {
      break
    }

  }
  return totalSteps - 1

}



const main = () => {
  const parsed = parseData(data)
  const sPosition = findSPosition(parsed)
  const firstPositions = getFirstPositions(parsed, sPosition)
  const totalSteps = getTotalSteps(parsed, firstPositions)
  return totalSteps
}


console.log(main())