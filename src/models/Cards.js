import { bonusByColor, matches, bonusWhenMatches, countUniqueColors, allColors } from "../helpers/rules";
import { applyDefaults } from "../helpers/utils";


/* Card Template
{
  deck: 'Base',
  quantity: 1,
  name: 'Flatuence',
  flavorText: '?',
  faceValue: 3,
  dominant: false,
  colors: ['Red','Green','Blue','Purple'],
  effects: [
    { type: 'action|active|instant|reaction|bonus score|condition|end of world|out of turn',
      text: '',
      choices: [],
      target: 'all|self|opponents' 
    },
  ],
  bonusScore: (currentPlayer, otherPlayers, choice) => { return 0 }
},
*/


const cards = applyDefaults({ deck: 'Base', quantity: 1, faceValue: 0 }, [
  ...applyDefaults({ dominant: true }, [
    {
      name: 'Denial',
      flavorText: "Catastrophe schmatastrophe",
      faceValue: 4,
      effects: [
        { type: 'active', text: "Ignore the next catastrophe. Warning: You cannot ignore The Four Horsemen." }
      ]
    },
    {
      name: 'Optimistic Nihilism',
      flavorText: "Nothing matters!",
      faceValue: 4,
      effects: [
        { type: 'instant', text: "Bring about the next catastrophe. Skip all turns. Ignore all age effects along the way. Do not stabilize." }
      ]
    },
    {
      name: 'Faith',
      flavorText: "Reason is in fact the path to faith, and faith takes over when reason can say no more.",
      faceValue: 4,
      effects: [
        { 
          type: 'end of world', 
          text: "At World's End: You may change all of your traits of 1 color to 1 alternative color.",
          choices: allColors
        }
      ]
    },
  ]),
  {
    name: 'Morality',
    flavorText: "I'll let him keep his lunch money. It's the right thing to do.",
    faceValue: 5,
    effects: [
      { type: 'condition', text: "To play, you must give 1 positive value trait from your trait pile to an opponent." }
    ]
  },
  {
    name: 'Delicious',
    flavorText: "To save a species from extinction, figure out how to eat it.",
    faceValue: 4,
    effects:[
      { type: 'condition', text: "To play, you must have at least 1 colorless trait in your trait pile." }
    ]
  },
  {
    name: 'Flatulence',
    flavorText: "5-alarm chili? Fire in the hole!",
    faceValue: 3
  },
  {
    name: 'Just',
    flavorText: "Are these scales balanced? I can't see a thing!",
    faceValue: 2,
    effects: [
      { type: 'active', text: "+1 Gene Pool" }
    ]
  },
  {
    name: 'Doting',
    flavorText: "OK! These are the last of the cookies. Unless you want more. I'll make more.",
    faceValue: 2,
    effects: [
      { type: 'action', text: "Give an opponent 1 card from your hand." }
    ]
  },
  {
    name: 'Prepper',
    flavorText: "More like Apocalypse No.",
    faceValue: 2,
    effects: [
      { type: 'end of world', text: "At World's End: Choose a World's End effect from the 3 catastrophes played for players to end on." }
    ]
  },
  {
    name: 'Mitochondrion',
    flavorText: "An organelle resembling the worst hole on a miniature golf course.",
    faceValue: 1,
    effects: [
      { type: 'active', text: "+1 Gene Pool" }
    ]
  },
  {
    name: 'Introspective',
    flavorText: "Puddle, puddle on the street, will I ever feel complete?",
    faceValue: 1,
    effects: [
      { type: 'action', text: "Draw 4 cards." }
    ]
  },
  {
    name: 'Saudade',
    flavorText: "I saw it, Dad. Now let's go!",
    faceValue: 1,
    effects: [
      { type: 'bonus score', text: "+1 for each different color in your hand" }
    ],
    bonusScore: (currentPlayer) => countUniqueColors(currentPlayer.hand)
  },
  {
    name: "Eloquence",
    flavorText: "Say the right thing, then stop talking.",
    faceValue: 1,
    effects: [
      { type: 'end of world', text: "At World's End: Play another trait. Ignore its action." }
    ]
  },
  {
    name: 'Fear',
    flavorText: "Are they...are they d-done playing yet?",
    faceValue: 1
  },
  {
    name: 'Late',
    flavorText: "Sorry! There was a fire, and traffic, and the line for coffee was really long...",
    faceValue: 1,
    effects: [
      { type: 'out of turn', text: "You may play Late from your hand after you stabilize" }
    ]
  },
  {
    name: 'The Third Eye',
    flavorText: "You like it? Thanks. I just awoke it.",
    effects: [
      { type: 'action', text: "Take a peek at the next age. Play another trait." }
    ]
  },
  {
    name: 'Mindful',
    flavorText: "As you walk and eat and travel, be where you are. Otherwise you will miss out on most of your life.",
    effects: [
      { type: 'bonus score', text: "+1 for each colorless trait in your trait pile. (Including this one.)" }
    ],
    bonusScore: (currentPlayer) => currentPlayer.traitPile.filter(card => !card.colors).length
  },
  {
    name: 'Boredom',
    flavorText: "I don't know. What do YOU want to do?",
    effects: [
      { type: 'bonus score', text: "Value is equal to the number of cards in your hand with effects." }
    ],
    bonusScore: (currentPlayer) => currentPlayer.hand.filter(card => card.effects).length
  },
  {
    name: 'Gratitude',
    flavorText: "Gee, I really appreciate this. Thanks. Thank you.",
    effects: [
      { type: 'bonus score', text: "Value is equal to the number of different colors in your trait pile." }
    ],
    bonusScore: (currentPlayer) => countUniqueColors(currentPlayer.traitPile)
  },
  {
    name: 'Altruistic',
    flavorText: "Can I borrow a few bucks? I donated all my money to charity.",
    effects: [
      { type: 'bonus score', text: "Value is equal to the size of your Gene Pool" }
    ],
    bonusScore: (currentPlayer) => Number(currentPlayer.genePool || 0)
  },
  {
    name: 'Self-Awareness',
    flavorText: "Huh, I guess I'm not a vampire.",
    faceValue: -1,
    effects: [
      { type: 'out of turn', text: "You may play Self-Awareness from your hand into an opponent's trait pile at any time." }
    ]
  },
  {
    name: 'Confusion',
    flavorText: 'And you might ask yourself, "Why does this trait exist?"',
    faceValue: -2
  },
  ...applyDefaults({ colors: ['Purple'] }, [
    ...applyDefaults({ dominant: true }, [
      {
        name: 'Viral',
        flavorText: "Like, share, comment, and be sure to smash that suscribe button!",
        faceValue: 2,
        effects: [
          { type: 'bonus score', text: "At World's End: Choose a color. Opponents receive -1 for each trait of that color in their trait pile." },
          { 
            type: 'end of world', 
            text: "At World's End: Choose a color. Opponents receive -1 for each trait of that color in their trait pile.", 
            target: 'opponents',
            choices: allColors
          }
        ],
        bonusScore: (currentPlayer, _otherPlayers, choice) => {
          return bonusByColor(-1, choice, currentPlayer.traitPile)
        }
      },
      {
        name: 'Vampirism',
        flavorText: "I vant to sock your blahhhd.",
        faceValue: 3,
        effects: [
          { type: 'action', text: "Steal a trait from an opponent's trait pile. Play its action." }
        ]
      },
      {
        name: 'Camouflage',
        flavorText: 'Blend in with the wilderness or stand out at a wedding.',
        faceValue: 1,
        effects: [
          { type: 'active', text: "+1 Gene Pool" },
          { type: 'bonus score', text: "+1 for each card in your hand." }
        ],
        bonusScore: (currentPlayer) => {
          return currentPlayer.hand.length
        }
      },
    ]),
    {
      name: 'Nocturnal',
      flavorText: "The dark is my muse.",
      faceValue: 3
    },
    {
      name: 'Adorable',
      flavorText: "Hey, you look like a sucker. Rub my belly. Now, get in this lava so I can float to safety.",
      faceValue: 4
    },
    {
      name: 'Fine Motor Skills',
      flavorText: "I have traced a shape!",
      faceValue: 2
    },
    {
      name: 'Memory',
      flavorText: "The retention of information, like someone's food order or an anniv- ...oh no.",
      faceValue: 2,
      effects: [
        { type: 'action', text: 'You may discard your hand and stabilize' }
      ]
    },
    {
      name: 'Poisonous',
      flavorText: "An apple a day keeps the doctor away. Unless the apple is from a witch.",
      faceValue: 2,
      effects: [
        { type: 'action', text: "Swap Poisonous with a trait from an opponent's trait pile." }
      ]
    },
    {
      name: 'Sneaky',
      flavorText: "Didn't see that comin' did ya?",
      faceValue: 2,
      effects: [
        { type: 'out of turn', text: "At World's End: You may play Sneaky from your hand." }
      ]
    },
    {
      name: 'Super Spreader',
      flavorText: "Ah...AH...AH...false alarm, I thought I was gon--CHOO!",
      faceValue: 2,
      effects: [
        { type: 'active', text: "All players receive: -1 Gene Pool (Including yourself.)" }
      ]
    },
    {
      name: 'Inventive',
      flavorText: "You can't make this stuff up. But I can.",
      faceValue: 1,
      effects: [
        { type: 'action', text: "Play an action from an opponent's trait pile." }
      ]
    },
    {
      name: 'Directly Register',
      flavorText: "Meow, I'm a cat. I walk so precisely. BIG DEAL.",
      faceValue: 1,
      effects: [
        { type: 'action', text: "Steal a trait with a face value of 1 from an opponent's trait pile." }
      ]
    },
    {
      name: 'Teeth',
      flavorText: "A source of income when you're a child.",
      faceValue: 1,
      effects: [
        { type: 'active', text: "+1 Gene Pool"}
      ]
    },
    {
      name: 'Telekinetic',
      flavorText: "The ability to turn on the TV when you can't find the remote.",
      faceValue: 1,
      effects: [
        { type: 'action', text: "Swap 1 trait from your trait pile with an opponent's trait of a different color." }
      ]
    },
    {
      name: 'Selfish',
      flavorText: "Mine!",
      faceValue: 1,
      effects: [
        { type: 'action', text: "Steal a red trait from an opponent's trait pile." }
      ]
    },
    {
      name: 'Clever',
      flavorText: "Why can't birds make plans? Because their calendars are loosey-goosey.",
      faceValue: 1,
      effects: [
        { type: 'action', text: "Opponents reveal 1 card in their hand to all players. Steal 1, then play it immediately." }
      ]
    },
    {
      name: 'Big Ears',
      flavorText: "What?",
      faceValue: 1,
    },
    {
      name: 'Impatience',
      flavorText: "Would you make a move already?",
      faceValue: 1,
      effects: [
        { type: 'action', text: "Steal 2 random cards from an opponent's hand." }
      ]
    },
    {
      name: 'Nosy',
      flavorText: "Whatchya holdin'?",
      faceValue: 1,
      effects: [
        { type: 'action', text: "Look at 2 random cards from an opponent's hand. Steal 1, and play it immediately." }
      ]
    },
    {
      name: 'Dreamer',
      flavorText: "Someday, I'll be more than just a purple ball.",
      faceValue: 1,
      effects: [
        { type: 'active', text: "+1 Gene Pool" }
      ]
    },
    {
      name: 'Persuasive',
      flavorText: "Change your mind or I will yell louder!",
      faceValue: 1,
      effects: [
        { type: 'action', text: "Choose a color. All players discard all cards of that color from their hand. (Including yourself!)" }
      ]
    },
    {
      name: 'Sticky Secretions',
      flavorText: "Give me a hug.",
      faceValue: -1,
      effects: [
        { type: 'bonus score', text: '+1 for each purple trait in your trait pile. (Including this one.)' }
      ],
      bonusScore: (currentPlayer) => bonusByColor(1, 'Purple', currentPlayer.traitPile)
    },
    {
      name: 'Venomous',
      flavorText: "My bite is worse than my bark.",
      faceValue: -2,
      effects: [
        { type: 'action', text: "Play another trait. Then move Venomous to an opponent's trait pile." }
      ]
    },
    {
      name: 'Parasitic',
      flavorText: "We all have that one friend who never has their credit card and is constantly drinking blood.",
      faceValue: -2,
      effects: [
        { type: 'out of turn', text: "You may play Parasitic from your hand when an opponent plays a trait. Steal that trait. Stop its action." }
      ]
    }
  ]),
  ...applyDefaults({ colors: ['Green'] }, [
    ...applyDefaults({ dominant: true }, [
      {
        name: 'Symbiosis',
        flavorText: "Yes...yes! Feast, my parasitic friends!",
        faceValue: 3,
        effects: [
          { type: 'bonus score', text: "+2 for every trait in your lowest color count. (Must have 2 or more colors. If there's a tie, pick 1!)" }
        ],
        bonusScore: (currentPlayer) => {
          const colorsCount = allColors
            .map((color) => bonusByColor(2, color, currentPlayer.traitPile))
          if (colorsCount.filter((count) => count > 0).length < 2)
            return 0
          return Math.min(...colorsCount)
        }
      },
      {
        name: 'Pack Behavior',
        flavorText: "We would ALL like to go outside.",
        faceValue: 3,
        effects: [
          { type: 'bonus score', text: "+1 for every color pair in your trait pile." }
        ],
        bonusScore: (currentPlayer) => {
          return allColors.reduce((score, color) => {
            return score + Math.floor(bonusByColor(0.5, color, currentPlayer.traitPile))
          }, 0)
        }
      },
      {
        name: 'Heroic',
        flavorText: "Deep down, under all this muscle, I'm just super honorable and courageous.",
        faceValue: 7,
        effects: [
          { type: 'condition', text: 'To play, you must have 3 or more green traits in your trait pile.' }
        ]
      },
    ]),
    {
      name: 'Appealing',
      flavorText: "Orange you glad?",
      faceValue: 3
    },
    {
      name: 'Deep Roots',
      flavorText: "I discussed the weather with my neighbor. This is now my forever home.",
      faceValue: 2
    },
    {
      name: 'Bark',
      flavorText: 'Woof.',
      faceValue: 2
    },
    {
      name: 'Pollination',
      flavorText: "Well, you see, Timmy, when a bee and a plant fall in love...",
      faceValue: 1,
      effects: [
        { type: 'bonus score', text: "+1 for every card in your trait pile with a face value of 1. (Including this one.)" }
      ],
      bonusScore: (currentPlayer) => bonusWhenMatches(1, { faceValue: 1}, currentPlayer.traitPile)
    },
    {
      name: 'Propagation',
      flavorText: "Much easier than dating.",
      faceValue: 1,
      effects: [
        { type: 'action', text: "Play another trait." }
      ]
    },
    {
      name: 'Leaves',
      flavorText: "I asked my barber for a salad bowl cut.",
      faceValue: 1
    },
    {
      name: 'Woody Stems',
      flavorText: "These here is how I transfer fluid from my roots to my shoots.",
      faceValue: 1
    },
    {
      name: 'Photosynthesis',
      flavorText: "Munchin' some photons, nom nom nom",
      faceValue: 1,
      effects: [
        { type: 'action', text: "Draw 2 cards. If either are green play 1 immediately. (Unless restricted.)" }
      ]
    },
    {
      name: 'Fecundity',
      flavorText: 'Once you pop...',
      faceValue: 1,
      effects: [
        { type: 'active', text: '+1 Gene Pool' }
      ]
    },
    {
      name: 'Trunk',
      flavorText: 'Container of junk.',
      faceValue: 1,
      effects: [
        { type: 'action', text: "Play top card from discard pile. Ignore its action." }
      ]
    },
    {
      name: 'Tiny Little Melons',
      flavorText: 'Not just little, but also tiny.',
      faceValue: 1,
      effects: [
        { type: 'action', text: "Steal 1 green trait from an opponent's trait pile." }
      ]
    },
    {
      name: 'Self-Replicating',
      flavorText: "More me? Copy that.",
      effects: [
        { type: 'action', text: "Play 1 card from the discard pile. Ignore its action."},
        { type: 'reaction', text: "When you play another green trait from your hand, you may return this to your hand." }
      ]
    },
    {
      name: 'Branches',
      flavorText: 'Tree arms.',
      effects: [
        { type: 'bonus score', text: "+1 for every pair of green traits in each opponent's trait pile." },
      ],
      bonusScore: (_currentPlayer, otherPlayers) => {
        return otherPlayers.reduce((score, player) => {
          return score + Math.floor(bonusByColor(0.5, 'Green', player.traitPile))
        }, 0)
      }
    },
    {
      name: 'Random Fertilization',
      flavorText: "Pick a number between 1 and 64 trillion.",
      effects: [
        { type: 'bonus score', text: 'Value is equal to the size of your Gene Pool.'}
      ],
      bonusScore: (currentPlayer) => {
        return currentPlayer.genePool
      }
    },
    {
      quantity: 5,
      name: 'Swarm',
      flavorText: "We're here for the new phone.",
      effects: [
        { type: 'bonus score', text: "Value is equal to the number of Swarm traits in all trait piles. (Including this one.)" }
      ],
      bonusScore: (currentPlayer, otherPlayers) => {
        return [currentPlayer, ...otherPlayers]
          .flatMap((player) => player.traitPile)
          .filter((card) => card.name == 'Swarm')
          .length
      }
    },
    {
      name: 'Fortunate',
      flavorText: "Some call it luck. Some call it a blessing.",
      effects: [
        { type: 'bonus score', text: "Value is equal to the number of cards in your hand." }
      ],
      bonusScore: (currentPlayer) => {
        return currentPlayer.hand.length
      }      
    },
    {
      name: 'Overgrowth',
      flavorText: "Mommy, why did you pull me out of kindergarten?",
      faceValue: -1,
      effects: [
        { type: 'bonus score', text: '+1 for each green trait in your trait pile. (Including this one.)'}
      ],
      bonusScore: (currentPlayer) => bonusByColor(1,'Green', currentPlayer.traitPile)
    }
  ]),
  ...applyDefaults({ colors: ['Red'] }, [
    ...applyDefaults({dominant: true}, [
      {
        name: 'Hyper Intelligence',
        flavorText: "E=mc stop starting at my head.",
        faceValue: 4,
        effects: [
          { type: 'end of world', text: "At World's End: Choose a color. Opponents discard 1 trait of that color from their trait pile at random." }
        ]
      },
      {
        name: 'Apex Predator',
        flavorText: "Where do you think you're going?",
        faceValue: 3,
        effects: [
          { type: 'bonus score', text: "+4 if you have more traits in your trait pile than your opponents. (Ties don't count!)" }
        ],
        bonusScore: (currentPlayer, _otherPlayers) => {
          return currentPlayer.traitPile.length > Math.max(..._otherPlayers.map(player => player.traitPile.length))
        }
      },
      {
        name: 'Sentience',
        flavorText: "I'm feeling so many things right now.",
        faceValue: 2,
        effects: [
          { type: 'bonus score', text: "At World's End: Choose a color. +1 for all traits of that color in your trait pile." },
          { type: 'end of world', text: "At World's End: Choose a color. +1 for all traits of that color in your trait pile.", choices: allColors}
        ],
        bonusScore: (currentPlayer, _otherPlayers, choice) => bonusByColor(1, choice, currentPlayer.traitPile)
      }
    ]),
    {
      name: 'Retractable Claws',
      flavorText: "Hurts every time",
      faceValue: 5,
      effects: [
        { type: 'condition', text: 'To play, you must discard 1 red trait from your trait pile.' }
      ]
    },
    {
      name: 'Brute Strength',
      flavorText: "Wreck yourself before you check yourself bro!",
      faceValue: 4,
      effects: [
        { type: 'active', text: '-1 Gene Pool' }
      ]
    },
    {
      name: 'Antlers',
      flavorText: "Bet I'd look good on your wall.",
      faceValue: 3
    },
    {
      name: 'Fire Skin',
      flavorText: "I think your skin is on fire.",
      faceValue: 3
    } ,   
    {
      name: 'Reckless',
      flavorText: "Hot take comin' in hot!",
      faceValue: 3,
      effects: [
        { type: 'action', text: "You and an opponent discard 1 trait from each other's trait pile. (Excluding this one.)" }
      ]
    },
    {
      name: 'Stone Skin',
      flavorText: "Your heartfelt compliments are no match for my craggy exterior.",
      faceValue: 2
    },
    {
      name: 'Quick',
      flavorText: "Hyah, HYAH!",
      faceValue: 2
    },
    {
      name: 'Voracious',
      flavorText: "Don't look at me.",
      faceValue: 2,
      effects: [
        { type: 'action', text: "Play another trait. Then discard 1 trait from your trait pile." }
      ]
    },
    {
      name: 'Hot Temper',
      flavorText: "There's cheese on my cheeseburger!",
      faceValue: 2,
      effects: [
        { type: 'action', text: 'Discard 2 cards from your hand.' }
      ]
    },
    {
      name: 'Brave',
      flavorText: "My farm's nearby, so if you're thinking about erupting, cock-a-doodle-don't you dare.",
      faceValue: 1,
      effects: [
        { type: 'bonus score', text: '+2 for each dominant trait in your hand.' }
      ],
      bonusScore: (currentPlayer) => bonusWhenMatches(2, {dominant: true}, currentPlayer.hand)
    },
    {
      name: 'Endurance',
      flavorText: "Catastrophes can't trample me!",
      faceValue: 1,
      effects: [
        { type: 'reaction', text: 'Whenever you discard Endurance from your trait pile, return it to your trait pile.' }
      ]
    },
    {
      name: 'Territorial',
      flavorText: "Everything that smells like pee is mine.",
      faceValue: 1,
      effects: [
        { type: 'action', text: 'All opponents discard 1 red trait from their trait pile.' }
      ]
    },
    {
      name: 'Bad',
      flavorText: "No cuts, no glory.",
      faceValue: 1,
      effects: [
        { type: 'action', text: 'Opponents discard 2 cards from their hand at random.' }
      ]
    },
    {
      name: 'Fangs',
      flavorText: "The sharpest tools in the head.",
      faceValue: 1
    },
    {
      quantity: 6,
      name: 'Kidney',
      flavorText: "... with a tiara.",
      effects: [
        { type: 'bonus score', text: "Value is equal to the number of Kidneys in your trait pile. (Including this one.)"}
      ],
      bonusScore: (currentPlayer) => {
        return currentPlayer.traitPile.filter(card => card.name == 'Kidney').length
      }
    },
    {
      name: 'Warm Blood',
      flavorText: "Are you trying to boil my blood?",
      faceValue: -1,
      effects: [
        { type: 'active', text: '+2 Gene Pool' }
      ]
    },
    {
      name: 'Heat Vision',
      flavorText: "I'd like to make a toast.",
      faceValue: -1,
      effects: [
        { type: 'bonus score', text: '+1 for each red trait in your trait pile. (Including this one.)'}
      ],
      bonusScore: (currentPlayer) => bonusByColor(1, 'Red', currentPlayer.traitPile)
    }
  ]),
  ...applyDefaults({ colors: ['Blue']}, [
    ...applyDefaults( {dominant: true}, [
      {
        name: 'Immunity',
        flavorText: "Can't touch this.",
        faceValue: 4,
        effects: [
          {type: 'bonus score', text: '+2 for each trait with a negative face value in your trait pile'}
        ],
        bonusScore: (currentPlayer) => {
          return 2 * currentPlayer.traitPile.filter(card => card.faceValue < 0).length
        },
      },
      {
        quantity: 2,
        name: 'Echolocation',
        flavorText: "The all-seeing ear.",
        faceValue: 4,
        effects: [
          { type: 'active', text: "Until World's End: Draw 1 card at the start of each of your turns." }
        ]
      },
      {
        name: 'Tiny',
        flavorText: "Widdle iddle, teensie weensie.",
        faceValue: 17,
        effects: [
          { type: 'bonus score', text: '-1 for each trait in your trait pile. (Including this one.)'}
        ],
        bonusScore: (currentPlayer) => {
          return -1 * currentPlayer.traitPile.length
        }
      }
    ]),
    {
      name: 'Blubber',
      flavorText: "It's protective fat, thank you very much.",
      faceValue: 4
    },
    {
      name: 'Scutes',
      flavorText: "When this is over, my victor will be shellebrated!",
      faceValue: 3,
      effects: [
        { type: 'action', text: 'Give your opponent 1 trait from your trait pile.' }
      ]
    },
    {
      name: 'Flight',
      flavorText: "The sun is no match for my waxy wings!",
      faceValue: 2,
      effects: [
        { type: 'action', text: 'Swap hands with an opponent.' }
      ]
    },
    {
      name: 'Migratory',
      flavorText: "Can't wait to move back in with our parents!",
      faceValue: 2,
    },
    {
      name: 'Sweat',
      flavorText: "I bench so I can brunch.",
      faceValue: 2,
      effects: [
        { type: 'action', text: 'Discard 1 card from your hand.' }
      ]
    },
    {
      name: 'Saliva',
      flavorText: "The stuff that drools are made of.",
      faceValue: 1,
      effects: [
        { type: 'active', text: '+1 Gene Pool' }
      ]
    },
    {
      name: 'Painted Shell',
      flavorText: "I'm just an arts and crafts project... for now.",
      faceValue: 1,
      effects: [
        { type: 'action', text: 'Play an action from your trait pile' }
      ]
    },
    {
      name: 'Spiny',
      flavorText: "Don't pet my fish.",
      faceValue: 1
    },
    {
      name: 'Tentacles',
      flavorText: 'Watch out, folks! Here comes the swap-topus!',
      faceValue: 1,
      effects: [
        { type: 'action', text: "Swap 1 trait from your trait pile with an opponent's trait of the same color." }
      ]
    },
    {
      name: 'Gills',
      flavorText: 'I need a breath of fresh water.',
      faceValue: 1
    },
    {
      name: 'Cold Blood',
      flavorText: "I would kill for the ability to control my body temperature.",
      faceValue: 1,
      effects: [
        { type: 'action', text: 'Draw 3 cards. You map play 1 now.' }
      ]
    },
    {
      name: 'Iridescent Scales',
      flavorText: "I got rainbow-like skin. Lustrous, ain't it?",
      faceValue: 1,
      effects: [
        { type: 'action', text: 'Draw 3 cards' }
      ]
    },
    {
      name: 'Chromatophores',
      flavorText: 'No octopus here. Just some coral. Move along.',
      effects: [
        { type: 'out of turn', text: 'You may play Chromatophores from your hand at any time to prevent an action.'}
      ]
    },
    {
      name: 'Selective Memory',
      flavorText: "Me? Wrong? That doesn't sound right.",
      effects: [
        { type: 'action', text: 'Play 1 card from the discard pile. Play its action.'}
      ]
    },
    {
      name: 'Regenerative Tissue',
      flavorText: "How many fingers am I holding up? Wait, hold on, they're still growing back.",
      effects: [
        { type: 'reaction', text: 'Anytime you discard a trait from your trait pule, (including this one), draw 1. Play it immediately. (Unless restricted.) Ignore actions.' }
      ]
    },
    {
      name: 'Egg Clusters',
      flavorText: 'Buy one, get one hundred.',
      faceValue: -1,
      effects: [
        { type: 'bonus score', text: '+1 for each blue trait in your trait pile. (Including this one.)' }
      ],
      bonusScore: (currentPlayer) => bonusByColor(1, 'Blue', currentPlayer.traitPile)
    },
    {
      name: 'Automimicry',
      flavorText: "I made a big scary face so you don't notice my small, real face",
      faceValue: -1,
      effects: [
        { type: 'out of turn', text: 'You may play Automimicry from your hand at any time to prevent an action.' }
      ]
    },
    {
      name: 'Costly Signaling',
      flavorText: 'Like peacock feather. Or a philosophy degree',
      faceValue: -2,
      effects: [
        { type: 'action', text: "Return an opponent's trait to their hand. Play another trait." }
      ]
    },
  ])
])
export default cards

export const mappedCards = cards.reduce((map, card) => {
  map[card.name] = card
  return map
},{})

