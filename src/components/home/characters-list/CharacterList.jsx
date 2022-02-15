import React from 'react'
import { Alert, Grid } from '@mui/material'
import CharacterGrid from './CharacterGrid'
import Paginator from '../../ui/paginator/Paginator'
import { useSelector } from 'react-redux'

// I SEPARATE EPISODE LIST, AND I MADE LITTLE COMPONENTS

const CharacterList = () => {
  const { home } = useSelector(home => home)
  const { characters } = home
  if (characters.characters.length === 0) {
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
          characters.characters.map(character => (
            <CharacterGrid
              key={character.id}
              character={character}
            />
          ))
        }
      </Grid>

      {
        characters.pages > 1 && (
          <Paginator
            pages={characters.pages}
          />
        )
      }
    </>
  )
}

export default CharacterList
