import cards, { mappedCards } from '../models/Cards'
import React, {useState} from "react";
import { allColors } from '../helpers/rules'
import {cardsByColor, chunk} from "../helpers/utils";
import { Container, Row, Col, Stack, Form} from "react-bootstrap";
import TraitCard from "./TraitCard";

function PlayerCardList({players, setPlayers}) {

  const [search, setSearch] = useState('')
  const [usedCards, setUsedCards] = useState({})
  const [step, setStep] = useState({index: 0, step: 'hand'})
  const [currentPlayer, setCurrentPlayer] = useState(players[0])
  const [genePool, setGenePool] = useState(players[0].genePool)
  const matchedCards = cards.filter(card =>
    card.name.includes(search)
  )

  const availableCards = matchedCards.filter(c => {
    if (!(c.name in usedCards))
      return true

    return usedCards[c.name] < c.quantity
  })

  function setPlayer(index) {
    console.log('setPlayer')
    setCurrentPlayer({ ...players[index]})
    setStep({ index: index, step: 'hand'})
    setGenePool(players[index].genePool)
  }

  function setPlayerGenePool(index, value) {
    console.log("setPlayerGenePool")
    setGenePool(value)
    players[index].genePool = value
    setPlayers([...players])
  }

  function addToPile(name) {
    const playerUpdate = {
      ...currentPlayer,
      traitPile: [...currentPlayer.traitPile, mappedCards[name]]
    }
    if (name in usedCards) {
      usedCards[name] += 1
    } else {
      usedCards[name] = 1
    }
    setUsedCards({...usedCards})
    setCurrentPlayer(playerUpdate)
    players[step.index] = playerUpdate
    setPlayers([...players])
  }

  function addToHand(name) {
    const playerUpdate = {
      ...currentPlayer,
      hand: [...currentPlayer.hand, mappedCards[name]]
    }
    if (name in usedCards) {
      usedCards[name] += 1
    } else {
      usedCards[name] = 1
    }
    setUsedCards({...usedCards})
    setCurrentPlayer(playerUpdate)
    players[step.index] = playerUpdate
    setPlayers([...players])
  }

  return (
    <Container>
      <Stack direction="horizontal" gap={15} className="tabs">
        {players.map((player, index) => (<>
          <div className={`p-2 ${index == step.index ? 'active' : ''}`} onClick={() => setPlayer(index)}><h1>{player.name}</h1></div>
          <div className="vr"> </div>
        </>))}
      </Stack>
      <Stack direction="horizontal" gap={5} className="tabs">
        <div className="pe-5">
          <Form.Label htmlFor="genePool" >Gene Pool {currentPlayer.genePool}</Form.Label>
          <Form.Control type="text" id="genePool" value={genePool}  onChange={(e) => setPlayerGenePool(step.index, e.target.value)}></Form.Control>
        </div>
      </Stack>
      <span>
        Search:
        <input value={search} onChange={e => setSearch(e.target.value)} />
      </span>
      <Container>
        <h1>{currentPlayer.name}'s Hand</h1>
        <Row>
          {currentPlayer.hand ?
            currentPlayer.hand.map(card => (
            <Col sm={3}><TraitCard card={card}/></Col>)

          ) : ''}
        </Row>
      </Container>
      <Container>
        <h1>{currentPlayer.name}'s Trait Pile</h1>
        <Row>
          {currentPlayer.traitPile ?
            currentPlayer.traitPile.map(card => (
              <Col sm={3}><TraitCard card={card}/></Col>)

            ) : ''}
        </Row>
      </Container>
      {cardsByColor(availableCards).map(({color, colorCards}) =>(
        <Container>
          <h1>{color}</h1>
          <Container>
            {chunk(colorCards, 4).map((group) => (
              <Row>
                {group.map(card => (
                  <Col sm={3}><TraitCard card={card} addToHand={addToHand} addToPile={addToPile}/> </Col>
                ))}
              </Row>
            ))}
          </Container>
        </Container>
      ))}
    </Container>
  )
}

export default PlayerCardList