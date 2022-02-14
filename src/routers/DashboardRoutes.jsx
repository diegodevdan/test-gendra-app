import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from '../components/home/HomeScreen'
import EpisodeScreen from '../components/episode/EpisodeScreen'
import { AppBarSearch } from '../components/ui/navbar/Navbar'

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
