import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Wallp from '../../assets/statics/wall.jpg'
import '../../styles/episode-screen.css'
import { useDispatch, useSelector } from 'react-redux'
import { getEpisode } from '../../actions/home'

// 2000's styles
const EpisodeScreen = () => {
  const { episodeId } = useParams()

  const dispatch = useDispatch()
  const { home } = useSelector(home => home)
  const { name, episode, characters, air_date } = home.currentEpisode

  useEffect(() => {
    dispatch(getEpisode(episodeId))
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
