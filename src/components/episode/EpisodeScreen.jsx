import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EpisodeScreen = () => {
  const { episodeId } = useParams();

  const [counter, setCounter] = useState(0);
  const [episode, setEpisode] = useState(null)

  const getEpisode = async () => {
    const urlEpisode = `https://rickandmortyapi.com/api/episode/${episodeId}`
    try {
      const resp = await fetch(urlEpisode)
        .then(response => response.json())
        .then(data => data)
      console.log(resp)
      setEpisode(resp)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getEpisode();
  }, [])


  return (
    <div>
      <div>
        {/*<img src="" alt=""/>*/}

      </div>
      <h1>iunfo</h1>
      <button onClick={() => setCounter(counter+1)}>{counter}</button>
    </div>
  )
}

export default EpisodeScreen
