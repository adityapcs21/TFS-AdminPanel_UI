import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Grid, Container, Box, Typography, Input, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const schema = yup.object().shape({
 title: yup.string().required(),
 createdBy: yup.string().required(),
 description: yup.string().required(),
 externalLink: yup.string().url().required(),
 media: yup.string().url().required(),
});

const ViewBlog = ({ data, onClose }) => {
 const { title, createdBy, createdDate, description, attachments, externalLink, deleted } = data

 const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
 });

 const onSubmit = (data) => {
  console.log(data);
 };


 return (
  <Container >
   <Box sx={{ display: "flex", justifyContent: 'space-between', padding: '20px 0px' }}>
    <Typography variant='h5'>View Blog Details</Typography>
    <CloseIcon sx={{ cursor: 'pointer' }} onClick={onClose} />
   </Box>
   <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={2}>
     <Grid item xs={6}>
      <Controller
       disabled
       name="title"
       defaultValue={title}
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Title" {...field} error={!!errors.title} helperText={errors.title?.message} />
       )}
      />
     </Grid>
     <Grid item xs={6}>
      <Controller
       disabled
       name="createdBy"
       defaultValue={createdBy}
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Created By" {...field} error={!!errors.createdBy} helperText={errors.createdBy?.message} />
       )}
      />
     </Grid>
     <Grid item xs={6}>
      <TextField fullWidth label="Created On" disabled value={createdDate} />
     </Grid>
     <Grid item xs={6}>
      <TextField fullWidth label="Updated On" disabled value={createdDate} />
     </Grid>

     <Grid item xs={12}>
      <Controller
       disabled
       name="description"
       defaultValue={description}
       control={control}
       render={({ field }) => (
        <TextField id="outlined-multiline-static"
         multiline
         rows={4}
         fullWidth
         label="Description"
         {...field}
         error={!!errors.description}
         helperText={errors.description?.message}
        />
       )}
      />
     </Grid>
     <Grid item xs={12}>
      <Controller
       disabled
       name="externalLink"
       defaultValue={externalLink}
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="External Link" {...field} error={!!errors.externalLink} helperText={errors.externalLink?.message} />
       )}
      />
     </Grid>
     {/* <Grid xs={12}>
      <TextField label="Deleted" disabled value={deleted} />
     </Grid> */}
     <Grid item xs={12}>
      <Box sx={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
       <Typography>Attachments</Typography>
       {attachments && attachments.map((media) => (
        <Box>
         <img src={media} alt="Preview" style={{ maxWidth: '100%', maxHeight: '80px', borderRadius: '5px' }} />
        </Box>
       ))}
      </Box>

     </Grid>
     <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: 'flex-end', gap: '10px' }}>
       <Button variant="contained" color="warning" onClick={onClose}>Close</Button>
      </Box>
     </Grid>
    </Grid>
   </form>
  </Container>
 );
};

export default ViewBlog;
