import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid, TextField, Button, Container, Box, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const schema = yup.object().shape({
 name: yup.string().optional(),
 emailId: yup.string().email('Invalid email').optional(),
 group: yup.string().optional(),
 subgroup: yup.string().optional(),
 userRole: yup.string().optional(),
});

const groupOptions = ['ADMIN', 'BUDDY'];
const subgroupOptions = ['RENEWAL', 'ADMIN', 'SOCIAL MEDIA MANAGER', 'Buddy'];
const userRoleOptions = ['RENEWAL', 'SUPER USER', 'RENEWAL LEAD', 'SOCIAL MEDIA MANAGER', 'TIC BUDDY'];

const UserManagementFilter = ({ handleFilter, onClose }) => {
 const { handleSubmit, control, reset, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
 });


 const ResetFilter = () => {
  reset()
 }

 return (
  <Container>
   <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
    <Typography variant='h5'>Filter User</Typography>
    <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
   </Box>

   <Grid sx={{ marginTop: '20px' }}>
    <form onSubmit={handleSubmit(handleFilter)}>
     <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
       <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
         <TextField {...field} label="Name" error={!!errors.name} helpertext={errors.name?.message} fullWidth />
        )}
       />
      </Grid>
      <Grid item xs={12} sm={6}>
       <Controller
        name="emailId"
        control={control}
        defaultValue=""
        render={({ field }) => (
         <TextField {...field} label="Email" error={!!errors.emailId} helpertext={errors.emailId?.message} fullWidth />
        )}
       />
      </Grid>
      <Grid item xs={12} sm={6}>
       <FormControl fullWidth>
        <InputLabel id="group-label">Group</InputLabel>
        <Controller
         name="group"
         control={control}
         defaultValue=""
         render={({ field }) => (
          <Select
           {...field}
           labelId="group-label"
           label="Group"
           error={!!errors.group}
           helpertext={errors.group?.message}
          >
           {groupOptions.map((option, index) => (
            <MenuItem key={index} value={option}>{option}</MenuItem>
           ))}
          </Select>
         )}
        />
       </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
       <FormControl fullWidth>
        <InputLabel id="subgroup-label">Subgroup</InputLabel>
        <Controller
         name="subgroup"
         control={control}
         defaultValue=""
         render={({ field }) => (
          <Select
           {...field}
           labelId="subgroup-label"
           label="Subgroup"
           error={!!errors.subgroup}
           helpertext={errors.subgroup?.message}
          >
           {subgroupOptions.map((option, index) => (
            <MenuItem key={index} value={option}>{option}</MenuItem>
           ))}
          </Select>
         )}
        />
       </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
       <FormControl fullWidth>
        <InputLabel id="userRole-label">User Role</InputLabel>
        <Controller
         name="userRole"
         control={control}
         defaultValue=""
         render={({ field }) => (
          <Select
           {...field}
           labelId="userRole-label"
           label="User Role"
           error={!!errors.userRole}
           helpertext={errors.userRole?.message}
          >
           {userRoleOptions.map((option, index) => (
            <MenuItem key={index} value={option}>{option}</MenuItem>
           ))}
          </Select>
         )}
        />
       </FormControl>
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
   </Grid>
  </Container>
 );
};

export default UserManagementFilter;
