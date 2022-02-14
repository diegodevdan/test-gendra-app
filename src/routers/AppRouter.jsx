import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'
import LoginScreen from '../components/login/LoginScreen'
import PrivateRoutes from './PrivateRoutes'
import DashboardRoutes from './DashboardRoutes'

// PRIVATE AND PUBLIC ROUTES NOT MAKE SENSE IN THIS TASK,
// I WILL IMPLEMENTS THAT BUT I DON'T HAVE ENOUGHT TIME.

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
