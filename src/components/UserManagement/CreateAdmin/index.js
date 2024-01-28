import CloseIcon from '@mui/icons-material/Close';
import { CreateAdminUser } from '../../../redux/slice/manageUser';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { MenuItem, TextField, Button, Grid, Container, Box, Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

const userRoles = [
 {
  name: "ADMIN",
  subgroup: [
   {
    name: "ADMIN",
    role: ["SUPER USER"]
   }
  ]
 },
 {
  name: "BUDDY",
  subgroup: [
   {
    name: "RENEWAL",
    role: ["RENEWAL", "RENEWAL LEAD"]
   },
   {
    name: "BUDDY",
    role: ["TIC BUDDY"]
   },
   {
    name: "SOCIAL MEDIA MANAGER",
    role: ["SOCIAL MEDIA MANAGER"]
   }
  ]
 }
];

const validationSchema = yup.object().shape({
 emailId: yup.string().email().required(),
 name: yup.string().required(),
 userRole: yup.string().required(),
 group: yup.string().required(),
 subgroup: yup.string().required(),
});

const CreateAdmin = ({ onClose }) => {
 const dispatch = useDispatch()
 const { control, handleSubmit, watch, formState: { errors } } = useForm({
  resolver: yupResolver(validationSchema),
 });

 const firstSelectOptions = userRoles.map((role) => ({ label: role.name, value: role.name }));
 const selectedFirst = watch('group');

 const secondSelectOptions = userRoles
  .find((role) => role.name === selectedFirst)
  ?.subgroup.map((subgroup) => ({ label: subgroup.name, value: subgroup.name })) || [];
 const selectedSecond = watch('subgroup');

 const thirdSelectOptions = userRoles
  .find((role) => role.name === selectedFirst)
  ?.subgroup.find((subgroup) => subgroup.name === selectedSecond)
  ?.role.map((role) => ({ label: role, value: role })) || [];

 const onSubmit = (data) => {
  dispatch(CreateAdminUser(data))
  onClose()
 };

 return (
  <Container >
   <Box sx={{ display: "flex", justifyContent: 'space-between', padding: '20px 0px' }}>
    <Typography variant='h5'>Create a new Admin</Typography>
    <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
   </Box>
   <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={2}>
     <Grid item xs={12}>
      <Controller
       name="emailId"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Email Id" {...field} error={!!errors.emailId} helperText={errors.emailId?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>
     <Grid item xs={12} md={6}>
      <Controller
       name="name"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Name" {...field} error={!!errors.name} helperText={errors.name?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>
     <Grid item xs={12} md={6}>
      <Controller
       name="group"
       control={control}
       render={({ field }) => (
        <TextField
         {...field}
         select
         label="Groups"
         variant="outlined"
         fullWidth
         error={!!errors.group}
         helperText={errors.group?.message}
        >
         {firstSelectOptions.map((option, key) => (
          <MenuItem key={key} value={option.value}>
           {option.label}
          </MenuItem>
         ))}
        </TextField>
       )}
      />
     </Grid>
     <Grid item xs={12} md={6}>
      <Controller
       name="subgroup"
       control={control}
       render={({ field }) => (
        <TextField
         {...field}
         disabled={!selectedFirst}
         select
         label="Sub Group"
         variant="outlined"
         fullWidth
         error={!!errors.subgroup}
         helperText={errors.subgroup?.message}
        >
         {secondSelectOptions.map((option, key) => (
          <MenuItem key={key} value={option.value}>
           {option.label}
          </MenuItem>
         ))}
        </TextField>
       )}
      />
     </Grid>
     <Grid item xs={12} md={6}>
      <Controller
       name="userRole"
       control={control}
       render={({ field }) => (
        <TextField
         {...field}
         disabled={!selectedFirst || !selectedSecond}
         select
         label="User Roles"
         variant="outlined"
         fullWidth
         error={!!errors.userRole}
         helperText={errors.userRole?.message}
        >
         {thirdSelectOptions.map((option, key) => (
          <MenuItem key={key} value={option.value}>
           {option.label}
          </MenuItem>
         ))}
        </TextField>
       )}
      />
     </Grid>

     <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: 'flex-end', gap: '10px' }}>
       <Button variant="contained" color="warning" onClick={onClose}>Cancel</Button>
       <Button type="submit" variant="contained" color="primary">Create User</Button>
      </Box>
     </Grid>
    </Grid>
   </form>
  </Container>
 );
};

export default CreateAdmin;

