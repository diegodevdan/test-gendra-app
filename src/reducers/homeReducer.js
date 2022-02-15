import { types } from '../types/types'
import { initialStateHome } from '../helpers/initStateHome'

export const homeReducer = (state = initialStateHome, action) => {
  switch (action.type) {
    case types.getEpisodes:
      return {
        ...state,
        episodes: {
          episodes: action.payload.episodes,
          pages: action.payload.pages
        }
      }

    case types.getCharacters:
      return {
        ...state,
        characters: {
          characters: action.payload.characters,
          pages: action.payload.pages
        }
      }

    case types.isShowedEpisodes:
      return {
        ...state,
        isShowedEpisodes: action.payload
      }

    case types.setCurrentEpisode:
      return {
        ...state,
        currentEpisode: action.payload
      }

    case types.setCurrentCharacter:
      return {
        ...state,
        currentCharacter: action.payload
      }

    case types.setEpisodesResult:
      return {
        ...state,
        episodes: {
          episodes: action.payload.results,
          pages: action.payload.pages
        }
      }

    case types.setCharactersResult:
      return {
        ...state,
        characters: {
          characters: action.payload.results,
          pages: action.payload.pages
        }
      }

    case types.toggleFilterEpisode:
      return {
        ...state,
        isEpisode: action.payload
      }

    case types.isShowedAlertSearch:
      return {
        ...state,
        showAlertSearch: action.payload
      }

    default:
      break
  }

  return state
}
