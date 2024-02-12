import React, { useState } from 'react'
import {Button, Card} from "react-bootstrap";

function CatastropheCard({card, addCatastrophe, removeCatastrophe}) {



  return (
    <Card>
      <Card.Body>
        <Card.Title>{card.name}</Card.Title>
        <Card.Text>{card.worldsEnd}</Card.Text>
        { addCatastrophe ?
          <Button size="lg" onClick={() => addCatastrophe(card.name)}>Select</Button>
          : ''
        }
        {
          removeCatastrophe ?
          <Button size="lg" onClick={() => removeCatastrophe(card.name)}>X</Button>
          : ''
        }
      </Card.Body>
    </Card>
  );
}
export default CatastropheCard;