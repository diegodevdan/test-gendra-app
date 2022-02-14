import React from 'react'
import { Button } from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie'
import CoPresentIcon from '@mui/icons-material/CoPresent'
import '../../../styles/headers-buttons.css'

const HeadersButtons = ({showEpisodes, showCharacters}) => {
  return (
    <div
      className="header-buttons-main"
    >
      <div
        className="header-buttons-main cont-button"
      >
        <Button
          color={'success'}
          size={'large'}
          onClick={showEpisodes}
          variant="contained"
          endIcon={<MovieIcon />}>
          Episodes
        </Button>
      </div>

      <div
        className="header-buttons-main cont-button"
      >
        <Button
          color={'success'}

          size={'large'}
          onClick={showCharacters}
          variant="contained"
          endIcon={<CoPresentIcon />}>
          Characters
        </Button>
      </div>


    </div>
  )
}

export default HeadersButtons
