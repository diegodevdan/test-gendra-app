import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoutes = ({ children }) => {
  // TODO IMPLEMENT LOGIN SCREEN
  const user = {
    isLogged: true
  }
  return user.isLogged
    ? <Navigate to='/login' />
    : children
}

export default PublicRoutes
