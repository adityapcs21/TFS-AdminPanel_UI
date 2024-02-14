import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Grid, Box, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { CreateSubscriptionPlan } from '../../../redux/slice/manageSubscription';


const schema = yup.object().shape({
 fees: yup.number().required('Fees is required').positive('Fees must be a positive number'),
 planName: yup.string().required('Plan Name is required'),
});

const AddSubscriptionPlan = ({ onClose }) => {
 const dispatch = useDispatch();
 const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
 });

 const onSubmit = (data) => {
  // Handle form submission logic here
  console.log(data);
  dispatch(CreateSubscriptionPlan(data))
 };

 return (
  <Container maxWidth="md">
   <Box sx={{ display: "flex", justifyContent: 'space-between', padding: '20px 0px' }}>
    <Typography variant='h5'>Add new Subscription Plan</Typography>
    <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
   </Box>
   <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={2}>
     <Grid item xs={12}>
      <Controller
       name="fees"
       control={control}
       render={({ field }) => (
        <TextField
         {...field}
         label="Fees"
         variant="outlined"
         fullWidth
         error={!!errors.fees}
         helperText={errors.fees?.message}
        />
       )}
      />
     </Grid>
     <Grid item xs={12}>
      <Controller
       name="planName"
       control={control}
       render={({ field }) => (
        <TextField
         {...field}
         label="Plan Name"
         variant="outlined"
         fullWidth
         error={!!errors.planName}
         helperText={errors.planName?.message}
        />
       )}
      />
     </Grid>
     <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: 'flex-end', gap: '10px' }}>
       <Button type="submit" variant="contained" color="warning" >Cancel</Button>
       <Button type="submit" variant="contained" color="primary">Add Plan</Button>
      </Box>
     </Grid>
    </Grid>
   </form>
  </Container>
 );
};

export default AddSubscriptionPlan;
