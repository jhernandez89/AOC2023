const reader = require('../readFromTextFile.js');
const data = reader.readTextFile('./data.txt')
const { parseData, ranks, faceRanks } = require('./common.js')

const secondarySort = (cardSetOne, cardSetTwo) => {
  for (const i in cardSetOne) {
    const setOne = cardSetOne[i]
    const setTwo = cardSetTwo[i]
    if (setOne === setTwo) {
      continue
    }

    // 11 (joker) is considered the lowest card
    if (setOne === 11) {
      return -1
    }
    if (setTwo === 11) {
      return 1
    }

    return setOne - setTwo
  }

}

const findRank = (cardSet) => {

  let matchTotals = {}
  let matchTotalsWithJokers = {}
  let numberOfJokers = 0
  const counts = {}
  cardSet.forEach((x) => {
    if (x !== 11) {
      counts[x] = (counts[x] || 0) + 1;
    } else {
      numberOfJokers += 1
    }
  });

  let countsWithJokers = structuredClone(counts)
  for (const key in countsWithJokers) {
    countsWithJokers[key] += numberOfJokers
  }
  countsWithJokers['11'] = numberOfJokers



  for (const key in counts) {
    matchTotals[counts[key]] = (matchTotals[counts[key]] || 0) + 1
  }

  for (const key in countsWithJokers) {
    matchTotalsWithJokers[countsWithJokers[key]] = (matchTotalsWithJokers[countsWithJokers[key]] || 0) + 1
  }

  if (matchTotals[5] || matchTotalsWithJokers[5]) {
    return ranks.fiveOfAKind
  }

  if (matchTotals[4] || matchTotalsWithJokers[4]) {
    return ranks.fourOfAKind
  }

  if (
    (matchTotals[3] && matchTotals[2]) ||
    (matchTotals[3] && matchTotalsWithJokers[2]) ||
    (matchTotals[2] && matchTotalsWithJokers[3] && matchTotals[2] !== 1)
  ) {
    return ranks.fullHouse

  }
  if (matchTotals[3] || matchTotalsWithJokers[3]) {
    return ranks.threeOfAKind
  }

  if (
    (matchTotals[2] && matchTotals[2] === 2) ||
    (matchTotalsWithJokers[2] && matchTotalsWithJokers[2] === 2)
  ) {
    return ranks.twoPair
  }

  if (matchTotals[2] || matchTotalsWithJokers[2]) {
    return ranks.pair
  }

  return ranks.highCard
}

const sortCardsByRank = (cards) => {
  return cards.sort((a, b) => {
    if (a.rank !== b.rank) {
      return b.rank - a.rank
    }

    return secondarySort(a.cards, b.cards)

  })
}

const getTotal = (ranks) => {
  let total = 0
  ranks.forEach((item, i) => {
    const { bid, cards, rank } = item;
    total += bid * (i + 1)
  })

  return total
}

const main = () => {
  const dataParsed = parseData(data)
  const frequenciesAdded = dataParsed.map(cardSet => ({ ...cardSet, rank: findRank(cardSet.cards) }))
  const ranks = sortCardsByRank(frequenciesAdded)
  const total = getTotal(ranks)
  return total
}

console.log(main())