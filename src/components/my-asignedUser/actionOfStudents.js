import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Grid, MenuItem, Paper, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography, styled } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { AddBuddyAction } from '../../redux/slice/buddyAssignment';
import ReusableTable from '../SharedComponent/ReusableTable';

const columns = [
 { id: 'buddyId', label: "Buddy Id" },
 { id: 'studentId', label: "Student Id" },
 { id: 'actionById', label: 'Action By' },
 { id: 'action', label: 'Action' },
 { id: 'comment', label: "Comment" },
]


const validationSchema = yup.object().shape({
 studentId: yup.string().optional('Student Name is required'),
 action: yup.string().required('Action is required'),
 comment: yup.string().required('Comment is required'),
});
export default function ActionOfStudents({ onClose }) {
 const dispatch = useDispatch()
 const studentDetails = useSelector((state) => state.students.StudentDetails?.userList[0])
 const BuddyActionList = useSelector(state => state.buddyAssignment.BuddyActionList)
 const totalHistory = BuddyActionList && BuddyActionList.length
 const [value, setValue] = React.useState(0);
 const [page, setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(6);

 const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(validationSchema),
  defaultValues: {
   studentId: `${studentDetails.firstName} ${studentDetails.lastName}`
  }
 });

 const handleChangePage = (_, newPage) => {
  setPage(newPage);
 };

 const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 6));
  setPage(0);
 };

 const onSubmit = (data) => {
  data.studentId = studentDetails.uniqueId
  onClose()
  dispatch(AddBuddyAction(data))
 };


 const handleChange = (event, newValue) => {
  setValue(newValue);
 };


 function a11yProps(index) {
  return {
   id: `full-width-tab-${index}`,
   'aria-controls': `full-width-tabpanel-${index}`,
  };
 }

 function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
   <div
    role="tabpanel"
    hidden={value !== index}
    id={`full-width-tabpanel-${index}`}
    aria-labelledby={`full-width-tab-${index}`}
    {...other}
   >
    {value === index && (
     <Box sx={{ p: 3 }}>
      {children}
     </Box>
    )}
   </div>
  );
 }

 return (
  <Container>
   <Grid container spacing={2}>
    <Grid item xs={12}>
     <Box sx={{ display: "flex", justifyContent: 'space-between', padding: '20px 0px' }}>
      {/* <Typography variant='h5'>Add Action to user</Typography> */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
       <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
       >
        <Tab label="Add Action to User" {...a11yProps(0)} />
        <Tab label="History" {...a11yProps(1)} />
       </Tabs>

       <TabPanel value={value} index={0}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
         <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
           <Controller
            disabled
            name="studentId"
            control={control}
            defaultValue=""
            render={({ field }) => (
             <TextField
              {...field}
              label="Student Name"
              fullWidth
              error={!!errors.studentId}
              helperText={errors.studentId?.message}
             />
            )}
           />
          </Grid>

          <Grid item xs={12} md={6}>
           <TextField
            disabled
            label="Status"
            fullWidth
            value={studentDetails.status}
           />
          </Grid>

          <Grid item xs={12} md={6}>
           <TextField
            disabled
            label="Subscription End Date"
            type="date"
            fullWidth
            InputLabelProps={{
             shrink: true,
            }}
            value={moment(studentDetails.subscriptionEndDate, 'DD-MM-YYYY').format('YYYY-MM-DD')}
           />

          </Grid>

          <Grid item xs={12} md={6}>
           <Controller
            defaultValue=""
            name="action"
            control={control}
            render={({ field }) => (
             <TextField
              {...field}
              select
              label="Action"
              variant="outlined"
              fullWidth
              error={!!errors.action}
              helperText={errors.action?.message}
             >
              <MenuItem value="EXTENSION">Extension</MenuItem>
              <MenuItem value="PAID">Paid</MenuItem>
              <MenuItem value="REMOVE">Remove</MenuItem>
             </TextField>
            )}
           />
          </Grid>

          <Grid item xs={12} >
           <Controller
            name="comment"
            control={control}
            defaultValue=""
            render={({ field }) => (
             <TextField
              {...field}
              label="Comment"
              fullWidth
              multiline
              maxRows={2}
              error={!!errors.comment}
              helperText={errors.comment?.message}
             />
            )}
           />
          </Grid>
         </Grid>
         <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
           <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
            Submit
           </Button>
          </Box>
         </Grid>
        </form>
       </TabPanel>
       <TabPanel value={value} index={1} >
        <Grid container sx={{ width: "100%" }}>
         <Grid item xs={12}>
          {/* <Typography variant='h6'>History</Typography> */}
          <Box sx={{ width: '100%' }}>
           {BuddyActionList && BuddyActionList.length > 0 ?
            <ReusableTable
             columns={columns}
             data={BuddyActionList}
             // disableActionButton
             disableDelete
             disableEdit
             onPageChange={handleChangePage}
             onRowsPerPageChange={handleChangeRowsPerPage}
             page={page}
             rowsPerPage={rowsPerPage}
             count={totalHistory}
            />
            :
            <Typography>No registration details found</Typography>
           }
          </Box>
         </Grid>
        </Grid>
       </TabPanel>






      </Box>
      <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
     </Box>
    </Grid>

   </Grid>
  </Container>
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