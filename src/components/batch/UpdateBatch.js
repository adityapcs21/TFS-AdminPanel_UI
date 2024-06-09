import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Grid, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { UpdateBatch } from '../../redux/slice/batch';

const schema = yup.object().shape({
 id: yup.number().optional('Batch No is required'),
 startDate: yup.date().required('Batch Start Date is required'),
 endDate: yup.date()
  .required('Batch End Date is required')
  .min(yup.ref('startDate'), 'End date must be greater than start date'),
});

const UpdateBatchModal = ({ onClose, data }) => {
 const dispatch = useDispatch();
 const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
  defaultValues: {
   id: data.id,
   startDate: moment(data.startDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
   endDate: moment(data.endDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
  },
 });

 const onSubmit = (data) => {
  data.startDate = moment(data.startDate).format('DD-MM-YYYY');
  data.endDate = moment(data.endDate).format('DD-MM-YYYY');
  dispatch(UpdateBatch(data));
  onClose();
 };

 return (
  <Grid container spacing={2}>
   <Grid item xs={12}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0px' }}>
     <Typography variant='h5'>Update Batch</Typography>
     <IconButton onClick={onClose}>
      <CloseIcon />
     </IconButton>
    </Box>
   </Grid>
   <Grid item xs={12}>
    <form onSubmit={handleSubmit((payload) => {
     payload.id = data.id;
     onSubmit(payload);
    })}>
     <Grid container spacing={2}>
      <Grid item xs={12}>
       <Controller
        disabled
        name="id"
        control={control}
        render={({ field }) => (
         <TextField
          type='number'
          label="Batch No"
          variant="outlined"
          fullWidth
          {...field}
          error={!!errors.id}
          helperText={errors.id?.message}
         />
        )}
       />
      </Grid>
      <Grid item xs={12} lg={6}>
       <Controller
        name="startDate"
        control={control}
        render={({ field }) => (
         <TextField
          {...field}
          label="Batch Start Date"
          type="date"
          fullWidth
          error={!!errors.startDate}
          helperText={errors.startDate?.message}
          InputLabelProps={{
           shrink: true,
          }}
         />
        )}
       />
      </Grid>
      <Grid item xs={12} lg={6}>
       <Controller
        name="endDate"
        control={control}
        render={({ field }) => (
         <TextField
          {...field}
          label="Batch End Date"
          type="date"
          fullWidth
          error={!!errors.endDate}
          helperText={errors.endDate?.message}
          InputLabelProps={{
           shrink: true,
          }}
         />
        )}
       />
      </Grid>
      <Grid item xs={12}>
       <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <Button variant="contained" color="warning" onClick={onClose}>
         Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
         Update Batch
        </Button>
       </Box>
      </Grid>
     </Grid>
    </form>
   </Grid>
  </Grid>
 );
};

export default UpdateBatchModal;
