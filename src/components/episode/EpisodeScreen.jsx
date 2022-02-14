import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Wallp from '../../assets/statics/wall.jpg'
import '../../styles/episode-screen.css'

const initEpisode = {
  air_date: '',
  characters: '',
  episode: '',
  name: ''
}

// 2000's styles

const EpisodeScreen = () => {
  const { episodeId } = useParams()

  const [currentEpisode, setCurrentEpisode] = useState(initEpisode)
  const { name, episode, characters, air_date } = currentEpisode

  // TODO MAKE SELECTOR
  const getEpisode = async () => {
    const urlEpisode = `https://rickandmortyapi.com/api/episode/${episodeId}`
    try {
      const resp = await fetch(urlEpisode)
        .then(response => response.json())
        .then(data => data)
      setCurrentEpisode(resp)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getEpisode()
  }, [])

  return (
    <div className='episode-main'>
      <div className='episode-main wallpaper'>
        <img src={Wallp} alt='image episode' />
      </div>
      <h1>{name}</h1>
      <span>{episode}</span>
      <p>{air_date}</p>
      <p>Number of characters: {characters.length}</p>
    </div>
  )
}

export default EpisodeScreen
