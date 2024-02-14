import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Grid, Box, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { SendEmailToActiveSubscriptionUsers } from '../../redux/slice/students';

const schema = yup.object().shape({
 subject: yup.string().required('subject is required'),
 message: yup.string().required('message is required'),
});

const SendEmailModal = ({ onClose }) => {
 const dispatch = useDispatch();

 const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
 });

 const onSubmit = (data) => {
  onClose()
  Swal.fire({
   title: "Are you sure?",
   text: "You want to send email?",
   icon: "warning",
   showCancelButton: true,
   confirmButtonColor: "#3085d6",
   cancelButtonColor: "#d33",
   confirmButtonText: "Yes, send it!"
  }).then((result) => {
   if (result.isConfirmed) {
    dispatch(SendEmailToActiveSubscriptionUsers(data))
     .then((response) => {
      if (response.payload && response.payload.message) {
       Swal.fire({
        title: "Not Sent!",
        text: response.payload.message,
        icon: "error"
       });
      } else {
       Swal.fire({
        title: "Email Sent!",
        text: response.payload.data,
        icon: "success"
       });
      }
     })
   }
  });
 };

 return (
  <Container maxWidth="md">
   <Box sx={{ display: "flex", justifyContent: 'space-between', padding: '20px 0px' }}>
    <Typography variant='h5'>Send Email</Typography>
    <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
   </Box>
   <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={2}>
     <Grid item xs={12}>
      <Controller
       name="subject"
       control={control}
       render={({ field }) => (
        <TextField
         {...field}
         label="Subject"
         variant="outlined"
         fullWidth
         error={!!errors.subject}
         helperText={errors.subject?.message}
        />
       )}
      />
     </Grid>
     <Grid item xs={12}>
      <Controller
       name="message"
       control={control}
       render={({ field }) => (
        <TextField
         multiline
         minRows={4}
         {...field}
         label="Message"
         variant="outlined"
         fullWidth
         error={!!errors.message}
         helperText={errors.message?.message}
        />
       )}
      />
     </Grid>
     <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: 'flex-end', gap: '10px' }}>
       <Button variant="contained" color="warning" onClick={() => onClose()}>Cancel</Button>
       <Button type="submit" variant="contained" color="primary">Send Email</Button>
      </Box>
     </Grid>
    </Grid>
   </form>
  </Container>
 );
};

export default SendEmailModal;
