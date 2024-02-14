import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Grid, Box, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { UpdateSubscriptionPlanAction } from '../../../redux/slice/manageSubscription';
import Swal from 'sweetalert2';

const schema = yup.object().shape({
  fees: yup.number().required('Fees is required').positive('Fees must be a positive number'),
  planName: yup.string().required('Plan Name is required'),
});

const UpdateSubscriptionPlan = ({ data, onClose }) => {
  const { planId, fees, planName } = data
  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    data.planId = planId
    onClose()
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update plan?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(UpdateSubscriptionPlanAction(data))
          .then((response) => {
            if (response.payload && response.payload.message) {
              Swal.fire({
                title: "Not Updated!",
                text: response.payload.message,
                icon: "error"
              });
            } else {
              Swal.fire({
                title: "Updated!",
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
        <Typography variant='h5'>Update Subscription Plan</Typography>
        <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              defaultValue={fees}
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
              defaultValue={planName}
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
              <Button type="submit" variant="contained" color="primary">Update Plan</Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UpdateSubscriptionPlan;
