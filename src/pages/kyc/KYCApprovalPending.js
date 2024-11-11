import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Chip, Container, Divider, Grid, InputLabel, Link, MenuItem, Select, TextareaAutosize, Typography, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetAllPendingKYCList, GetS3Image, KycAction, activePendingId, kycListIsLoading } from '../../redux/slice/kyc'
import Swal from 'sweetalert2';


const KYCApprovalPending = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const UniqueId = useSelector(state => state.kyc.activeId);
  const userData = useSelector(state => state.kyc.userData)
  const [profilePhotoLink, setProfilePhotoLink] = useState();
  const [idProofLink, setIdProofLink] = useState("")

  useEffect(() => {
    let payload = {
      "pageNo": 1,
      "perPageResults": 10
    }
    dispatch(kycListIsLoading());
    dispatch(GetAllPendingKYCList(payload)).then((response) => {
      if (response && response.error && response.error.mesage === "Rejected") {
        Swal.fire("Something Went Wrong");
      }
      dispatch(activePendingId(id))
    })
  }, [id])

  useEffect(() => {
    const fetchImages = async () => {
      if (userData && userData.profilePhotoLink && userData.idProofLink) {
        try {
          const [profilePhotoLink, idProofLinks] = await Promise.all([
            dispatch(GetS3Image(userData.profilePhotoLink)),
            Promise.all(
              userData.idProofLink.map((link) => dispatch(GetS3Image(link)))
            ),
          ]);

          setProfilePhotoLink(profilePhotoLink.payload.data);
          setIdProofLink(idProofLinks.map((link) => link.payload.data));
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      }
    };

    fetchImages();
  }, [userData, setProfilePhotoLink, setIdProofLink]);


  const [action, setAction] = React.useState('');
  const [reasons, setReasons] = useState("")

  const handleChange = (event) => {
    setAction(event.target.value);
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
      .then((res) => {
        Swal.fire({
          timer: 3000,
          text: res.payload.data,
          icon: "success"
        });
      })
  }

  return (
    <StyledContainer>
      {userData &&
        < Grid container spacing={3}>
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
                  <strong>Name:</strong> {userData?.firstName} {userData?.lastName}
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
                    </Typography>
                    <Box >
                      <img style={{ 'objectFit': 'contain' }} height={"200px"} width="200px" loading="lazy" src={profilePhotoLink?.s3SignedUrl} alt="Private Bucket Image" />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" gutterBottom>
                      ID Proof:{' '}
                    </Typography>

                    <Box sx={{ display: "flex", gap: '10px' }}>
                      {
                        idProofLink && idProofLink.map((item) => {
                          return (
                            <img style={{ 'objectFit': 'contain' }} height={"200px"} width="200px" loading="lazy" src={item.s3SignedUrl} alt="Private Bucket Image" />
                          )
                        })
                      }
                    </Box>
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
        </Grid>}
    </StyledContainer >
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