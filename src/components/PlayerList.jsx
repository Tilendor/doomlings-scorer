import React, { useState } from 'react'
import {Button} from "react-bootstrap";
//import TodoItem from ‘./TodoItem’;

const playerDefaults = {
  genePool: 5,
  traitPile: [],
  hand: [],
  score: {
    faceValue: 0,
    bonus: 1,
    endOfWorld: 2,
    final: 0
  }
}

function PlayerList({players, setPlayers}) {

  const [name, setName] = useState('');
  function addPlayer(name) {
    const newPlayer =  {
      ...playerDefaults,
      name
    }
    setPlayers([...players, newPlayer])
    setName('')
  }

  return (
    <div className="player-list">
      <h2> Add a Player: &nbsp;
        <input value={name} onChange={e => setName(e.target.value)} />
        <Button size={"lg"} onClick={() => addPlayer(name)}>Add</Button>
      </h2>
    </div>
  );
}
export default PlayerList;