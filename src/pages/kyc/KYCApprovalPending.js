import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Chip, Container, Divider, Grid, InputLabel, Link, MenuItem, Select, TextareaAutosize, Typography, styled } from '@mui/material';
import AWS from 'aws-sdk'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { KycAction, activePendingId } from '../../redux/slice/kyc';


AWS.config.update({
 accessKeyId: 'YOUR_ACCESS_KEY',
 secretAccessKey: 'YOUR_SECRET_KEY',
 region: 'YOUR_AWS_REGION',
});

const s3 = new AWS.S3();



const KYCApprovalPending = () => {
 const { id } = useParams()
 const dispatch = useDispatch()
 const UniqueId = useSelector(state => state.kyc.activeId);
 const userData = useSelector(state => state.kyc.userData)
 useEffect(() => {
  dispatch(activePendingId(id))
 }, [])


 const [imageUrl, setImageUrl] = useState('');

 useEffect(() => {
  const params = {
   Bucket: 'YOUR_BUCKET_NAME',
   Key: 'PATH/TO/YOUR/IMAGE.jpg',
  };

  s3.getObject(params, (err, data) => {
   if (err) {
    console.error('Error fetching image:', err);
   } else {
    const url = URL.createObjectURL(new Blob([data.Body]));
    setImageUrl(url);
   }
  });
 }, []);

 const [action, setAction] = React.useState('');
 const [reasons, setReasons] = useState("")

 const handleChange = (event) => {
  setAction(event.target.value);
  console.log("event", event.target.value)
  if (event.target.value === "ACCEPT") {
   let payload = {
    "uniqueId": UniqueId,
    "action": "ACCEPT",
   }
   dispatch(KycAction(payload))
  }
 };

 const handleSend = () => {
  let payload = {
   "uniqueId": UniqueId,
   "action": "REJECT",
   "rejectReason": reasons
  }
  dispatch(KycAction(payload))
 }

 return (
  <StyledContainer>
   <Grid container spacing={3}>
    <Grid item xs={12}>
     <Typography variant="h5" gutterBottom>
      User KYC Information
     </Typography>
    </Grid>
    <Grid item xs={12} md={6}>
     <StyledCard>
      <CardContent>
       <Typography variant="h6" gutterBottom>
        Personal Information
       </Typography>
       <Divider sx={{ marginBottom: '15px' }} />
       <Typography variant="body1" gutterBottom>
        <strong>Name:</strong> {userData.firstName} {userData.lastName}
       </Typography>
       <Typography variant="body1" gutterBottom>
        <strong>Date of Birth:</strong> {userData.dob}
       </Typography>
       <Typography variant="body1" gutterBottom>
        <strong>Father/Spouse Name:</strong> {userData.fatherOrSpouseName}
       </Typography>
      </CardContent>
     </StyledCard>
    </Grid>
    <Grid item xs={12} md={6}>
     <StyledCard>
      <CardContent>
       <Typography variant="h6" gutterBottom>
        Contact Information
       </Typography>
       <Divider sx={{ marginBottom: '15px' }} />
       <Typography variant="body1" gutterBottom>
        <strong>Email:</strong> {userData.emailAddress}
       </Typography>
       <Typography variant="body1" gutterBottom>
        <strong>Mobile:</strong> {userData.mobileNumber}
       </Typography>
       <Typography variant="body1" gutterBottom>
        <strong>Telegram Username:</strong> {userData.telegramUserName}
       </Typography>
      </CardContent>
     </StyledCard>
    </Grid>
    <Grid item xs={12} >
     <StyledCard>
      <CardContent>
       <Typography variant="h6" gutterBottom>
        Address Information
       </Typography>
       <Divider sx={{ marginBottom: '15px' }} />
       <Typography variant="body1" gutterBottom>
        <strong>Permanent Address:</strong> {userData.permanentAddress}, {userData.permanentCity}, {userData.permanentState}, {userData.permanentCountry}, {userData.permanentPinCode}
       </Typography>
       <Typography variant="body1" gutterBottom>
        <strong>Current Address:</strong> {userData.currentAddress}, {userData.currentCity}, {userData.currentState}, {userData.currentCountry}, {userData.currentPinCode}
       </Typography>
      </CardContent>
     </StyledCard>
    </Grid>
    <Grid item xs={12} md={6}>
     <StyledCard>
      <CardContent>
       <Typography variant="h6" gutterBottom>
        Subscription Details
       </Typography>
       <Divider sx={{ marginBottom: '15px' }} />
       <Typography variant="body1" gutterBottom>
        <strong>Batch No:</strong> {userData.batchNo}
       </Typography>
       <Typography variant="body1" gutterBottom>
        <strong>Subscription Type:</strong> {userData.subscriptionType}
       </Typography>
       <Typography variant="body1" gutterBottom>
        <strong>Start Date:</strong> {userData.subscriptionStartDate}
       </Typography>
       <Typography variant="body1" gutterBottom>
        <strong>End Date:</strong> {userData.subscriptionEndDate}
       </Typography>
       <Typography variant="body1" gutterBottom>
        <strong>Status:</strong> {userData.status}
       </Typography>
      </CardContent>
     </StyledCard>
    </Grid>
    <Grid item xs={12} md={6}>
     <StyledCard>
      <CardContent>
       <Typography variant="h6" gutterBottom>
        Other Information
       </Typography>
       <Divider sx={{ marginBottom: '15px' }} />
       <Typography variant="body1" gutterBottom>
        <strong>Referral Type:</strong> {userData.referralType}
       </Typography>
       <Typography variant="body1" gutterBottom>
        <strong>Referral Name:</strong> {userData.referralName}
       </Typography>
       <Typography variant="body1" gutterBottom>
        <strong>Run Membership or Educational Service:</strong> {userData.runMembershipOrEducationalService ? 'Yes' : 'No'}
       </Typography>
       <Typography variant="body1" gutterBottom>
        <strong>GST Bill Required:</strong> {userData.gstBillRequired ? 'Yes' : 'No'}
       </Typography>
       <Typography variant="body1" gutterBottom>
        <strong>GST No:</strong> {userData.gstNo}
       </Typography>
      </CardContent>
     </StyledCard>
    </Grid>

    <Grid item xs={12}>
     <StyledCard>
      <CardContent>
       <Typography variant="h6" gutterBottom>
        KYC Information
       </Typography>
       <Divider sx={{ marginBottom: '15px' }} />
       <Grid container spacing={5}>
        <Grid item xs={6}>
         <Typography variant="body1" gutterBottom>
          KYC Verified: {userData.kycVerified ? 'Yes' : 'No'}
         </Typography>
        </Grid>
        <Grid item xs={6}>
         <Typography variant="body1" gutterBottom>
          KYC Status: {userData.kycStatus}
         </Typography>
        </Grid>
        <Grid item xs={6}>
         <Typography variant="body1" gutterBottom>
          Profile Photo:{' '}
          <Box sx={{ maxWidth: '200px', height: '200px' }}>
           <img height={"200px"} width="auto" maxWidth="300px" src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="Private Bucket Image" />
          </Box>
         </Typography>
        </Grid>
        <Grid item xs={6}>
         <Typography variant="body1" gutterBottom>
          ID Proof:{' '}
          <Box sx={{ maxWidth: '200px', height: '200px' }}>
           <img height={"200px"} width="auto" maxWidth="300px" src={"https://cfw42.rabbitloader.xyz/eyJjIjp0cnVlLCJoIjoicG1tb2RpeW9qYW5hLmluIiwidiI6NjA0MjkyMzk0LCJpIjoiZjkxY2Q5MjYtOWFmZC00OTJiLTFhYTUtYjdmMThmOGU3ODAwIn0/wp-content/uploads/2022/08/image-170-2048x1365.png"} alt="Private Bucket Image" />
          </Box>
         </Typography>
        </Grid>
       </Grid>
      </CardContent>
     </StyledCard>
    </Grid>

    <Grid item xs={12}>
     <StyledCard>
      <CardContent>
       <Typography variant="h6" gutterBottom>
        Do you want to accept this request?
       </Typography>
       <Divider sx={{ marginBottom: '15px' }} />
       <Box sx={{ maxWidth: '300px' }}>
        <InputLabel id="demo-simple-select-label">Action</InputLabel>
        <Select
         fullWidth
         labelId="demo-simple-select-label"
         id="demo-simple-select"
         value={action}
         label="Action"
         onChange={handleChange}
        >
         <MenuItem value={"ACCEPT"}>ACCEPT</MenuItem>
         <MenuItem value={"REJECT"}>REJECT</MenuItem>
        </Select>
       </Box>
       {action === "REJECT" &&
        <Box sx={{ marginTop: "15px" }}>
         <InputLabel id="reject-action">Reasons</InputLabel>
         <TextareaAutosize value={reasons} onChange={(e) => setReasons(e.target.value)} labelId="reject-action" minRows={6} fullWidth style={{ width: '100%' }} />

         <Button variant='contained' onClick={() => handleSend()}>Submit </Button>
        </Box>}
      </CardContent>
     </StyledCard>
    </Grid>
   </Grid>
  </StyledContainer>
 );
};

export default KYCApprovalPending;

const StyledContainer = styled(Container)({
 marginTop: '32px',
});

const StyledCard = styled(Card)({
 padding: '16px',
});

const StyledChip = styled(Chip)({
 marginRight: '8px',
});