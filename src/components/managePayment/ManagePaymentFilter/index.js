import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import { TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, Container, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import moment from 'moment';

const schema = yup.object().shape({
  userId: yup.string().optional(),
  paymentStatus: yup.string().oneOf(['created', 'attempted', 'paid', '']).optional(),
  action: yup.string().oneOf(['SUBSCRIPTION', 'BATCH_UPDATE', ""]).optional(),
  fromDate: yup.string().nullable()
    .test({
      test: function (startDate) {
        const endDate = this.resolve(yup.ref('toDate'));
        if (startDate && endDate) {
          return startDate <= endDate;
        }
        return true;
      },
      message: 'Start date must be before or equal to end date',
    }).default(''),
  toDate: yup.string().nullable()
    .test({
      test: function (endDate) {
        const startDate = this.resolve(yup.ref('fromDate'));
        if (startDate && endDate) {
          return endDate >= startDate;
        }
        return true;
      },
      message: 'End date must be after or equal to start date',
    }).default(''),
});

const ManagePaymentFilters = ({ handleFilter, onClose }) => {
  const appliedFilters = useSelector(state => state.managePayment.appliedFilters);
  console.log(appliedFilters)
  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      "userId": appliedFilters.userId,
      "paymentStatus": appliedFilters.paymentStatus,
      "fromDate": appliedFilters.fromDate ? moment(appliedFilters.fromDate, 'DD-MM-YYYY').format('YYYY-MM-DD') : null,
      "action": appliedFilters.action,
      "toDate": appliedFilters.toDate ? moment(appliedFilters.toDate, 'DD-MM-YYYY').format('YYYY-MM-DD') : null,
    }
  });

  const handleReset = () => {
    reset(); // Reset the form
  };

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: 'space-between', marginBottom: "20px" }}>
        <Typography variant='h5'>Filter Student</Typography>
        <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
      </Box>
      <form onSubmit={handleSubmit(handleFilter)}>
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <Controller
              name="userId"
              control={control}
              render={({ field }) => (
                <TextField label="User ID" {...field} error={!!errors.userId} helperText={errors.userId?.message} fullWidth />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="paymentStatus"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Payment Status</InputLabel>
                  <Select
                    {...field}
                    error={!!errors.paymentStatus}
                    label="Payment Status"
                    value={field.value || ''}
                  >
                    <MenuItem value="">Select Payment Status</MenuItem>
                    <MenuItem value="created">Created</MenuItem>
                    <MenuItem value="attempted">Attempted</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="action"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Action</InputLabel>
                  <Select
                    {...field}
                    error={!!errors.action}
                    label="Action"
                    value={field.value || ''}
                  >
                    <MenuItem value="">Select Action</MenuItem>
                    <MenuItem value="SUBSCRIPTION">Subscription</MenuItem>
                    <MenuItem value="BATCH_UPDATE">Batch Update</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="fromDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="From Date"
                  type="date"
                  error={!!errors.fromDate}
                  helperText={errors.fromDate?.message}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>


          <Grid item xs={12} md={6}>
            <Controller
              // defaultValue={moment(appliedFilters.toDate, 'DD-MM-YYYY').format('YYYY-MM-DD')}
              name="toDate"
              control={control}
              render={({ field }) => (
                <TextField

                  {...field}
                  label="To Date"
                  type="date"
                  error={!!errors.toDate}
                  helperText={errors.toDate?.message}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: '10px' }}>

              <Button type="button" variant="contained" color="secondary" onClick={handleReset}>
                Reset
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Search
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ManagePaymentFilters;
