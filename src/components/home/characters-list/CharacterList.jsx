import React from 'react'
import { Grid } from '@mui/material'
import CharacterGrid from './CharacterGrid'
import Paginator from '../../ui/paginator/Paginator'

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

      <Paginator
        pages={pages}
        changePage={changePage}
      />
    </>

  )
}

export default CharacterList
