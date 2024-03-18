import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, TextareaAutosize, Typography, styled } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';

export default function ViewEvent({ onClose }) {
 const eventDetails = useSelector(state => state.events.eventDetails)
 return (
  <Grid container spacing={1}>
   <Grid item xs={12}>
    <Box sx={{ display: "flex", justifyContent: 'space-between', padding: '20px 0px' }}>
     <Typography variant='h5'>Event Details</Typography>
     <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
    </Box>
   </Grid>
   <Grid container spacing={2}>
    <Grid item xs={12} md={4}>
     <TextField size="small" label="Event Name" value={eventDetails.eventName} variant="outlined" fullWidth disabled />
    </Grid>
    <Grid item xs={12} md={4}>
     <TextField size="small" label="Event Date" value={eventDetails.eventDate} variant="outlined" fullWidth disabled />
    </Grid>
    <Grid item xs={12} md={4}>
     <TextField size="small" label="Event Start Time" value={eventDetails.eventStartTime} variant="outlined" fullWidth disabled />
    </Grid>
    <Grid item xs={12} md={4}>
     <TextField size="small" label="Event End Time" value={eventDetails.eventEndTime} variant="outlined" fullWidth disabled />
    </Grid>
    <Grid item xs={12} md={4}>
     <TextField size="small" label="Registration Deadline Date" value={eventDetails.registrationDeadLineDate} variant="outlined" fullWidth disabled />
    </Grid>
    <Grid item xs={12} md={4}>
     <TextField size="small" label="Created By" value={eventDetails.createdBy} variant="outlined" fullWidth disabled />
    </Grid>
    <Grid item xs={12} md={4}>
     <TextField size="small" label="Location" value={eventDetails.location} variant="outlined" fullWidth disabled />
    </Grid>
    <Grid item xs={12} md={4}>
     <TextField size="small" label="Registration Limit" value={eventDetails.registrationLimit} variant="outlined" fullWidth disabled />
    </Grid>
    <Grid item xs={12} md={4}>
     <TextField size="small" label="Current Registrations" value={eventDetails.currentRegistrations} variant="outlined" fullWidth disabled />
    </Grid>
    <Grid item xs={12} md={4}>
     <TextField size="small" label="Event Type" value={eventDetails.eventType} variant="outlined" fullWidth disabled />
    </Grid>
    <Grid item xs={12} md={4}>
     <TextField size="small" label="Registration Fees" value={eventDetails.registrationFees} variant="outlined" fullWidth disabled />
    </Grid>
    <Grid item xs={12}>
     <TextField size="small"
      label="Description"
      value={eventDetails.description}
      variant="outlined"
      multiline
      maxRows={3}
      fullWidth
      disabled
     />
    </Grid>
    <Grid item xs={12}>
     <Typography variant='h6'>Registration List</Typography>
     <Box sx={{ maxHeight: '100px', overflow: 'auto' }}>
      {eventDetails.registrationsList.length > 0 ?
       <TableContainer component={Paper}>
        <Table stickyHeader>
         <TableHead sx={{ padding: '2px' }}>
          <TableRow>
           <HeadingCell>Event ID</HeadingCell>
           <HeadingCell>User ID</HeadingCell>
           <HeadingCell>Created Date</HeadingCell>
           <HeadingCell>Registration Status</HeadingCell>
          </TableRow>
         </TableHead>
         <TableBody>
          {eventDetails.registrationsList.map((registration) => (
           <TableRow key={registration.registrationId}>
            <ValueCell>{registration.eventId}</ValueCell>
            <ValueCell>{registration.userId}</ValueCell>
            <ValueCell>{registration.createdDate}</ValueCell>
            <ValueCell>{registration.registrationStatus}</ValueCell>
           </TableRow>
          ))}
         </TableBody>
        </Table>
       </TableContainer>
       :
       <Typography>No registration details found</Typography>
      }
     </Box>
    </Grid>

   </Grid>

  </Grid>
 )
}


const HeadingCell = styled(TableCell)({
 padding: "4px",
 fontWeight: 600
})

const ValueCell = styled(TableCell)({
 padding: "4px",
 fontWeight: 400,
 // color: 'lightgray'
})