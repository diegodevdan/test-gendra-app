import React from 'react'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import './index.css'
import { store } from './store/store'

const TestGendraApp = () => {
  // MAYBE THE SITE APPEARS LIKE 90'S WEBSITES BUT WORKS... HAHA
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default TestGendraApp
