import { Avatar, Box, Button, CircularProgress, FormControl, Grid, IconButton, InputAdornment, Paper, TextField, Typography, } from '@mui/material'
import React, { useState } from 'react'
import LockIcon from '@mui/icons-material/Lock';
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import routeNames from '../../router/routeNames';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const validationSchema = yup.object().shape({
  emailId: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  newPassword: yup.string().required('New Password is required'),
  grantType: yup.string().required('Grant Type is required').oneOf(['password_change'], 'Invalid Grant Type'),
});

export default function ChangePassword() {
  const navigate = useNavigate()
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const [loginError, setLoginError] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = async (data) => {
    setIsClicked(true)
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}auth/admin/login`, data);
      if (response.data) {
        localStorage.setItem("userDetails", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.accessToken);
        setLoginError(false)
        navigate(routeNames.DASHBOARD)
        window.location.reload()
      }
    } catch (error) {
      setIsClicked(false)
      setLoginError(true)
      console.error(error);
    }
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
                        type={showPassword ? "text" : "password"} 
                        label="Password"
                        variant="outlined"
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleTogglePassword} edge="end">
                                {showPassword ? <Visibility size="small" /> : <VisibilityOff size="small" />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
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
                        type={showPassword ? "text" : "password"}
                        label="New Password"
                        variant="outlined"
                        fullWidth
                        error={!!errors.newPassword}
                        helperText={errors.newPassword?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleTogglePassword} edge="end">
                                {showPassword ? <Visibility size="small" /> : <VisibilityOff size="small" />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                  {loginError && <Typography sx={{ color: 'red' }}>Please enter valid login credential!</Typography>}
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
            <SubmitButton startIcon={<CircularProgress size="18px" color="inherit" sx={{ display: isClicked ? "block" : 'none' }} />} disabled={isClicked} type="submit" fullWidth variant="contained" color="primary">Sign In</SubmitButton>
          </FormCont>
        </PaperCont>
      </Wrapper>
    </Container>
  )
}

const Container = styled(Grid)(({ theme }) => ({
  height: "100vh",
  backgroundImage: `url('https://images.unsplash.com/photo-1488998427799-e3362cec87c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
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
  margin: theme.spacing(3, 0, 2),
  height: '50px'
}));

// https://images.unsplash.com/photo-1529539795054-3c162aab037a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D