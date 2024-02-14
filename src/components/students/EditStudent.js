import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, Container, Box, Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { UpdateStudentData } from '../../redux/slice/students';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = yup.object().shape({
 firstName: yup.string().required(),

 lastName: yup.string().required(),
 emailAddress: yup.string().email().required(),
 mobileNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
 subscriptionStartDate: yup.date().required(),
 subscriptionEndDate: yup.date().required(),
 subscriptionType: yup.string().required(),
 batchNo: yup.number().required(),
 status: yup.string().required(),
});

const UpdateStudent = ({ onClose, editData }) => {
 const {
  uniqueId,
  batchNo,
  emailAddress,
  firstName,
  lastName,
  mobileNumber,
  status,
  subscriptionStartDate,
  subscriptionEndDate,
  subscriptionType,
 } = editData

 const dispatch = useDispatch()
 const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(validationSchema),
 });


 const onSubmit = (data) => {
  data.subscriptionEndDate = moment(subscriptionEndDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
  dispatch(UpdateStudentData(data))
  onClose()
 };


 return (
  <Container >
   <Box sx={{ display: "flex", justifyContent: 'space-between', padding: '20px 0px' }}>
    <Typography variant='h5'>Update Student</Typography>
    <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
   </Box>
   <form onSubmit={handleSubmit((data) => {
    data.uniqueId = uniqueId;
    onSubmit(data);
   })}>
    <Grid container spacing={2}>

     <Grid item xs={12} md={6}>
      <Controller
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
       defaultValue={mobileNumber}
       name="mobileNumber"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Mobile Number" {...field} error={!!errors.mobileNumber} helperText={errors.mobileNumber?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>

     <Grid item xs={12} md={6}>
      <Controller
       name="subscriptionStartDate"
       control={control}
       defaultValue={moment(subscriptionStartDate, 'DD/MM/YYYY').format('YYYY-MM-DD')}
       render={({ field }) => (
        <TextField
         {...field}
         label="Subscription Start Date"
         type="date"
         fullWidth
         error={!!errors.subscriptionStartDate}
         helperText={errors.subscriptionStartDate?.message}
        />
       )}
      />
     </Grid>

     <Grid item xs={12} md={6}>
      <Controller
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

     <Grid item xs={12} md={6}>
      <Controller
       defaultValue={batchNo}
       name="batchNo"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Batch Number" {...field} error={!!errors.batchNo} helperText={errors.batchNo?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>

     <Grid item xs={12} md={6}>
      <Controller
       defaultValue={subscriptionType}
       name="subscriptionType"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Subscription Type" {...field} error={!!errors.subscriptionType} helperText={errors.subscriptionType?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>

     <Grid item xs={12} md={6}>
      <Controller
       defaultValue={status}
       name="status"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Status" {...field} error={!!errors.status} helperText={errors.status?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>


     <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: 'flex-end', gap: '10px' }}>
       <Button variant="contained" color="warning" onClick={onClose}>Cancel</Button>
       <Button type="submit" variant="contained" color="primary">Update Student</Button>
      </Box>
     </Grid>

    </Grid>
   </form>
  </Container>
 );
};

export default UpdateStudent;

