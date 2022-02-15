import React from 'react'
import { Button } from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie'
import CoPresentIcon from '@mui/icons-material/CoPresent'
import '../../../styles/headers-buttons.css'
import { toggleShowEpisodes } from '../../../actions/home'
import { useDispatch } from 'react-redux'

const HeadersButtons = () => {
  const dispatch = useDispatch()

  const showEpisodes = (value) => {
    dispatch(toggleShowEpisodes(value))
  }

  return (
    <div
      className='header-buttons-main'
    >
      <div
        className='header-buttons-main cont-button'
      >
        <Button
          color='success'
          size='large'
          onClick={() => showEpisodes(true)}
          variant='contained'
          endIcon={<MovieIcon />}
        >
          Episodes
        </Button>
      </div>

      <div
        className='header-buttons-main cont-button'
      >
        <Button
          color='success'
          size='large'
          onClick={() => showEpisodes(false)}
          variant='contained'
          endIcon={<CoPresentIcon />}
        >
          Characters
        </Button>
      </div>

    </div>
  )
}

export default HeadersButtons
