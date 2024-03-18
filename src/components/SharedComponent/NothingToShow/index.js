import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

export default function NothingToShow() {
 return (
  <Grid container>
   <Grid item xs={12}>
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
     <ManageSearchIcon fontSize='large' />
     <Typography>No Content to show</Typography>
    </Box>
   </Grid>
  </Grid>
 )
}
