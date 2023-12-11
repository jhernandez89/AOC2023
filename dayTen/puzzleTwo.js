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
      if (!parsed[nextX]) {
        return newPositions
      }
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

const getTotalSteps = (parsed, firstPositions, sPosition) => {
  let branches = firstPositions
  let totalSteps = 1
  const tracker = {}
  firstPositions.forEach(item => {
    const { x, y } = item;
    tracker[`x${x}y${y}`] = true
  })
  tracker[`x${sPosition.x}y${sPosition.y}`] == true
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
        tracker[coordinates] = true
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
  return tracker

}

const isInternalNumber = (coor, data, pipeline, sPosition) => {
  let { x, y } = coor
  let line = data[x]

  if (x === sPosition.x && y === sPosition.y) {
    return false
  }

  let current = data[x][y]
  let totalPasses = 0
  let previousBend
  while (current) {
    y -= 1
    current = data[x][y]
    if (!pipeline[`x${x}y${y}`]) {
      continue
    }
    if (current === '|') {
      totalPasses += 1
    }

    if (current === northWest) {
      previousBend = northWest
    }

    if (current === southWest) {
      previousBend = southWest
    }

    if (current === southEast && previousBend === northWest) {
      totalPasses += 1
    }

    if (current === northEast && previousBend === southWest) {
      totalPasses += 1
    }
  }
  const isOdd = totalPasses % 2 !== 0

  return isOdd
}

const findInternalSquaresTotal = (data, pipeline, sPosition) => {
  return data.reduce((total, row, rowIndex) => {
    return total + row.reduce((rowTotal, cell, columnIndex) => {
      if (!pipeline[`x${rowIndex}y${columnIndex}`] && isInternalNumber({ x: rowIndex, y: columnIndex }, data, pipeline, sPosition)) {
        return rowTotal + 1
      }
      return rowTotal
    }, 0)
  }, 0)
}

// I'm tired give me a break
const replaceS = (data, sPosition) => {
  const { x, y } = sPosition
  data[x][y] = 'F'
  return data
}



const main = () => {
  const parsed = parseData(data)
  const sPosition = findSPosition(parsed)
  const firstPositions = getFirstPositions(parsed, sPosition)
  const pipeline = getTotalSteps(parsed, firstPositions, sPosition)
  const parseWithoutS = replaceS(parsed, sPosition)
  const interalSquaresTotal = findInternalSquaresTotal(parseWithoutS, pipeline, sPosition)
  return interalSquaresTotal
}


console.log(main())