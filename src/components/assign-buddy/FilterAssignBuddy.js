import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextField, Button, Grid, Container, Typography, Box, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from 'yet-another-react-lightbox';

const schema = Yup.object().shape({
 buddyId: Yup.string()
  .email('Invalid email format')
  .nullable() // Allow null values
  .trim(), // Trim whitespace
 userId: Yup.string()
  .nullable() // Allow null values
  .trim(), // Trim whitespace
});

export default function FilterAssignBuddy({ onClose, handleFilter }) {
 const dispatch = useDispatch();
 const appliedFilters = useSelector(state => state.buddyAssignment.AppliedFilters);
 const { reset, watch, control, handleSubmit, setValue, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
  defaultValues: {
   buddyId: appliedFilters.buddyId,
   userId: appliedFilters.userId,
  }
 });

 const ResetFilter = () => {
  reset({
   buddyId: "",
   userId: "",
  })
 }

 return (
  <Container>
   <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
    <Typography variant='h5'>Filter Student</Typography>
    <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
   </Box>

   <form onSubmit={handleSubmit(handleFilter)}>
    <Grid container spacing={2}>
     <Grid item xs={12}>
      <Controller
       name="buddyId"
       control={control}
       defaultValue=""
       render={({ field }) => (
        <TextField
         {...field}
         label="Buddy ID (Email)"
         variant="outlined"
         fullWidth
         error={!!errors.buddyId}
         helperText={errors.buddyId ? errors.buddyId.message : ''}
        />
       )}
      />
     </Grid>
     <Grid item xs={12}>
      <Controller
       name="userId"
       control={control}
       defaultValue=""
       render={({ field }) => (
        <TextField
         {...field}
         label="User ID"
         variant="outlined"
         fullWidth
         error={!!errors.userId}
         helperText={errors.userId ? errors.userId.message : ''}
        />
       )}
      />
     </Grid>

     <Grid item xs={12}>
      <Stack direction="row" spacing={2}>
       <Button
        type="button"
        variant="contained"
        color="secondary"
        onClick={() => ResetFilter()}
       >
        Reset
       </Button>
       <Button type="submit" variant="contained" color="primary" >
        Search
       </Button>
      </Stack>
     </Grid>
    </Grid>
   </form>
  </Container>
 );
};

