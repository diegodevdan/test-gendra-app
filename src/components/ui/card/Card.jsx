import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const CardEpisode = (
  {
    name,
    numberEpisode,
    airDate,
    imgEpisode,
    id
  }) => {
  const navigate = useNavigate()

  const redirectEpisode = () => {
    navigate(`/episodes/${id}`)
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='140'
          image={imgEpisode}
          alt='image episode'
        />
        <CardContent>
          <Typography noWrap gutterBottom variant='h5' component='div'>
            {name}
            <br />
            Episode #{numberEpisode}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {airDate}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size='small'
          color='primary'
          onClick={redirectEpisode}
        >
          Go to te episode
        </Button>
      </CardActions>
    </Card>
  )
}
