import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Grid, Container, Box, Typography, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AvatarWithLetters from '../../SharedComponent/ReusableAvatar';
import moment from 'moment';


const schema = yup.object().shape({
 title: yup.string().required(),
 createdBy: yup.string().required(),
 description: yup.string().required(),
 media: yup.string().url().required(),
});

const ViewBlog = ({ data, onClose }) => {
 const { title, createdBy, createdDate, updatedDate, description, attachments, comments } = data

 const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
 });

 const onSubmit = (data) => {
  console.log(data);
 };




 return (
  <Container >
   <Box sx={{ display: "flex", justifyContent: 'space-between', padding: '6px 0px' }}>
    <Typography variant='h5'>View Blog Details</Typography>
    <CloseIcon sx={{ cursor: 'pointer' }} onClick={onClose} />
   </Box>
   <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={1}>
     <Grid item xs={6}>
      <Controller
       disabled
       name="title"
       defaultValue={title}
       control={control}
       render={({ field }) => (
        <TextField size='small' fullWidth label="Title" {...field} error={!!errors.title} helperText={errors.title?.message} />
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
        <TextField size='small' fullWidth label="Created By" {...field} error={!!errors.createdBy} helperText={errors.createdBy?.message} />
       )}
      />
     </Grid>
     {/* <Grid item xs={6}>
      <TextField fullWidth label="Created On" disabled value={createdDate} />
     </Grid>
     <Grid item xs={6}>
      <TextField fullWidth label="Updated On" disabled value={updatedDate} />
     </Grid> */}

     <Grid item xs={12}>
      <Controller
       disabled
       name="description"
       defaultValue={description}
       control={control}
       render={({ field }) => (
        <TextField id="outlined-multiline-static"
         size='small'
         multiline
         rows={3}
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
      <Typography variant='h6'>Attachments</Typography>
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
       {attachments && attachments.map((media) => (
        <Box>
         <img src={media} alt="Preview" style={{ maxWidth: '100%', maxHeight: '80px', borderRadius: '5px' }} />
        </Box>
       ))}
      </Box>
     </Grid>

     <Grid item xs={12}>
      <Typography variant='h6'>Comments</Typography>
      <Box sx={{ maxHeight: '180px', overflow: 'auto' }}>
       {comments && comments.length > 0 ? comments.map((item, index) => (
        < Stack direction={'row'} spacing={2} mb={1}>
         <AvatarWithLetters fullName={item.userName} />
         <Box>
          <Stack direction="row" spacing={2}>
           <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>{item.userName}</Typography>
           <Typography sx={{ fontSize: '13px', color: "lightgray", fontWeight: '400' }}>{item.createdDate}</Typography>
          </Stack>
          <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>{item.text}</Typography>
         </Box>
        </Stack>
       )) :
        <Typography>No comments found</Typography>
       }
      </Box>
     </Grid>
     <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: 'flex-end', gap: '10px' }}>
       <Button variant="contained" color="warning" onClick={onClose}>Close</Button>
      </Box>
     </Grid>
    </Grid>
   </form>
  </Container >
 );
};

export default ViewBlog;
