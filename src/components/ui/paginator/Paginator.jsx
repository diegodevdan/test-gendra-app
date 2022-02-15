import React from 'react'
import { Pagination } from '@mui/material'
import '../../../styles/paginator.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCharactersRedux, getEpisodesRedux } from '../../../actions/home'

const Paginator = ({ pages }) => {
  const dispatch = useDispatch()
  const { home } = useSelector(home => home)
  const { isShowedEpisodes } = home

  const setPage = (value) => {
    if (isShowedEpisodes) {
      dispatch(getEpisodesRedux(value))
    } else {
      dispatch(getCharactersRedux(value))
    }
  }

  return (
    <Pagination
      sx={{ mt: '2rem' }}
      count={pages}
      color='success'
      onChange={(event, value) => setPage(value)}
    />
  )
}

export default Paginator
