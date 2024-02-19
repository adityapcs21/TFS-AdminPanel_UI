import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { TextField, Button, Grid, Container, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';


const ViewStudent = ({ onClose }) => {
 const StudentDetails = useSelector((state) => state.students.StudentDetails?.userList[0]);

 const {
  emailAddress,
  mobileNumber,
  firstName,
  lastName,
  batchNo,
  subscriptionEndDate,
  subscriptionStartDate,
  subscriptionType,
  status,
 } = StudentDetails

 return (
  <Container >
   <Box sx={{ display: "flex", justifyContent: 'space-between', padding: '20px 0px' }}>
    <Typography variant='h5'>View Student Details</Typography>
    <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
   </Box>
   <form >
    <Grid container spacing={2}>

     <Grid item xs={6}>
      <TextField
       disabled
       label="First Name"
       variant="outlined"
       fullWidth
       name="firstName"
       value={firstName}
      />
     </Grid>

     <Grid item xs={6}>
      <TextField
       disabled
       label="Last Name"
       variant="outlined"
       fullWidth
       name="lastName"
       value={lastName}
      />
     </Grid>

     <Grid item xs={6}>
      <TextField
       disabled
       label="Email Address"
       variant="outlined"
       fullWidth
       name="emailAddress"
       value={emailAddress}
      />
     </Grid>

     <Grid item xs={6}>
      <TextField
       disabled
       label="Mobile Number"
       variant="outlined"
       fullWidth
       name="mobileNumber"
       value={mobileNumber}
      />
     </Grid>

     <Grid item xs={6}>
      <TextField
       disabled
       label="Subscription End Date"
       variant="outlined"
       fullWidth
       name="subscriptionEndDate"
       value={subscriptionEndDate}

      />
     </Grid>
     <Grid item xs={6}>
      <TextField
       disabled
       label="Subscription Start Date"
       variant="outlined"
       fullWidth
       name="subscriptionStartDate"
       value={subscriptionStartDate}

      />
     </Grid>
     <Grid item xs={4}>
      <TextField
       disabled
       label="Batch No"
       variant="outlined"
       fullWidth
       name="batchNo"
       value={batchNo}
      />
     </Grid>
     <Grid item xs={4}>
      <TextField
       disabled
       fullWidth
       label="Subscription Type"
       id="subscriptionType"
       name="subscriptionType"
       value={subscriptionType}
      />
     </Grid>

     <Grid item xs={4}>
      <TextField
       disabled
       fullWidth
       label="Status"
       id="status"
       name="status"
       value={status}
      />
     </Grid>

     <Grid item xs={12}>
      <Button onClick={onClose} variant="contained" color="secondary">
       Cancel
      </Button>
     </Grid>
    </Grid>
   </form>
  </Container>
 );
};

export default ViewStudent;

