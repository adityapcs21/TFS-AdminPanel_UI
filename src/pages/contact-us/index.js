import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
 supportEmail: yup.string().email().required(),
 description: yup.string().required(),
});

export default function ContactUs() {
 const { control, register, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
 });


 const onSubmit = (data) => {
  console.log("data", data)
 };

 return (
  <Paper sx={{ paddingTop: '24px' }}>
   <form onSubmit={handleSubmit(onSubmit)}>
    <Grid padding={"0px 24px 24px 24px"} container spacing={3}>
     <Grid item xs={12}>
      <Typography variant='h6'>Contact Us</Typography>
     </Grid>
     <Grid item xs={12} md={6}>
      <TextField value="Train for success" fullWidth id="title" label="Title" variant="outlined" />
     </Grid>
     <Grid item xs={12} md={6} >
      <TextField value="Happy to hear from you, Please submit your details for details on next batch for TIC" fullWidth id="subtitle" label="Subtitle" variant="outlined" />
     </Grid>
     <Grid item xs={12} md={12}>
      <TextField value="info@example.com" fullWidth id="email" label="Email Id" variant="outlined" />
     </Grid>
     <Grid item xs={12} md={12}>
      <TextField value="house no- 432, sector 40" fullWidth id="address" label="Address" variant="outlined" multiline rows={3} />
     </Grid>
     <Grid item xs={12} md={6}>
      <TextField value={"20.303418"} fullWidth id="lat" label="latitude" variant="outlined" />
     </Grid>
     <Grid item xs={12} md={6}>
      <TextField value="81.325314" fullWidth id="lng" label="longitude" variant="outlined" />
     </Grid>

     <Grid item xs={12} sx={{ textAlign: 'end' }}>
      <Button variant='contained'>Update</Button>
     </Grid>
    </Grid>
   </form>
  </Paper>
 )
}

