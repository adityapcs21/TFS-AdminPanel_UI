import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Box, Button, Container, Grid, MenuItem, TextField, Typography } from "@mui/material"
import moment from "moment"
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux"
import { ApproveBatchUpdateRequest } from "../../redux/slice/students"
import Swal from "sweetalert2"


const schema = yup.object({
 userName: yup.string().required(),
 action: yup.string().optional(),
 price: yup.string().required(),
 subscriptionStartDate: yup.date().required('Subscription start date is required'),
 subscriptionEndDate: yup.date().required('Subscription end date is required').min(yup.ref('subscriptionStartDate'), 'End date must be greater than or equal to start date'),
});

const actionOption = [{ value: "APPROVED", label: 'APPROVED' }, { value: "CANCELLED", label: 'CANCELLED' }, { value: "PROCESS", label: 'PROCESS' }, { value: "REJECT", label: 'REJECT' }, { value: "APPROVE", label: "APPROVE" }]

export default function ApproveStudentModal({ data, onClose }) {
 const { uniqueId, userName, requestStatus, price, subscriptionStartDate, subscriptionEndDate } = data;
 const dispatch = useDispatch();

 const {
  control,
  handleSubmit,
  formState: { errors },
 } = useForm({
  resolver: yupResolver(schema),
 })
 console.log(errors)
 const onSubmit = (data, event) => {
  delete data["userName"];
  data.uniqueId = uniqueId
  data.subscriptionStartDate = moment(data.subscriptionStartDate).format('DD-MM-YYYY');
  data.subscriptionEndDate = moment(data.subscriptionEndDate).format('DD-MM-YYYY');
  onClose()
  Swal.fire({
   title: "Are you sure?",
   text: "You want to process?",
   icon: "warning",
   showCancelButton: true,
   confirmButtonColor: "#2c4c74",
   cancelButtonColor: "#d33",
   confirmButtonText: "Yes, process it!"
  }).then((result) => {
   if (result.isConfirmed) {
    Swal.fire({
     title: "Success!",
     text: "Your request has been processed.",
     icon: "success"
    });
    dispatch(ApproveBatchUpdateRequest(data))
   }
  });
 }


 return (
  <Container>
   <Box sx={{ display: "flex", justifyContent: 'space-between', padding: '20px 0px' }}>
    <Typography variant='h5'>Update Batch Request</Typography>
    <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
   </Box>
   <form onSubmit={handleSubmit((data, event) => {
    const buttonName = event.nativeEvent.submitter.name;
    console.log("evevent", buttonName)
    if (buttonName === 'PROCESS') {
     data.action = "PROCESS"
    } else if (buttonName === 'REJECT') {
     data.action = "REJECT"
    }

    onSubmit(data);
   })}>
    <Grid container spacing={2}>
     <Grid item xs={12}>
      <Controller
       defaultValue={userName}
       name="userName"
       control={control}
       render={({ field }) => (
        <TextField
         {...field}
         disabled
         fullWidth
         label="Name"
         error={!!errors.userName}
         helperText={errors.userName?.message}
        />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>
     {/* <Grid item xs={12} md={6}>
      <Controller
       name="action"
       control={control}
       defaultValue={requestStatus}
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
         {actionOption.map((option, key) => (
          <MenuItem key={key} value={option.value}>
           {option.label}
          </MenuItem>
         ))}
        </TextField>
       )}
      />
     </Grid> */}

     <Grid item xs={12} md={6}>
      <Controller
       defaultValue={price}
       name="price"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Price" {...field} error={!!errors.price} helperText={errors.price?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>

     <Grid item xs={12} md={6}>
      <Controller
       name="subscriptionStartDate"
       control={control}
       defaultValue={moment(subscriptionStartDate, 'DD/MM/YYYY').format('YYYY-MM-DD')}
       render={({ field }) => (
        <TextField
         {...field}
         label="Subscription Start Date"
         type="date"
         fullWidth
         error={!!errors.subscriptionStartDate}
         helperText={errors.subscriptionStartDate?.message}
        />
       )}
      />
     </Grid>

     <Grid item xs={12} md={6}>
      <Controller
       name="subscriptionEndDate"
       control={control}
       defaultValue={moment(subscriptionEndDate, 'DD/MM/YYYY').format('YYYY-MM-DD')}
       render={({ field }) => (
        <TextField
         {...field}
         label="Subscription End Date"
         type="date"
         fullWidth
         error={!!errors.subscriptionEndDate}
         helperText={errors.subscriptionEndDate?.message}
        />
       )}
      />
     </Grid>
    </Grid>
    <Grid item xs={12} mt={2}>
     <Box sx={{ display: "flex", justifyContent: 'flex-end', gap: '10px' }}>
      {(requestStatus === "SUBMITTED" || requestStatus === "PENDING") && <Button type="submit" variant="contained" color="warning" name="REJECT">REJECT</Button>}
      {requestStatus === "SUBMITTED" && <Button type="submit" variant="contained" color="primary" name="PROCESS">PROCESS</Button>}
     </Box>
    </Grid>
   </form>
  </Container>
 )
}