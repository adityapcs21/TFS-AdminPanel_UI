import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Box, Button, Checkbox, Grid, Stack, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllStudentsList } from '../../redux/slice/students';
import { GetAllUserList } from '../../redux/slice/manageUser';
import CloseIcon from '@mui/icons-material/Close';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { AssignBuddy, buddyIsUpdated } from '../../redux/slice/buddyAssignment';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Loader from '../../common/loader';

// Checkbox Icons
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// Validation Schema
const schema = yup.object().shape({
  students: yup.array().min(1, 'Select at least one student').required(),
  admin: yup.object().required('Select an admin'),
});

export default function AddNewBuddy({ onClose }) {
  const dispatch = useDispatch();
  const { watch, control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [options, setOptions] = useState([]);
  const [allAdmins, setAllAdmins] = useState([]);
  const [studentListLoading, setStudentListLoading] = useState(false);
  const [userListLoading, setUserListLoading] = useState(false);


  // Fetch Students
  useEffect(() => {
    const fetchData = async () => {
      try {
        setStudentListLoading(true)
        const response = await dispatch(GetAllStudentsList({ renewalDue: "YES", search: '' }));
        if (response) {
          const userList = response.payload?.userList || [];
          setOptions(userList);
          setStudentListLoading(false)
        }
      } catch (error) {
        setStudentListLoading(false)
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Fetch Admins
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setUserListLoading(true)
        const response = await dispatch(GetAllUserList({}));
        if (response) {
          setUserListLoading(false)
          const admnList = response.payload?.userList || [];
          setAllAdmins(admnList);
        }
      } catch (error) {
        setUserListLoading(false)
        console.error('Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, [dispatch]);

  const onSubmit = (data) => {
    console.log("data", data)
    const finalData = {
      user: data.students.map(student => student.uniqueId), // Convert IDs to strings
      adminId: data.admin.emailId, // Assuming admin has uniqueId
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
        dispatch(AssignBuddy(finalData)).then(() => {
          Swal.fire({
            title: "Added!",
            text: "Your buddy has been added.",
            icon: "success"
          });
          dispatch(buddyIsUpdated())

        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!userListLoading && !studentListLoading ?
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
              render={({ field }) => (
                <Autocomplete
                  multiple
                  options={options}
                  disableCloseOnSelect
                  getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                  onChange={(event, value) => setValue('students', value)}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {`${option.firstName} ${option.lastName}`}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Students"
                      placeholder="Students"
                      variant="outlined"
                      error={!!errors.students}
                      helperText={errors.students?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="admin"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={allAdmins}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, newValue) => setValue('admin', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Admin"
                      variant="outlined"
                      fullWidth
                      error={!!errors.admin}
                      helperText={errors.admin?.uniqueId}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: 'flex-end', gap: '10px' }}>
              <Button variant="contained" color="warning" onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">Add</Button>
            </Box>
          </Grid>
        </Grid>
        :
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Loader />
          </Grid>
        </Grid>
      }
    </form>
  );
}
