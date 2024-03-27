import React, { useState } from 'react';
import { Backdrop, Box, CircularProgress } from '@mui/material';

const backdropStyle = {
 zIndex: 1500, // You can adjust this value based on your layout
 color: '#fff',
};

const FullScreenLoader = ({ loading }) => {
 return (
  <Backdrop style={backdropStyle} open={loading}>
   <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
    <h1>Please wait...!</h1>
    <CircularProgress color="inherit" />
   </Box>
  </Backdrop>
 );
};  

export default FullScreenLoader;
