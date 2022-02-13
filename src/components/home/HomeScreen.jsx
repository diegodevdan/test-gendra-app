import React, { useEffect, useState } from 'react'
import { Alert, Grid, Tab, Tabs } from '@mui/material'
import { CardEpisode } from '../ui/card/Card'

// Static data
const urlEpisodes = 'https://rickandmortyapi.com/api/episode';
const urlCharacters = 'https://rickandmortyapi.com/api/character';

const HomeScreen = () => {
  const [episodes, setEpisodes] = useState([]);
  const [recentEpisodes, setRecentEpisodes] = useState([]);
  const [characters, setCharacters] = useState([]);

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
      <Tabs  centered>
        <Tab label="Episodes" />
        <Tab label="Characters" />
      </Tabs>
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
    </>

  )
}

export default HomeScreen
