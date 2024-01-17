import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography, } from '@mui/material'
import React, { useEffect } from 'react'
import LockIcon from '@mui/icons-material/Lock';
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slice/auth';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const UserDetails = useSelector(state => state.auth.data)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (UserDetails) {
      navigate("/")
    }
  }, [UserDetails])

  const onSubmit = (loginDetails) => {
    let payload = {
      "emailId": loginDetails.email,
      "password": loginDetails.password,
      "grantType": "token"
    }
    dispatch(login(payload))
  }
  console.log("UserDetails", UserDetails)
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
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Username"
              name="username"
              autoFocus
              autoComplete="off"
              {...register("email")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              {...register("password")}
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <SubmitButton type="submit" fullWidth variant="contained" color="primary">Sign In</SubmitButton>

            {/* <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
            <Box mt={5}>
            </Box>
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