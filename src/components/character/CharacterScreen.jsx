import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../styles/episode-screen.css'

const initCharacter = {
  name: '',
  gender: '',
  location: '',
  origin: '',
  image: '',
  status: ''
}

const EpisodeScreen = () => {
  const { characterId } = useParams()

  const [currentCharacter, setCurrentCharacter] = useState(initCharacter)
  const { name, gender, location, origin, image, status } = currentCharacter

  const getCharacter = async () => {
    const urlCharacter = `https://rickandmortyapi.com/api/character/${characterId}`
    try {
      const resp = await fetch(urlCharacter)
        .then(response => response.json())
        .then(data => data)
      setCurrentCharacter(resp)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getCharacter()
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

export default EpisodeScreen
