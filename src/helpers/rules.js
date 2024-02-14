export function bonusByColor(bonus, color, cards) {
  return bonus * cards.filter(card => card.colors?.includes(color)).length
}

export function matches(match, card) {
  return Object.keys(match).reduce((pass, key) => {
    return pass && match[key] === card[key]
  }, true)
}
export function bonusWhenMatches(bonus, match, cards) {
  return bonus * cards.filter(card => matches(match, card)).length
}

export function countUniqueColors(cards) {  // cards: [ { name: 'Fdfds', ...},  {
  return new Set(cards
      .filter(card => card.colors)
      .flatMap(card => card.colors)
  ).size
}

export const allColors = ['Blue', 'Green', 'Purple', 'Red']