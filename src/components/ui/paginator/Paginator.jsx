import React from 'react'
import { Pagination } from '@mui/material'
import '../../../styles/paginator.css'

const Paginator = ({pages, changePage}) => {
  return (
    <Pagination
      sx={{mt: '2rem'}}
      count={pages}
      color="success"
      onChange={(event, value) => changePage(value)}
    />
  )
}

export default Paginator
