import React, { useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const backdropStyle = {
 zIndex: 1500, // You can adjust this value based on your layout
 color: '#fff',
};

const FullScreenLoader = ({ loading }) => {
 return (
  <Backdrop style={backdropStyle} open={loading}>
   <h1>Please wait file is being uploaded!</h1>
   <CircularProgress color="inherit" />
  </Backdrop>
 );
};

export default FullScreenLoader;
