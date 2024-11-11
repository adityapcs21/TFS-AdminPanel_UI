import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Grid, TextField, Button, Container, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';

// Yup validation schema
const validationSchema = yup.object().shape({
 emailId: yup.string().email('Invalid email address').optional(),
 // mobileNo: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
 message: yup.string().optional(),
 name: yup.string().optional(),
 subject: yup.string().optional(),
});

const FilterCustomerQuery = ({ handleFilter, onClose }) => {
 const appliedFilters = useSelector((state) => state.customerQuery.appliedFilters);

 const { handleSubmit, control, reset, formState: { errors } } = useForm({
  resolver: yupResolver(validationSchema),
  defaultValues: {
   ...appliedFilters
  }
 });

 return (
  <Container>
   <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
    <Typography variant='h5'>Filter Customer Query</Typography>
    <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
   </Box>
   <Grid sx={{ marginTop: '20px' }}>
    <form onSubmit={handleSubmit(handleFilter)}> <Grid container spacing={2}>
     <Grid item xs={12}>
      <Controller
       name="emailId"
       control={control}
       render={({ field }) => (
        <TextField
         {...field}
         fullWidth
         label="Email ID"
         variant="outlined"
         error={!!errors.emailId}
         helperText={errors.emailId?.message}
        />
       )}
      />
     </Grid>
     {/* <Grid item xs={12} sm={6}>
      <Controller
       name="mobileNo"
       control={control}
       render={({ field, fieldState: { errors } }) => (
        <TextField
         {...field}
         label="Mobile Number"
         variant="outlined"
         error={!!errors}
         helperText={errors?.message}
        />
       )}
      />
     </Grid> */}
     <Grid item xs={12}>
      <Controller
       name="message"
       control={control}
       render={({ field }) => (
        <TextField
         {...field}
         fullWidth
         label="Message"
         variant="outlined"
         multiline
         rows={4}
         error={!!errors.message}
         helperText={errors.message?.message}
        />
       )}
      />
     </Grid>
     <Grid item xs={12} sm={6}>
      <Controller
       name="name"
       control={control}
       render={({ field }) => (
        <TextField
         {...field}
         fullWidth
         label="Name"
         variant="outlined"
         error={!!errors.name}
         helperText={errors.name?.message}
        />
       )}
      />
     </Grid>
     <Grid item xs={12} sm={6}>
      <Controller
       name="subject"
       control={control}
       render={({ field }) => (
        <TextField
         {...field}
         fullWidth
         label="Subject"
         variant="outlined"
         error={!!errors.subject}
         helperText={errors.subject?.message}
        />
       )}
      />
     </Grid>
     <Grid item xs={12}>
      <Button type="submit" variant="contained" color="primary">
       Submit
      </Button>
     </Grid>
    </Grid>
    </form>
   </Grid>
  </Container>
 );
};

export default FilterCustomerQuery;
