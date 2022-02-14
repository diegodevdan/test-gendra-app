import React from 'react'
import { Grid } from '@mui/material'
import { CardEpisode } from '../../ui/card/Card'

const EpisodeGrid = ({ episode }) => {
  return (
    <Grid
      key={episode.id}
      item
      xs={12}
      sm={6}
      md={4}
    >
      <CardEpisode
        id={episode.id}
        name={episode.name}
        airDate={episode.air_date}
        numberEpisode={episode.id}
        imgEpisode="https://acortar.link/N2buEE"
      />
    </Grid>
  )
}

export default EpisodeGrid
