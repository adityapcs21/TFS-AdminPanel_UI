import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Grid, Box, Typography, IconButton, FormControl, InputLabel, Select, MenuItem, FormHelperText, FormLabel, RadioGroup, FormControlLabel, Radio, Switch, FormGroup } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { TestimonialAction } from '../../redux/slice/testimonials';

const UpdateTestimonials = ({ onClose, data }) => {

 const dispatch = useDispatch();
 const [value, setValue] = React.useState('');
 const [showTestimonial, setShowTestimonial] = useState(false)

 const { control, handleSubmit, formState: { errors } } = useForm({
  defaultValues: {
   testimonialId: data.testimonialId,
   actionName: data.actionName,
   action: data.action,
   title: data.title,
   userId: data.userId,
   message: data.message,
   testimonialStatus: data.testimonialStatus,
   userName: data.userName
  },
 });
 console.log("err", errors)

 const onSubmit = (formData) => {
  console.log("dattaaa", data)
  if (value) {
   if (value === "REJECT") {
    let payload = {
     testimonialId: data.testimonialId,
     actionName: 'REJECT',
     action: false
    }
    dispatch(TestimonialAction(payload));
    
   }
   else {
    let payload = {
     testimonialId: data.testimonialId,
     actionName: value,
     action: showTestimonial
    }
    dispatch(TestimonialAction(payload));
   }
  }
  onClose();
 };


 const handleChange = (event) => {
  setValue(event.target.value);
 };

 return (
  <Grid container spacing={2}>
   <Grid item xs={12}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0px' }}>
     <Typography variant='h5'>Update Testimonials</Typography>
     <IconButton onClick={onClose}>
      <CloseIcon />
     </IconButton>
    </Box>
   </Grid>
   <Grid item xs={12}>
    <form onSubmit={handleSubmit((payload) => {
     payload.testimonialId = data.testimonialId;
     onSubmit(payload);
    })}>
     <Grid container spacing={2}>
      <Grid item xs={6}>
       <Controller
        disabled
        name="title"
        control={control}
        defaultValue=""
        rules={{ required: 'Title is required' }}
        render={({ field }) => (
         <TextField
          {...field}
          label="Title"
          variant="outlined"
          fullWidth
          error={!!errors.title}
          helperText={errors.title?.message}
         />
        )}
       />
      </Grid>
      <Grid item xs={6}>
       <Controller
        disabled
        name="userId"
        control={control}
        defaultValue=""
        rules={{ required: 'User ID is required' }}
        render={({ field }) => (
         <TextField
          {...field}
          label="User ID"
          variant="outlined"
          fullWidth
          error={!!errors.userId}
          helperText={errors.userId?.message}
         />
        )}
       />
      </Grid>

      <Grid item xs={6}>
       <Controller
        disabled
        name="testimonialStatus"
        control={control}
        defaultValue="PENDING"
        render={({ field }) => (
         <TextField
          {...field}
          label="Testimonial Status"
          variant="outlined"
          fullWidth
          InputProps={{
           readOnly: true,
          }}
         />
        )}
       />
      </Grid>
      <Grid item xs={6}>
       <Controller
        disabled
        name="userName"
        control={control}
        defaultValue=""
        rules={{ required: 'User Name is required' }}
        render={({ field }) => (
         <TextField
          {...field}
          label="User Name"
          variant="outlined"
          fullWidth
          error={!!errors.userName}
          helperText={errors.userName?.message}
         />
        )}
       />
      </Grid>

      <Grid item xs={12}>
       <Controller
        disabled
        name="message"
        control={control}
        defaultValue=""
        rules={{ required: 'Message is required' }}
        render={({ field }) => (
         <TextField
          {...field}
          label="Message"
          variant="outlined"
          fullWidth
          multiline
          rows={2}
          error={!!errors.message}
          helperText={errors.message?.message}
         />
        )}
       />
      </Grid>

      <Grid item xs={12}>
       <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Do you want to accept this testimonial?</FormLabel>
        <RadioGroup
         row
         aria-labelledby="demo-controlled-radio-buttons-group"
         name="controlled-radio-buttons-group"
         value={value}
         onChange={handleChange}
        >
         <FormControlLabel value="ACCEPT" control={<Radio />} label="Accept" />
         <FormControlLabel value="REJECT" control={<Radio />} label="Reject" />
        </RadioGroup>
       </FormControl>
      </Grid>
      {(value === "ACCEPT" || value === 'ACCEPTED') &&
       <Grid item xs={12}>
        <FormControl>
         <FormLabel id="show-testimonial-group">Do you want to show this testimonial?</FormLabel>
         <FormGroup>
          <FormControlLabel
           control={
            <Switch
             checked={showTestimonial}
             onChange={(event) => setShowTestimonial(event.target.checked)}
             name="show-testimonial"
            />
           }
           label="Show Testimonial"
          />
         </FormGroup>
        </FormControl>
       </Grid>

      }
      <Grid item xs={12}>
       <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <Button variant="contained" color="warning" onClick={onClose}>
         Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
         Update Testimonial
        </Button>
       </Box>
      </Grid>
     </Grid>
    </form>
   </Grid>
  </Grid>
 );
};

export default UpdateTestimonials;
