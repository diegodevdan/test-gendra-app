import React, { useEffect, useState } from 'react'
import { Alert, Button, Grid } from '@mui/material'
import { CardEpisode } from '../ui/card/Card'
import MovieIcon from '@mui/icons-material/Movie';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { CardCharacter } from '../ui/card-character/CardCharacter'

// Static data
const urlEpisodes = 'https://rickandmortyapi.com/api/episode';
const urlCharacters = 'https://rickandmortyapi.com/api/character';

const HomeScreen = () => {
  const [episodes, setEpisodes] = useState([]);
  const [recentEpisodes, setRecentEpisodes] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [isShowedEpisodes, setIsShowedEpisodes] = useState(true)

  const getEpisodes = async () => {
    try {
      const { results } = await fetch(urlEpisodes)
        .then(response => response.json())
        .then(data => data)
      setEpisodes(results);
      getMostRecentEpisodes(results)
    } catch (e) {
      console.log(e)
    }
  }

  const getCharacters = async () => {
    try {
      const { results } = await fetch(urlCharacters)
        .then(response => response.json())
        .then(data => data)
      setCharacters(results)
      console.log(characters)
    } catch (e) {
      console.log(e)
    }
  }

  const getMostRecentEpisodes = (listEpisodes = []) => {
    const recentEpisodes = listEpisodes
      .filter(episode => episode.air_date.includes('2015'))

    // TODO dispatch redux episodes
    setRecentEpisodes(recentEpisodes)
    console.log(episodes)
  }

  const showEpisodes = () => {
    setIsShowedEpisodes(prevState => true);
  }

  const showCharacters = () => {
    setIsShowedEpisodes(prevState => false);
  }

  useEffect(() => {
    getEpisodes()
  }, [])

  useEffect(() => {
    getCharacters()
  }, [])

  if(episodes.length === 0) return (
    <Alert variant='filled' severity='error'>
      Something was grong, try again later
    </Alert>
  )

  return (
    <>
      <div>
        <Button
         onClick={showEpisodes}
          variant="contained"
          endIcon={<MovieIcon />}>
          Episodes
        </Button>
        <Button
          onClick={showCharacters}
          variant="contained"
          endIcon={<CoPresentIcon />}>
          Characters
        </Button>
      </div>


      {
        isShowedEpisodes ? (
          <Grid
            container
            spacing={4}
          >
            {
              recentEpisodes.map(episode => (
                <Grid
                  key={episode.id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <CardEpisode
                    name={episode.name}
                    airDate={episode.air_date}
                    numberEpisode={episode.id}
                    imgEpisode="https://acortar.link/N2buEE"
                  />
                </Grid>
              ))
            }
          </Grid>
        ) : (
          <Grid
            container
            spacing={4}
          >
            {
              characters.map(character => (
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
                  />
                </Grid>
              ))
            }
          </Grid>
        )
      }

    </>

  )
}

export default HomeScreen
