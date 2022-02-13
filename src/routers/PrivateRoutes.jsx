import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({children}) => {
//TODO REDUX GET USER
  const user = {
    isLogged: false
  }

  return user.isLogged
    ? children
    : <Navigate to="/login" />
}

export default PrivateRoutes
