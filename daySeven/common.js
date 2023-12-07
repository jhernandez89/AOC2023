

const parseData = function (data) {
  return data.map(item => {
    const itemSplit = item.split(' ')
    const cardsNumerical = itemSplit[0].split('').map(item => faceRanks[item] || Number(item))
    return { cards: cardsNumerical, bid: Number(itemSplit[1]) }
  })
}

const findRank = (cardSet) => {

  let matchTotals = {}
  const counts = {}
  cardSet.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });

  for (const key in counts) {
    matchTotals[counts[key]] = (matchTotals[counts[key]] || 0) + 1
  }

  if (matchTotals[5]) {
    return ranks.fiveOfAKind
  }
  if (matchTotals[4]) {
    return ranks.fourOfAKind
  }
  if (matchTotals[3] && matchTotals[2]) {
    return ranks.fullHouse
  }
  if (matchTotals[3]) {
    return ranks.threeOfAKind
  }
  if (matchTotals[2] && matchTotals[2] === 2) {
    return ranks.twoPair
  }
  if (matchTotals[2]) {
    return ranks.pair
  }

  return ranks.highCard
}


const ranks = {
  fiveOfAKind: 0,
  fourOfAKind: 1,
  fullHouse: 2,
  threeOfAKind: 3,
  twoPair: 4,
  pair: 5,
  highCard: 6
}

const faceRanks = {
  'A': 14,
  'K': 13,
  'Q': 12,
  'J': 11,
  'T': 10
}

module.exports = {
  ranks,
  faceRanks,
  parseData,
  findRank
};