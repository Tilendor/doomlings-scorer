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