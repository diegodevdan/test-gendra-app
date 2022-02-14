import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from '../components/home/HomeScreen'
import EpisodeScreen from '../components/episode/EpisodeScreen'
import { AppBarSearch } from '../components/ui/navbar/Navbar'
import CharacterScreen from '../components/character/CharacterScreen'

const DashboardRoutes = () => {
  return (
    <div>
      <AppBarSearch />
      <Routes>
        <Route
          path='/Home'
          element={
            <HomeScreen />
          }
        />

        <Route
          exact
          path='/episodes/:episodeId'
          element={
            <EpisodeScreen />
          }
        />

        <Route
          exact
          path='/characters/:characterId'
          element={
            <CharacterScreen />
          }
        />

        <Route
          path='*'
          element={
            <HomeScreen />
          }
        />

      </Routes>
    </div>
  )
}

export default DashboardRoutes
