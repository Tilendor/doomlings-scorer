import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {useState} from 'react'
import PlayerList from './components/PlayerList'
import CatastropheList from './components/CatastropheList'
import PlayerCardList from './components/PlayerCardsList'
import PlayerScoreboard from './components/PlayerScoreboard'

function App() {
  const [players, setPlayers] = useState([]);
  const [playedCatastrophes, setPlayedCatastrophes] = useState([])

  return (
    <div className="App">
      <div class="jumbotron">
        <h1>Doomlings Score Calculator</h1>
        <p>Sometimes math is hard.</p>
      </div>
      <PlayerList players={players} setPlayers={setPlayers}/>
      {players.length > 0 ?
        <PlayerScoreboard players={players} setPlayers={setPlayers} playedCatastrophes={playedCatastrophes}/>
        : ''
      }

      {players.length > 0 ?
        <CatastropheList playedCatastrophes={playedCatastrophes} setPlayedCatastrophes={setPlayedCatastrophes} />
        : ''
      }
      {players.length > 0 ?
        <PlayerCardList players={players} setPlayers={setPlayers}/>
        : ''
      }
    </div>
  );
}

export default App;
