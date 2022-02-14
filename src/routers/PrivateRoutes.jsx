import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({ children }) => {
  // TODO IMPLEMENT LOGIN SCREEN
  const user = {
    isLogged: true
  }
  return user.isLogged
    ? children
    : <Navigate to='/login' />
}

export default PrivateRoutes
