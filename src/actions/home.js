import { types } from '../types/types'

export const getEpisodesRedux = (page = 1) => {
  const urlEpisodes = `https://rickandmortyapi.com/api/episode?page=${page}`
  return async (dispatch) => {
    try {
      const resp = await fetch(urlEpisodes)
      const { info, results } = await resp.json()
      console.log(info)
      dispatch(setEpisodes(results, info.pages))
      dispatch(changePage(page))
    } catch (e) {
      console.log(e)
    }
  }
}

export const setEpisodes = (episodes, pages) => ({
  type: types.getEpisodes,
  payload: {
    episodes,
    pages
  }
})

export const getCharactersRedux = (page = 1) => {
  const urlCharacters = `https://rickandmortyapi.com/api/character?page=${page}`
  return async (dispatch) => {
    try {
      const resp = await fetch(urlCharacters)
      const { info, results } = await resp.json()
      console.log(info)
      dispatch(setCharacters(results, info.pages))
      dispatch(changePage(page))
    } catch (e) {
      console.log(e)
    }
  }
}

export const setCharacters = (characters, pages) => ({
  type: types.getCharacters,
  payload: {
    characters,
    pages
  }
})

export const getEpisode = (episodeId) => {
  const urlEpisode = `https://rickandmortyapi.com/api/episode/${episodeId}`
  return async (dispatch) => {
    try {
      const resp = await fetch(urlEpisode)
      const data = await resp.json()
      console.log(data)
      dispatch(setCurrentEpisode(data))
    } catch (e) {
      console.log(e)
    }
  }
}

export const setCurrentEpisode = (episode) => ({
  type: types.setCurrentEpisode,
  payload: episode
})

export const getCharacter = (characterId) => {
  const urlCharacter = `https://rickandmortyapi.com/api/character/${characterId}`
  return async (dispatch) => {
    try {
      const resp = await fetch(urlCharacter)
      const data = await resp.json()
      dispatch(setCurrentCharacter(data))
    } catch (e) {
      console.log(e)
    }
  }
}

export const setCurrentCharacter = (character) => ({
  type: types.setCurrentCharacter,
  payload: character
})

export const changePage = (page) => {
  console.log(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export const toggleShowEpisodes = (value) => ({
  type: types.isShowedEpisodes,
  payload: value
})
