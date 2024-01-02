import { CircularProgress, Grid } from '@mui/material'
import React from 'react'

export default function Loader() {
 return (
  <Grid sx={{ height: '100vh', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
   <CircularProgress />
  </Grid>
 )
}
