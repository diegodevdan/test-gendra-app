import { types } from '../types/types'

export const getEpisodesRedux = (page = 1) => {
  const urlEpisodes = `https://rickandmortyapi.com/api/episode?page=${page}`
  return async (dispatch) => {
    try {
      const resp = await fetch(urlEpisodes)
      const { info, results } = await resp.json()
      dispatch(setEpisodes(results, info.pages))
      dispatch(changePage(page))
    } catch (e) {
      console.log(e)
    }
  }
}

export const getCharactersRedux = (page = 1) => {
  const urlCharacters = `https://rickandmortyapi.com/api/character?page=${page}`
  return async (dispatch) => {
    try {
      const resp = await fetch(urlCharacters)
      const { info, results } = await resp.json()
      dispatch(setCharacters(results, info.pages))
      dispatch(changePage(page))
    } catch (e) {
      console.log(e)
    }
  }
}

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

export const getEpisode = (episodeId) => {
  const urlEpisode = `https://rickandmortyapi.com/api/episode/${episodeId}`
  return async (dispatch) => {
    try {
      const resp = await fetch(urlEpisode)
      const data = await resp.json()
      dispatch(setCurrentEpisode(data))
    } catch (e) {
      console.log(e)
    }
  }
}

export const searchCharacterRedux = (typeCharacterParameter, specifyParameter, secondaryCharacterParameter) => {
  return async (dispatch) => {
    let url = 'https://rickandmortyapi.com/api/character/?'
    if (!secondaryCharacterParameter.length) {
      url += `${typeCharacterParameter}=${specifyParameter}`
    } else {
      url += `${typeCharacterParameter}=${secondaryCharacterParameter}`
    }
    try {
      const resp = await fetch(url)
      const data = await resp.json()
      if (data.error) {
        dispatch(toggleAlertSearch(true))
        return
      }
      dispatch(setCharactersResults(data.results, data.info.pages))
      dispatch(toggleAlertSearch(false))
      dispatch(toggleShowEpisodes(false))
    } catch (e) {
      console.log(e)
    }
  }
}

export const searchEpisodeRedux = (specifyParameter) => {
  const urlSpecifyCharacters = `https://rickandmortyapi.com/api/episode/?name=${specifyParameter}`
  return async (dispatch) => {
    try {
      const resp = await fetch(urlSpecifyCharacters)
      const data = await resp.json()
      if (data.error) {
        dispatch(toggleAlertSearch(true))
        return
      }
      dispatch(setEpisodesResults(data.results, data.info.pages))
      dispatch(toggleAlertSearch(false))
      dispatch(toggleShowEpisodes(true))
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

export const setCharacters = (characters, pages) => ({
  type: types.getCharacters,
  payload: {
    characters,
    pages
  }
})

export const setCurrentEpisode = (episode) => ({
  type: types.setCurrentEpisode,
  payload: episode
})

export const setCurrentCharacter = (character) => ({
  type: types.setCurrentCharacter,
  payload: character
})

export const changePage = (page) => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export const toggleShowEpisodes = (value) => ({
  type: types.isShowedEpisodes,
  payload: value
})

export const toggleFilter = (isEpisode) => ({
  type: types.toggleFilterEpisode,
  payload: isEpisode
})

export const toggleAlertSearch = (isShowed) => ({
  type: types.isShowedAlertSearch,
  payload: isShowed
})

export const setEpisodesResults = (results, pages) => ({
  type: types.setEpisodesResult,
  payload: {
    results,
    pages
  }
})

export const setCharactersResults = (results, pages) => ({
  type: types.setCharactersResult,
  payload: {
    results,
    pages
  }
})
