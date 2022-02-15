import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../../styles/episode-screen.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCharacter } from '../../actions/home'

const CharacterScreen = () => {
  const { characterId } = useParams()
  const dispatch = useDispatch()
  const { home } = useSelector(home => home)
  const { name, gender, location, origin, image, status } = home.currentCharacter

  useEffect(() => {
    dispatch(getCharacter(characterId))
  }, [])

  return (
    <div className='episode-main'>
      <div className='episode-main avatar'>
        <img src={image} alt='image episode' />
      </div>
      <h1>{name}</h1>
      <span>Gender: {gender}</span>
      <p>Status: {status}</p>
      <p>Location: {location.name}.
        <br />
        Origin: {origin.name}
      </p>
    </div>
  )
}

export default CharacterScreen
