import React from 'react'
import { Alert, Grid } from '@mui/material'
import EpisodeGrid from './EpisodeGrid'
import '../../../styles/episode-list.css'
import Paginator from '../../ui/paginator/Paginator'

// I SEPARATE EPISODE LIST, AND I MADE LITTLE COMPONENTS
// EXTRA, I ADD A LITTLE FILTER OF RECENT OR RECENTLY EPISODE
const EpisodesList = ({
  episodes,
  changePage,
  episodesRecently,
  episodesOlder,
  pages
}) => {
  if (episodes.length === 0) {
    return (
      <Alert variant='filled' severity='error'>
        Something was grong, try again later
      </Alert>
    )
  }

  return (
    <div
      className='episode-list-main'
    >

      <div className='episode-list-main cont-tabs'>
        <p onClick={episodesRecently}>most recently</p>
        <p onClick={episodesOlder}>most older</p>
      </div>

      <Grid
        container
        spacing={4}
      >
        {
          episodes.map(episode => (
            <EpisodeGrid
              key={episode.id}
              episode={episode}
            />))
        }
      </Grid>

      {
        pages > 1 && (
          <Paginator
            pages={pages}
            changePage={changePage}
          />
        )
      }

    </div>
  )
}

export default EpisodesList
