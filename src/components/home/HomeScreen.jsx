import React, { useEffect } from 'react'
import EpisodesList from './episodes-list/EpisodesList'
import '../../styles/home-screen.css'
import SearchBar from '../ui/search-bar/SearchBar'
import CharacterList from './characters-list/CharacterList'
import HeadersButtons from '../ui/header-buttons/HeadersButtons'
import RmLogo from '../../assets/statics/Rick_and_Morty_Logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { getCharactersRedux, getEpisodesRedux } from '../../actions/home'

// I HAVE A LITTLE PROBLEM WITH THE API RICK AND MORTY BUT WELL...
// IF YOU WANT TO KNOW I CAN TELL YOU

// IMPORTANT, I EVER TRY TO MAKE MY FUNCTIONS, METHODS WITH THE LESS
// ARGUMENTS POSSIBLE, FOR MY EXPERIENCE THIS IS THE BEST WAY POR
// HAVE A CLEAN CODE - UNCLE BOB KNOWLEDGE

const HomeScreen = () => {
  const dispatch = useDispatch()
  const { home } = useSelector(home => home)
  const { episodes, characters, isShowedEpisodes } = home

  useEffect(() => {
    dispatch(getEpisodesRedux)
  }, [])

  useEffect(() => {
    dispatch(getCharactersRedux)
  }, [])

  return (
    <div className='main-home-screen'>
      <div className='main-home-screen rm-logo'>
        <img src={RmLogo} alt='rick and morty logo' />
      </div>

      <div>
        <HeadersButtons />

        <SearchBar />

        <h1>
          {isShowedEpisodes ? 'EPISODES' : 'CHARACTERS'} <br />
          <small> Total pages: {isShowedEpisodes ? episodes.pages : characters.pages}</small>
        </h1>
      </div>

      {
        isShowedEpisodes
          ? <EpisodesList />
          : <CharacterList />
      }
    </div>
  )
}

export default HomeScreen
