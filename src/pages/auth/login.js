import { Avatar, Box, Button, Checkbox, CircularProgress, FormControlLabel, Grid, IconButton, InputAdornment, Paper, TextField, Typography, } from '@mui/material'
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


const schema = yup.object({
  emailId: yup.string().email("Please type a valid email").required("Email is required Field"),
  password: yup.string().min(6).required(),
}).required();

export default function Login() {
  const navigate = useNavigate()
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [loginError, setLoginError] = useState(false)
  const [isClicked, setIsClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = async (loginDetails) => {
    setIsClicked(true)
    let payload = {
      "emailId": loginDetails.emailId,
      "password": loginDetails.password,
      "grantType": "token"
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}auth/admin/login`, payload);
      if (response.data) {
        if (response.data.passwordChangeRequired) {
          navigate(routeNames.CHNAGEPASSWORD)
        } else {
          localStorage.setItem("userDetails", JSON.stringify(response.data));
          localStorage.setItem("token", response.data.accessToken);
          setLoginError(false)
          navigate(routeNames.DASHBOARD)
          window.location.reload()
        }
      }
    } catch (error) {
      setLoginError(true)
      console.error(error);
      setIsClicked(false)
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
            Sign in
          </Typography>
          <FormCont onSubmit={handleSubmit(onSubmit)}>
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
                {loginError && <Typography sx={{ color: 'red' }}>Please enter correct email and password!</Typography>}
              </Grid>
            </Grid>
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <SubmitButton startIcon={<CircularProgress size="18px" color="inherit" sx={{ display: isClicked ? "block" : 'none' }} />} disabled={isClicked} type="submit" fullWidth variant="contained" color="primary">Sign In</SubmitButton>
            {/* <Grid container>
              <Grid item xs={12}>
                <Box>Don't remember </Box>
              </Grid>
            </Grid> */}
            <Box mt={5}>
            </Box>
          </FormCont>
        </PaperCont>
      </Wrapper>
    </Container >
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
  justifyContent: "center",
  paddingTop: "16px"
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

const FormCont = styled("form")(({ theme }) => ({
  width: "100%", // Fix IE 11 issue.
  marginTop: theme.spacing(1)
}))

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  height: '50px'
}));

// https://images.unsplash.com/photo-1529539795054-3c162aab037a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D