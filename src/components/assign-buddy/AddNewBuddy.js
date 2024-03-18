import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { GetAllStudentsList } from '../../redux/slice/students';
import { GetAllUserList } from '../../redux/slice/manageUser';
import CloseIcon from '@mui/icons-material/Close';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { AssignBuddy } from '../../redux/slice/buddyAssignment';

const schema = yup.object().shape({
  students: yup.array().min(1, 'Select at least one student').required(),
  admin: yup.object().shape({
    name: yup.string().required('Select an admin'),
  }),
});

export default function AddNewBuddy({ onClose }) {
  const dispatch = useDispatch();
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [options, setOptions] = useState([]);
  const [allAdmins, setAllAdmins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(GetAllStudentsList({ renewalDue: true, search: '' }));
        const userList = response.payload?.userList || [];
        setOptions(userList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let payload = {};
    dispatch(GetAllUserList(payload))
      .then((response) => {
        const admnList = response.payload?.userList || [];
        setAllAdmins(admnList);
      });
  }, []);

  const onSubmit = (data) => {
    // Handle the form submission logic here
    const finalData = {
      user: data.students?.map(userId => userId.uniqueId.toString()), // Assuming user IDs are numbers, convert them to strings
      adminId: data.admin.emailId,
    };
    onClose()
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Add New Buddy?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2c4c74",
      cancelButtonColor: "#f36334",
      confirmButtonText: "Yes, Add it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Added!",
          text: "Your file has been added.",
          icon: "success"
        });
        dispatch(AssignBuddy(finalData))
      }
    });
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant='h6'>Assign New Buddy</Typography>
            <CloseIcon onClick={onClose} sx={{ cursor: 'pointer' }} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="students"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Autocomplete
                multiple
                options={options}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                value={field.value}
                onChange={(e, newValue) => setValue('students', newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Students" variant="outlined" fullWidth error={!!errors.students} helperText={errors.students?.message} />
                )}
              />
            )}
          />
          <Typography variant="body2" color="error">{errors.students?.message}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="admin"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <Autocomplete
                options={allAdmins}
                getOptionLabel={(option) => option.name}
                value={field.value}
                onChange={(e, newValue) => setValue('admin', newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Admin" variant="outlined" fullWidth error={!!errors.admin} helperText={errors.admin?.message} />
                )}
              />
            )}
          />
          <Typography variant="body2" color="error">{errors.admin?.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: 'flex-end', gap: '10px' }}>
            <Button variant="contained" color="warning" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Add</Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
