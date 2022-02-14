import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'


export const CardCharacter = (
  {
    name,
    gender,
    image,
    specie,
    status,
    location,
    origin,
    id
  }) => {

  const navigate = useNavigate();

  const redirectEpisode = () => {
    navigate(`/characters/${id}`)
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <Avatar  sx={{ width: 56, height: 56 }} alt="img character" src={image}/>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {specie} - {status}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {gender}
        </Typography>
        <Typography variant="body2">
          Location - {location}
          <br />
          Origin - {origin}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          color='primary'
          onClick={redirectEpisode}
        >Learn More</Button>
      </CardActions>
    </Card>
  );
}
