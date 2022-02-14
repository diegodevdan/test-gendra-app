import React, {useEffect, useState } from 'react'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { CardCharacter } from '../ui/card-character/CardCharacter'
import { getEpisodes } from '../../selectors/episodes/getEpisodes'
import EpisodesList from './episodes-list/EpisodesList'
import { getCharacters } from '../../selectors/characthers/getCharacters'
import '../../styles/home-screen.css';
import SearchIcon from '@mui/icons-material/Search';
import MovieIcon from '@mui/icons-material/Movie'
import CoPresentIcon from '@mui/icons-material/CoPresent'
import SearchBar from '../ui/search-bar/SearchBar'
import CharacterList from './characters-list/CharacterList'

const HomeScreen = () => {
  const [episodes, setEpisodes] = useState([]);
  //TODO make object with episodes and pages, same way for the characters

  const [pages, setPages] = useState(0)
  const [pagesCharacter, setPagesCharacter] = useState(0)
  const [characters, setCharacters] = useState([]);
  const [isShowedEpisodes, setIsShowedEpisodes] = useState(true);

  const showEpisodes = () => {
    setIsShowedEpisodes(prevState => true);
  }

  const changePage = (page) => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    getEpisodes(page).then(({ results }) => setEpisodes(results));
  }

  const changePageCharacters = (page) => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    getCharacters(page).then(({ results }) => setCharacters(results));
  }

  const episodesRecently = () => {
    const recentEpisodes = episodes
      .sort((a,b) => a.created < b.created ? 1 : a.created > b.created ? -1 : 0)
    setEpisodes(prevState => [...recentEpisodes]);
  }

  const episodesOlder = () => {
    const recentEpisodes = episodes
      .sort((a,b) => a.created > b.created ? 1 : a.created < b.created ? -1 : 0)
    setEpisodes(prevState => [...recentEpisodes]);
    console.log(episodes)
  }

  const showCharacters = () => {
    setIsShowedEpisodes(prevState => false);
  }


  useEffect(() => {
    getEpisodes()
      .then(data => {
        setEpisodes(data.results);
        setPages(data.info.pages);
      })
  }, [getEpisodes])

  useEffect(() => {
    getCharacters()
      .then(data => {
        setCharacters(data.results);
        setPagesCharacter(data.info.pages)
      })
  }, [getEpisodes])

  return (
    <div className="main-home-screen">

      <div>

        <div>
          <Button
            onClick={showEpisodes}
            variant="contained"
            endIcon={<MovieIcon />}>
            Episodes
          </Button>
          <Button
            onClick={showCharacters}
            variant="contained"
            endIcon={<CoPresentIcon />}>
            Characters
          </Button>
        </div>
        <SearchBar />
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
            ) : (
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
