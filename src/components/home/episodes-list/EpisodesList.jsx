import React from 'react'
import { Alert, Grid, Pagination } from '@mui/material'
import EpisodeGrid from './EpisodeGrid'

const EpisodesList = ({
  episodes,
  changePage,
  episodesRecently,
  episodesOlder,
  pages
}) => {

  if(episodes.length === 0) return (
    <Alert variant='filled' severity='error'>
      Something was grong, try again later
    </Alert>
  )
  return (
    <>

      <p onClick={episodesRecently}>most recently</p>
      <p onClick={episodesOlder}>most older</p>
      <p onClick={episodesOlder}>most older</p>
      <p onClick={episodesOlder}>most older</p>

      <Grid
        container
        spacing={4}
      >
        {
          episodes.map(episode => (
            <EpisodeGrid
              key={episode.id}
              episode={episode} />))
        }
      </Grid>
      <Pagination
        count={pages}
        color="primary"
        onChange={(event, value) => changePage(value)}
      />
    </>
  )
}

export default EpisodesList
