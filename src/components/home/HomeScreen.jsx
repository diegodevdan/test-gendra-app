import React, { useEffect, useState } from 'react'
import { getEpisodes } from '../../selectors/episodes/getEpisodes'
import EpisodesList from './episodes-list/EpisodesList'
import { getCharacters } from '../../selectors/characthers/getCharacters'
import '../../styles/home-screen.css'
import SearchBar from '../ui/search-bar/SearchBar'
import CharacterList from './characters-list/CharacterList'
import HeadersButtons from '../ui/header-buttons/HeadersButtons'
import RmLogo from '../../assets/statics/Rick_and_Morty_Logo.png'

// I HAVE A LITTLE PROBLEM WITH THE API RICK AND MORTY BUT WELL...
// IF YOU WANT TO KNOW I CAN TELL YOU

// IMPORTANT, I EVER TRY TO MAKE MY FUNCTIONS, METHODS WITH THE LESS
// ARGUMENTS POSSIBLE, FOR MY EXPERIENCE THIS IS THE BEST WAY POR
// HAVE A CLEAN CODE - UNCLE BOB KNOWLEDGE

const HomeScreen = () => {
  // TODO make object with episodes and pages, same way for the characters
  const [episodes, setEpisodes] = useState([])
  const [pages, setPages] = useState(0)
  const [pagesCharacter, setPagesCharacter] = useState(0)
  const [characters, setCharacters] = useState([])
  const [isShowedEpisodes, setIsShowedEpisodes] = useState(true)

  const setSearchResults = (pages, results, isEpisode) => {
    if (isEpisode) {
      setIsShowedEpisodes(true)
      setEpisodes(prevState => [...results])
      setPages(pages)
    } else {
      setIsShowedEpisodes(false)
      setCharacters(results)
      setPagesCharacter(pages)
    }
  }

  const showEpisodes = () => {
    setIsShowedEpisodes(prevState => true)
  }

  const changePage = (page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    getEpisodes(page).then(({ results }) => setEpisodes(results))
  }

  const changePageCharacters = (page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    getCharacters(page).then(({ results }) => setCharacters(results))
  }

  const episodesRecently = () => {
    const recentEpisodes = episodes
      .sort((a, b) => a.created < b.created ? 1 : a.created > b.created ? -1 : 0)
    setEpisodes(prevState => [...recentEpisodes])
  }

  const episodesOlder = () => {
    const recentEpisodes = episodes
      .sort((a, b) => a.created > b.created ? 1 : a.created < b.created ? -1 : 0)
    setEpisodes(prevState => [...recentEpisodes])
  }

  const showCharacters = () => {
    setIsShowedEpisodes(prevState => false)
  }

  useEffect(() => {
    getEpisodes()
      .then(data => {
        setEpisodes(data.results)
        setPages(data.info.pages)
      })
  }, [getEpisodes])

  useEffect(() => {
    getCharacters()
      .then(data => {
        setCharacters(data.results)
        setPagesCharacter(data.info.pages)
      })
  }, [getCharacters])

  return (
    <div className='main-home-screen'>
      <div className='main-home-screen rm-logo'>
        <img src={RmLogo} alt='rick and morty logo' />
      </div>

      <div>
        <HeadersButtons
          showEpisodes={showEpisodes}
          showCharacters={showCharacters}
        />
        <SearchBar
          setSearchResults={setSearchResults}
        />
        <h1>
          {isShowedEpisodes ? 'EPISODES' : 'CHARACTERS'} <br />
          <small> Total pages: {isShowedEpisodes ? pages : pagesCharacter}</small>
        </h1>
      </div>
      {
        isShowedEpisodes
          ? (
            <>
              <EpisodesList
                episodes={episodes}
                changePage={changePage}
                episodesOlder={episodesOlder}
                episodesRecently={episodesRecently}
                pages={pages}
              />
            </>
            )
          : (
            <CharacterList
              characters={characters}
              pages={pagesCharacter}
              changePage={changePageCharacters}
            />
            )
      }
    </div>
  )
}

export default HomeScreen
