import React from 'react'
import { Alert, Grid } from '@mui/material'
import CharacterGrid from './CharacterGrid'
import Paginator from '../../ui/paginator/Paginator'

// I SEPARATE EPISODE LIST, AND I MADE LITTLE COMPONENTS

const CharacterList = ({
  characters,
  pages,
  changePage
}) => {
  if (characters.length === 0) {
    return (
      <Alert variant='filled' severity='error'>
        Something was grong, try again later
      </Alert>
    )
  }

  return (
    <>
      <Grid
        container
        spacing={4}
      >
        {
          characters.map(character => (
            <CharacterGrid
              key={character.id}
              character={character}
            />
          ))
        }
      </Grid>

      {
        pages > 1 && (
          <Paginator
            pages={pages}
            changePage={changePage}
          />
        )
      }
    </>
  )
}

export default CharacterList
