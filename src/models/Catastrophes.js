import { countUniqueColors, bonusByColor } from '../helpers/rules'

const catastrophes = [
  {
    name: 'The Big One',
    worldsEnd: '-2 to your score for each color missing from your trait pile',
    genePoolMod: -1,
    score: (currentPlayer) => {
      return -2 * (4 - countUniqueColors(currentPlayer.traitPile))
    }
  },
  {
    name: 'Nuclear Winter',
    worldsEnd: 'Discard 1 colorless trait from your trait pile',
    genePoolMod: -1,
    score: ()=>  0
  },
  {
    name: 'Super Volcano',
    worldsEnd: '-1 for every blue trait in your trait pile.',
    genePoolMod: -1,
    score: (currentPlayer) => bonusByColor(-1, 'Blue', currentPlayer.traitPile)
  },
  {
    name: 'Solar Flare',
    worldsEnd: '-1 for every purple trait in your trait pile.',
    genePoolMod: -1,
    score: (currentPlayer) => bonusByColor(-1, 'Purple', currentPlayer.traitPile)
  },
  {
    name: 'Pulse Event',
    worldsEnd: 'Discard 1 purple trait from your trait pile',
    genePoolMod: -1,
    score: () => 0
  },
  {
    name: 'Overpopulation',
    worldsEnd: '+4 points to the player(s) with the fewest traits in their trait pile',
    genePoolMod: 1,
    score: (currentPlayer, otherPlayers) => {
      const fewestCards = Math.min(
        ...([currentPlayer, ...otherPlayers]
          .map((player) => player.traitPile.length))
      )
      return currentPlayer.traitPile.length === fewestCards ? 4 : 0
    }
  },
  {
    name: 'AI Takeover',
    worldsEnd: 'Each colorless trait is now worth 2. Ignore all colorless trait effects. (Excluding dominants.)',
    genePoolMod: -1,
    score: (currentPlayer) => {
      for(let card of currentPlayer.traitPile) {
        if (card.colors)
          continue
        if (card.dominant)
          continue
        if (!card.modifications || !('AI Takeover' in card.modifications)) {
          card.modifications = {
            ...card?.modifications,
            'AI Takeover': {
              faceValue: card.faceValue,
              bonusScore: card.bonusScore,
            }
          }
        }
        card.faceValue = 2
        card.bonusScore = null
      }
      return 0
    },
    revert: true,
  },
  {
    name: 'Mass Extinction',
    worldsEnd: 'Discard 1 green trait from your trait pile.',
    genePoolMod: -1,
    score: () => 0
  },
  {
    name: 'Mega Tsunami',
    worldsEnd: 'Discard 1 red trait from your trait pile.',
    genePoolMod: -1,
    score: () => 0
  },
  {
    name: 'Ice Age',
    worldsEnd: '-1 for every red trait in your trait pile.',
    genePoolMod: -1,
    score: (currentPlayer) => bonusByColor(-1, 'Red', currentPlayer.traitPile)
  },
  {
    name: 'Deus Ex Machina',
    worldsEnd: 'Draw a card. Add its face value to your final score(+5 max). Then discard it.',
    genePoolMod: 0,
    choices: [-2, -1, 0, 1, 2, 3, 4, 5],
    score: (_currentPlayer, _otherPlayers, choice) => choice
  },
  {
    name: 'Glacial Meltdown',
    worldsEnd: 'Discard 1 blue trait from your trait pile',
    genePoolMod: -1,
    score: () => 0,
  },
  {
    name: 'Retrovirus',
    worldsEnd: '-1 for every green trait in your trait pile.',
    genePoolMod: -1,
    score: (currentPlayer) => bonusByColor(-1, 'Green', currentPlayer.traitPile)
  },
  {
    name: 'Grey Goo',
    worldsEnd: '-5 points to the player(s) with the most traits in their trait pile',
    genePoolMod: 0,
    score: (currentPlayer, otherPlayers) => {
      const mostCards = Math.max(
        ...([currentPlayer, ...otherPlayers]
          .map((player) => player.traitPile.length))
      )
      return currentPlayer.traitPile.length === mostCards ? -5 : 0
    }
  },
  {
    name: 'The Four Horsemen',
    worldsEnd: 'Discard 1 trait from your trait pile with a face value of 4 or higher.',
    genePoolMod: -1,
    score: () => 0
  }
]

export default catastrophes