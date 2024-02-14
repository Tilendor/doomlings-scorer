import {allColors} from "./rules"
export function applyDefaults(defaults, cards) {
  return cards.map( (card) => {
    return {
      ...defaults,
      ...card
    }
  })
}


export function chunk(inputArray, perChunk) {
  return inputArray.reduce((all, one, i) => {
    const ch = Math.floor(i / perChunk);
    all[ch] = [].concat((all[ch] || []), one);
    return all
  }, [])
}

export function cardsByColor(cards) {
  const result = []
  for(const color of [null, ...allColors]){
    const filteredCards = cards.filter(card => {
      return color ?
        card.colors?.includes(color)
        : card.colors == null
    })
    result.push({color: (color || 'colorless'), colorCards: filteredCards})
  }
  return result
}

export function getGenePoolMod(card, targetAll) {
  if (targetAll) {
    return card.effects
      ?.filter(effect => effect.target === 'all' && effect.genePoolMod)
      .reduce((gp, effect) => {
        return gp + effect.genePoolMod
      }, 0) || 0

  } else {
    return card.effects
      ?.filter(effect => effect.target !== 'all' && effect.genePoolMod)
      .reduce((gp, effect) => {
        return gp + effect.genePoolMod
      }, 0) || 0
  }
}

export function revert(name, allPlayers) {
  for(const player of allPlayers) {
    for(let cardIndex in player.traitPile){
      const card = player.traitPile[cardIndex]
      if (!card.modifications || !(name in card.modifications))
        continue
      player.traitPile[cardIndex] = {
        ...card,
        ...card.modifications[name]
      }
      delete player.traitPile[cardIndex].modifications[name]
    }
  }
}