import React, { useState } from 'react'
import {Button, Card, Stack} from "react-bootstrap";

function TraitCard({card, addToHand, addToPile}) {



  return (
    <Card>
      <Card.Body>
        <Card.Title>({card.faceValue}) {card.name} {card.colors?.join(', ') || 'Colorless'} {card.dominant ? 'Dominant' : ''}</Card.Title>
        <Card.Subtitle>{card.quantity}x - {card.flavorText}</Card.Subtitle>
        <Card.Text>
          {card.effects?.map(effect => (
            <p>{effect.type}: {effect.text}</p>
          ))}
        </Card.Text>
        <Stack direction="horizontal">
          { addToHand ?
            <div className="p-2"> <Button size="lg" onClick={() => addToHand(card.name)}>Add to Hand</Button></div>
            : ''
          }
          <div className="vr"></div>
          { addToPile ?
            <div className="p-2"><Button size="lg" onClick={() => addToPile(card.name)}>Add to Trait Pile</Button></div>
            : ''
          }
        </Stack>
      </Card.Body>
    </Card>
  );
}
export default TraitCard;