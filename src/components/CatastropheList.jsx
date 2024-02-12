import { chunk} from "../helpers/utils";
import catastrophes from "../models/Catastrophes";
import { Container, Row, Col } from "react-bootstrap";
import CatastropheCard from "./CatastropheCard";

function CatastropheList({show, playedCatastrophes, setPlayedCatastrophes}) {

  function addCatastrophe(name) {
    setPlayedCatastrophes([
      ...playedCatastrophes,
      catastrophes.filter(c => c.name === name)[0]
      ]
    )
  }

  function removeCatastrophe(name) {
    setPlayedCatastrophes([...playedCatastrophes.filter(c => c.name !== name)])
  }
  const firstAge = playedCatastrophes.length > 0 ? playedCatastrophes[0] : null
  const secondAge = playedCatastrophes.length > 1 ? playedCatastrophes[1] : null
  const thirdAge = playedCatastrophes.length> 2 ? playedCatastrophes[2] : null

  const playedNames = playedCatastrophes.map(c => c.name)
  const availableCatastrophes = catastrophes.filter(c => !playedNames.includes(c.name))

  return (
    <div>
      <h1>Catastrophes</h1>
      <Container>
        <Row>
          <Col md>
            <h2>First Age</h2>
            { firstAge
              ? (<CatastropheCard card={firstAge} removeCatastrophe={removeCatastrophe}/> )
              : 'None'
            }
          </Col>
          <Col md>
            <h2>Second Age</h2>
            { secondAge
              ? (<CatastropheCard card={secondAge} removeCatastrophe={removeCatastrophe}/> )
              : 'None'
            }
          </Col>
          <Col md>
            <h2>Third Age</h2>
            { thirdAge
              ? (<CatastropheCard card={thirdAge} removeCatastrophe={removeCatastrophe}/> )
              : 'None'
            }
          </Col>
        </Row>
      </Container>

      { thirdAge ?
        ''
        : <Container>
          {chunk(availableCatastrophes, 4).map((group) => (
            <Row>
              {group.map(c =>
                <Col sm={3}>
                  <CatastropheCard card={c} addCatastrophe={addCatastrophe} />
                </Col>
              )}
            </Row>
          ))}
        </Container>
      }

    </div>
  )
}

export default CatastropheList