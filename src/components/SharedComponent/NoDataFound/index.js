import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import SourceIcon from '@mui/icons-material/Source';

export default function NoDataFound() {
 return (
  <Grid container>
   <Grid item xs={12}>
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
     <SourceIcon sx={{ fontSize: '80px' }} />
     <Typography variant='h5'>No Data Found</Typography>
    </Box>
   </Grid>
  </Grid>
 )
}
