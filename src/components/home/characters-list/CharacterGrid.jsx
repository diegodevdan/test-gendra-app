import React from 'react'
import { Grid } from '@mui/material'
import { CardCharacter } from '../../ui/card-character/CardCharacter'

const CharacterGrid = ({character}) => {
  return (
    <Grid
      key={character.id}
      item
      xs={12}
      sm={6}
      md={4}
    >
      <CardCharacter
        name={character.name}
        specie={character.species}
        location={character.location.name}
        status={character.status}
        gender={character.gender}
        image={character.image}
        origin={character.origin.name}
        id={character.id}
      />
    </Grid>
  )
}

export default CharacterGrid
