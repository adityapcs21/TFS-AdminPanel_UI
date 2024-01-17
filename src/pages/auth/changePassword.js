import { Avatar, Box, Button, Checkbox, FormControl, FormControlLabel, Grid, Link, Paper, TextField, Typography, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LockIcon from '@mui/icons-material/Lock';
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slice/auth';
import routeNames from '../../router/routeNames';

const validationSchema = yup.object().shape({
 emailId: yup.string().email('Invalid email').required('Email is required'),
 password: yup.string().required('Password is required'),
 newPassword: yup.string().required('New Password is required'),
 grantType: yup.string().required('Grant Type is required').oneOf(['password_change'], 'Invalid Grant Type'),
});

export default function ChangePassword() {
 const dispatch = useDispatch();
 const navigate = useNavigate()
 const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem("userDetails")))
 const UserDetails = useSelector(state => state.auth.data)
 const { control, register, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(validationSchema)
 });

 useEffect(() => {
  if (userDetails.token) {
   navigate("/")
  }
  if (!userDetails.passwordChangeRequired) {
   navigate(routeNames.LOGIN)
  }
 }, [userDetails])

 const onSubmit = (data) => {
  dispatch(login(data))
 }

 return (
  <Container container component="main">
   <Wrapper item xs={12} sm={8} md={5} lg={4} component={Paper} elevation={1} square>
    <PaperCont >
     <AvatarCont >
      <LockIcon />
     </AvatarCont>
     <Typography component="h1" variant="h5">
      Change Password
     </Typography>
     <FormCont onSubmit={handleSubmit(onSubmit)}>
      <form onSubmit={handleSubmit(onSubmit)}>
       <Grid container spacing={2}>
        <Grid item xs={12}>
         <Controller
          name="emailId"
          control={control}
          defaultValue=""
          render={({ field }) => (
           <TextField
            {...field}
            label="Email"
            variant="outlined"
            fullWidth
            error={!!errors.emailId}
            helperText={errors.emailId?.message}
           />
          )}
         />
        </Grid>

        <Grid item xs={12}>
         <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
           <TextField
            {...field}
            type="password"
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
            type="password"
            label="New Password"
            variant="outlined"
            fullWidth
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
           />
          )}
         />
        </Grid>

        <Grid item xs={12} display={"none"}>
         <FormControl fullWidth>
          <Controller
           name="grantType"
           control={control}
           defaultValue="password_change"
           render={({ field }) => (
            <TextField
             {...field}
             label="Grant Type"
             variant="outlined"
             fullWidth
             disabled
             InputProps={{ readOnly: true }}
             error={!!errors.grantType}
             helperText={errors.grantType?.message}
            />
           )}
          />
         </FormControl>
        </Grid>

       </Grid>
      </form>
      <SubmitButton type="submit" fullWidth variant="contained" color="primary">Sign In</SubmitButton>
     </FormCont>
    </PaperCont>
   </Wrapper>
  </Container>
 )
}

const Container = styled(Grid)(({ theme }) => ({
 height: "100vh",
 backgroundImage: `url('https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
 backgroundRepeat: "no-repeat",
 backgroundPosition: "center",
 backgroundSize: "cover",
 backgroundColor:
  theme.palette.type === "light"
   ? theme.palette.grey[50]
   : theme.palette.grey[900],

 display: "flex",
 alignItems: "center",
 justifyContent: "center"
}));

const Wrapper = styled(Grid)(({ theme }) => ({
 display: "flex",
 flexDirection: "column",
 alignItems: "center",
 justifyContent: "center"
}));

const PaperCont = styled(Box)(({ theme }) => ({
 margin: theme.spacing(2, 6),
 display: "flex",
 flexDirection: "column",
 alignItems: "center"
}))

const AvatarCont = styled(Avatar)(({ theme }) => ({
 margin: theme.spacing(0),
 backgroundColor: theme.palette.secondary.main
}))

const FormCont = styled(`form`)(({ theme }) => ({
 width: "100%", // Fix IE 11 issue.
 marginTop: theme.spacing(1)
}))

const SubmitButton = styled(Button)(({ theme }) => ({
 margin: theme.spacing(3, 0, 2)
}));

// https://images.unsplash.com/photo-1529539795054-3c162aab037a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D