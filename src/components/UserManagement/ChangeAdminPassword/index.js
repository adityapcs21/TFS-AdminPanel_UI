// Form.jsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid, TextField, Button } from '@mui/material';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { ChangeAdminPassword } from '../../../redux/slice/manageUser';

const schema = yup.object().shape({
 password: yup
  .string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(
   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
   'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character'
  ),
 newPassword: yup
  .string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(
   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
   'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character'
  ),
});

const ChangePassword = ({ onClose }) => {
 const dispatch = useDispatch();
 const { handleSubmit, control, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
 });

 const onSubmit = (data) => {
  onClose()
  console.log(data);
  Swal.fire({
   title: "Are you sure?",
   text: "You want to Update Password?",
   icon: "warning",
   showCancelButton: true,
   confirmButtonColor: "#3085d6",
   cancelButtonColor: "#d33",
   confirmButtonText: "Yes, Update it!"
  }).then((result) => {
   if (result.isConfirmed) {
    dispatch(ChangeAdminPassword(data))
     .then((response) => {
      console.log("response", response.payload.data)
      Swal.fire({
       title: "Updated!",
       text: response?.payload?.data,
       icon: "success"
      });
     })
   }
  });
 };

 return (
  <form onSubmit={handleSubmit(onSubmit)}>
   <Grid container spacing={2}>
    <Grid item xs={12}>
     <Controller
      name="password"
      control={control}
      defaultValue=""
      render={({ field }) => (
       <TextField
        {...field}
        label="Password"
        variant="outlined"
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message}
       />
      )}
     />
    </Grid>
    <Grid item xs={12}>
     <Controller
      name="newPassword"
      control={control}
      defaultValue=""
      render={({ field }) => (
       <TextField
        {...field}
        label="New Password"
        variant="outlined"
        fullWidth
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message}
       />
      )}
     />
    </Grid>
    <Grid item xs={12} display="flex" justifyContent="flex-end" >
     <Button type="submit" variant="contained" color="primary">
      Update Password
     </Button>
    </Grid>
   </Grid>
  </form>
 );
};

export default ChangePassword;
