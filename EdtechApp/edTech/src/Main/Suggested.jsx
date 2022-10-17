import React from 'react'
import { Container} from '@mui/material';

import cards from "./cards"
import CardStyle from './CardStyle';

function Suggested() {

  const card = cards.map(elem => {
    return (
        <CardStyle
            key={elem.id}
            item = {elem}
        />
    )
  })

  return (
    <Container 
      sx={{
        display:"flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        {card}
    </Container>
  )
}

export default Suggested