import CloseIcon from '@mui/icons-material/Close';
import { UpdateAdminUser } from '../../../redux/slice/manageUser';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { MenuItem, TextField, Button, Grid, Container, Box, Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

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

const UpdateAdmin = ({ onClose, editData }) => {
 const { emailId, name, userRole, group, subgroup } = editData

 const [selectedFirst, setSelectedFirst] = useState(group);
 const [selectedSecond, setSelectedSecond] = useState(subgroup)

 const dispatch = useDispatch()
 const { control, handleSubmit, watch, formState: { errors } } = useForm({
  resolver: yupResolver(validationSchema),
 });

 useEffect(() => {
  setSelectedFirst(watch('group'))
 }, [watch('group')])


 useEffect(() => {
  setSelectedSecond(watch('subgroup'))
 }, [watch('subgroup')])

 const firstSelectOptions = userRoles.map((role) => ({ label: role.name, value: role.name }));

 const secondSelectOptions = userRoles
  .find((role) => role.name === selectedFirst)
  ?.subgroup.map((subgroup) => ({ label: subgroup.name, value: subgroup.name })) || [];

 const thirdSelectOptions = userRoles
  .find((role) => role.name === selectedFirst)
  ?.subgroup.find((subgroup) => subgroup.name === selectedSecond)
  ?.role.map((role) => ({ label: role, value: role })) || [];

 const onSubmit = (data) => {
  dispatch(UpdateAdminUser(data))
  onClose()
 };


 return (
  <Container >
   <Box sx={{ display: "flex", justifyContent: 'space-between', padding: '20px 0px' }}>
    <Typography variant='h5'>Update Admin</Typography>
    <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
   </Box>
   <form onSubmit={handleSubmit((data) => {
    data.status = "ACTIVE";
    onSubmit(data);
   })}>
    <Grid container spacing={2}>
     <Grid item xs={12}>
      <Controller
       defaultValue={emailId}
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
       defaultValue={name}
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
       defaultValue={group}
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
       defaultValue={subgroup}
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
       defaultValue={userRole}
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
       <Button type="submit" variant="contained" color="primary">Update User</Button>
      </Box>
     </Grid>

    </Grid>
   </form>
  </Container>
 );
};

export default UpdateAdmin;

