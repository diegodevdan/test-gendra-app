import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from '../components/home/HomeScreen'
import { ButtonAppBar } from '../components/ui/navbar/Navbar'

const DashboardRoutes = () => {
  return (
    <div>
      <ButtonAppBar />
      <Routes>
        <Route
          path='/Home'
          element={
            <HomeScreen />
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
