import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, Container, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { UpdateStudentData } from '../../redux/slice/students';


const ViewStudent = ({ onClose, data }) => {
 const {
  uniqueId,
  emailAddress,
  mobileNumber,
  firstName,
  lastName,
  batchNo,
  subscriptionEndDate,
  subscriptionType,
  createdDate,
  updatedDate,
  deleted,
  status,
  incorrectPasswordCount,
  otp,
 } = data

 const dispatch = useDispatch()
 const { control, handleSubmit, formState: { errors } } = useForm({});


 const onSubmit = (data) => {
  data.subscriptionEndDate = moment(subscriptionEndDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
  dispatch(UpdateStudentData(data))
  onClose()
 };


 return (
  <Container >
   <Box sx={{ display: "flex", justifyContent: 'space-between', padding: '20px 0px' }}>
    <Typography variant='h5'>View Student Details</Typography>
    <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
   </Box>
   <form onSubmit={handleSubmit((data) => {
    data.uniqueId = uniqueId;
    onSubmit(data);
   })}>
    <Grid container spacing={2}>

     <Grid item xs={12} md={6}>
      <Controller
       disabled
       defaultValue={firstName}
       name="firstName"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="First Name" {...field} error={!!errors.firstName} helperText={errors.firstName?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>

     <Grid item xs={12} md={6}>
      <Controller
       disabled
       defaultValue={lastName}
       name="lastName"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Last Name" {...field} error={!!errors.lastName} helperText={errors.lastName?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>

     <Grid item xs={12} md={6}>
      <Controller
       disabled
       defaultValue={emailAddress}
       name="emailAddress"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Email Id" {...field} error={!!errors.emailAddress} helperText={errors.emailAddress?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>

     <Grid item xs={12} md={6}>
      <Controller
       disabled
       defaultValue={mobileNumber}
       name="mobileNumber"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Mobile Number" {...field} error={!!errors.mobileNumber} helperText={errors.mobileNumber?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>

     <Grid item xs={12} md={4}>
      <Controller
       disabled
       name="createdDate"
       control={control}
       defaultValue={moment(createdDate, 'DD/MM/YYYY').format('YYYY-MM-DD')}
       render={({ field }) => (
        <TextField
         {...field}
         label="created Date"
         type="date"
         fullWidth
         error={!!errors.createdDate}
         helperText={errors.createdDate?.message}
        />
       )}
      />
     </Grid>

     <Grid item xs={12} md={4}>
      <Controller
       disabled
       name="updatedDate"
       control={control}
       defaultValue={moment(updatedDate, 'DD/MM/YYYY').format('YYYY-MM-DD')}
       render={({ field }) => (
        <TextField
         {...field}
         label="Updated Date"
         type="date"
         fullWidth
         error={!!errors.updatedDate}
         helperText={errors.updatedDate?.message}
        />
       )}
      />
     </Grid>

     <Grid item xs={12} md={4}>
      <Controller
       disabled
       name="subscriptionEndDate"
       control={control}
       defaultValue={moment(subscriptionEndDate, 'DD/MM/YYYY').format('YYYY-MM-DD')}
       render={({ field }) => (
        <TextField
         {...field}
         label="Subscription End Date"
         type="date"
         fullWidth
         error={!!errors.subscriptionEndDate}
         helperText={errors.subscriptionEndDate?.message}
        />
       )}
      />
     </Grid>

     <Grid item xs={12} md={4}>
      <Controller
       disabled
       defaultValue={batchNo}
       name="batchNo"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Batch Number" {...field} error={!!errors.batchNo} helperText={errors.batchNo?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>

     <Grid item xs={12} md={4}>
      <Controller
       disabled
       defaultValue={subscriptionType}
       name="subscriptionType"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Subscription Type" {...field} error={!!errors.subscriptionType} helperText={errors.subscriptionType?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>


     <Grid item xs={12} md={4}>
      <Controller
       disabled
       defaultValue={incorrectPasswordCount}
       name="incorrectPasswordCount"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Subscription Type" {...field} error={!!errors.incorrectPasswordCount} helperText={errors.incorrectPasswordCount?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>

     <Grid item xs={12} md={4}>
      <Controller
       disabled
       defaultValue={incorrectPasswordCount}
       name="incorrectPasswordCount"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Subscription Type" {...field} error={!!errors.incorrectPasswordCount} helperText={errors.incorrectPasswordCount?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>

     <Grid item xs={12} md={4}>
      <Controller
       disabled
       defaultValue={status}
       name="status"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Status" {...field} error={!!errors.status} helperText={errors.status?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>

     <Grid item xs={12} md={4}>
      <Controller
       disabled
       defaultValue={otp}
       name="otp"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="otp" {...field} error={!!errors.otp} helperText={errors.otp?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>

     <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: 'flex-end', gap: '10px' }}>
       <Button variant="contained" color="warning" onClick={onClose}>Cancel</Button>
      </Box>
     </Grid>

    </Grid>
   </form>
  </Container>
 );
};

export default ViewStudent;

