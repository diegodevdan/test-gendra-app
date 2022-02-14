import { types } from '../types/types'

const initiaState = {
  episodes: {
    episodes: [],
    pages: 0
  },
  characters: {
    characters: [],
    pages: 0
  }
}

export const homeReducer = (state = initiaState, action) => {
  switch (action.type) {
    case types.getEpisodes:
      return {
        ...state,
        episodes: action.payload.episodes,
        pages: action.payload.pages
      }

    case types.getCharacters:
      return {
        ...state,
        characters: action.payload.characters,
        pages: action.payload.pages
      }

    default:
      break
  }

  return state
}
