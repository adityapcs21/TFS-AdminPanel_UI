import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux"
import { ApproveProfileUpdateRequest } from "../../redux/slice/students"
import { useState } from "react";


const schema = yup.object({
 uniqueId: yup.string().optional(),
 action: yup.string().optional(),
});

export default function ApproveProfileUpdate({ data, onClose }) {
 const { uniqueId } = data;

 const dispatch = useDispatch();
 const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem("userDetails")));


 const { handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
 })

 const onSubmit = (data) => {
  dispatch(ApproveProfileUpdateRequest(data))
  onClose()
 }


 return (
  <Container>
   <Box sx={{ display: "flex", justifyContent: 'space-between', padding: '20px 0px' }}>
    <Typography variant='h5'>Update Profile</Typography>
    <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
   </Box>
   <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
    <Grid sx={{ width: '48%' }}>
     <Typography variant="h6" pb={2}>Current Details</Typography>
     <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
       <TextField
        disabled
        label="First Name"
        defaultValue={data.currentDetails.firstName}
        variant="outlined"
        fullWidth
       />
      </Grid>
      <Grid item xs={12} sm={6}>
       <TextField
        disabled
        label="Last Name"
        defaultValue={data.currentDetails.lastName}
        variant="outlined"
        fullWidth
       />
      </Grid>

      <Grid item xs={12} sm={6}>
       <TextField
        disabled
        label="Email Address"
        defaultValue={data.currentDetails.emailAddress}
        variant="outlined"
        fullWidth
       />
      </Grid>
      <Grid item xs={12} sm={6}>
       <TextField
        disabled
        label="Mobile Number"
        defaultValue={data.currentDetails.mobileNumber}
        variant="outlined"
        fullWidth
       />
      </Grid>
      {/* <Grid item xs={12} sm={6}>
       <TextField
       disabled
        label="Subscription End Date"
        defaultValue={data.currentDetails.subscriptionEndDate}
        variant="outlined"
        fullWidth
       />
      </Grid>
      <Grid item xs={12} sm={6}>
       <TextField
       disabled
        label="Subscription Start Date"
        defaultValue={data.currentDetails.subscriptionStartDate}
        variant="outlined"
        fullWidth
       />
      </Grid> */}
      <Grid item xs={12} sm={6}>
       <TextField
        disabled
        label="Subscription Type"
        defaultValue={data.currentDetails.subscriptionType}
        variant="outlined"
        fullWidth
       />
      </Grid>


      <Grid item xs={12} sm={6}>
       <TextField
        disabled
        label="Batch No."
        defaultValue={data.currentDetails.batchNo}
        variant="outlined"
        fullWidth
       />
      </Grid>
     </Grid>
    </Grid>
    <Grid sx={{ width: '4%', display: 'flex', justifyContent: 'center' }}>
     <Box sx={{ borderLeft: '1px solid lightgray', height: "100%" }}></Box>
    </Grid>
    <Grid sx={{ width: '48%' }}>
     <Typography variant="h6" pb={2}>Requested Details</Typography>
     <form onSubmit={handleSubmit((data, event) => {
      const buttonName = event.nativeEvent.submitter.name;
      if (buttonName === 'APPROVE') {
       data.uniqueId = uniqueId
       data.action = "APPROVE"
      } else if (buttonName === 'REJECT') {
       data.action = "REJECT"
       data.uniqueId = uniqueId
      }

      onSubmit(data);
     })}>
      <Grid container spacing={2}>
       <Grid item xs={12} sm={6}>
        <TextField
         disabled
         label="First Name"
         defaultValue={data.firstName}
         variant="outlined"
         fullWidth
        />
       </Grid>
       <Grid item xs={12} sm={6}>
        <TextField
         disabled
         label="Last Name"
         defaultValue={data.lastName}
         variant="outlined"
         fullWidth
        />
       </Grid>

       <Grid item xs={12} sm={6}>
        <TextField
         disabled
         label="Email Address"
         defaultValue={data.emailAddress}
         variant="outlined"
         fullWidth
        />
       </Grid>
       <Grid item xs={12} sm={6}>
        <TextField
         disabled
         label="Mobile Number"
         defaultValue={data.mobileNumber}
         variant="outlined"
         fullWidth
        />
       </Grid>
      </Grid>
      <Grid item xs={12} mt={2}>
       <Box sx={{ display: "flex", justifyContent: 'flex-end', gap: '10px' }}>
        {userDetails.role === "SUPER USER"
         && data.requestStatus === "SUBMITTED" &&
         <>
          <Button name="REJECT" type="submit" variant="contained" color="warning" >REJECT</Button>
          <Button name="APPROVE" type="submit" variant="contained" color="primary">APPROVE</Button>
         </>

        }
       </Box>
      </Grid>
     </form>
    </Grid>
   </Grid >
  </Container >
 )
}