import React from 'react'
import { Grid, Pagination } from '@mui/material'
import CharacterGrid from './CharacterGrid'

const CharacterList = ({characters, pages, changePage}) => {
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

      <Pagination
        count={pages}
        color="primary"
        onChange={(event, value) => changePage(value)}
      />
    </>

  )
}

export default CharacterList
