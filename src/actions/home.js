import { types } from '../types/types'

export const getEpisodesRedux = (page = 1) => {
  const urlEpisodes = `https://rickandmortyapi.com/api/episode?page=${page}`
  return async (dispatch) => {
    try {
      const resp = await fetch(urlEpisodes)
      const { info, results } = await resp.json()
      console.log(info)
      dispatch(setEpisodes(results, info.pages))
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
