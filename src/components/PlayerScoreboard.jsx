import React, { useState } from 'react'
import { Table, Button, Row, Container} from 'react-bootstrap'

//import TodoItem from ‘./TodoItem’;

function PlayerScoreBoard({players, setPlayers, playedCatastrophes}) {
  function deletePlayer(name) {
    setPlayers(players.filter(p => p.name !== name));
  }

  const endOfWorld = playedCatastrophes.at(-1)

  const scores = players.map(player => {
    const otherPlayers = players.filter(p => p.name != player.name)
    const score = {
      faceValue: player.traitPile.reduce((sum, card) => {
        return sum + card.faceValue
      }, 0),
      bonus: player.traitPile.filter(card => card.bonusScore).reduce((sum, card) => {
        return sum + card.bonusScore(player, otherPlayers)
      }, 0),
      endOfWorld: (endOfWorld && endOfWorld.score) ? endOfWorld.score(player, otherPlayers, 0) : 0
    }
    score.final = score.faceValue + score.bonus + score.endOfWorld
    return score
  })

  /*for(const player of players){
    player.score.faceValue = player.traitPile.reduce((sum, card) => {
      return sum + card.faceValue
    }, 0)
    const otherPlayers = players.filter(p => p.name != player.name)
    player.score.bonus = player.traitPile.filter(card => card.bonusScore).reduce((sum, card) => {
      return sum + card.bonusScore(player, otherPlayers, card.choice)
    }, 0)
    player.score.endOfWorld = (endOfWorld && endOfWorld.score) ? endOfWorld.score(player, otherPlayers, 0) : 0
    player.score.final = player.score.faceValue + player.score.bonus + player.score.endOfWorld
  }*/

  return (
    <Container className="sticky-top">
      <div style={{fontSize: "20px"}}>
      {players.length == 0
        ? (<span> No players</span>)
        : (<Table className={"scoreboard"}>
            <thead>
              <tr>
                <td></td>
                {players.map(player => (
                  <th>{player.name} <Button size={"sm"} onClick={() => deletePlayer(player.name)}>X</Button> </th>
                  ))}
              </tr>
            </thead>
          <tbody>
            <tr>
              <th>Face Value</th>
              {scores.map(score => (
                <td>{score.faceValue}</td>
              ))}
            </tr>
            <tr>
              <th>Bonus</th>
              {scores.map(score => (
                <td>{score.bonus}</td>
              ))}
            </tr>
            <tr>
              <th>End of World</th>
              {scores.map(score => (
                <td>{score.endOfWorld}</td>
              ))}
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Final Score</th>
              {scores.map(score => (
                <td>{score.final}</td>
              ))}
            </tr>

          </tfoot>
        </Table>)
      }
      </div>
    </Container>
  );
}
export default PlayerScoreBoard;