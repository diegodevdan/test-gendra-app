import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'
import LoginScreen from '../components/login/LoginScreen'
import PrivateRoutes from './PrivateRoutes'
import DashboardRoutes from './DashboardRoutes'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>

          <Route
            path='/login'
            element={
              <PublicRoutes>
                <LoginScreen />
              </PublicRoutes>
            }
          />

          <Route
            path='/*'
            element={
              <PrivateRoutes>
                <DashboardRoutes />
              </PrivateRoutes>
            }
          />

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default AppRouter
