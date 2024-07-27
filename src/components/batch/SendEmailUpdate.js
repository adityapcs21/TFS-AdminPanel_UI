import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Grid, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { SendBatchEmail } from '../../redux/slice/batch';
import ReactQuill from 'react-quill';


const schema = yup.object().shape({
 message: yup.string().required('Please add some message'),
 subject: yup.string().required('Please add a subject'),
});

const SendEmailUpdate = ({ onClose }) => {
 let quillRef = null;
 const dispatch = useDispatch();
 const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema)
 });

 const onSubmit = (data) => {
  let payload = {
   message: data.message,
   subject: data.subject
  }
  dispatch(SendBatchEmail(payload));
  onClose();
 };

 return (
  <Grid container spacing={2}>
   <Grid item xs={12}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0px' }}>
     <Typography variant='h5'>Send Batch Email</Typography>
     <IconButton onClick={onClose}>
      <CloseIcon />
     </IconButton>
    </Box>
   </Grid>
   <Grid item xs={12}>
    <form onSubmit={handleSubmit(onSubmit)}>
     <Grid container spacing={2}>
      <Grid item xs={12}>
       <Controller
        name="subject"
        control={control}
        render={({ field }) => (
         <TextField
          label="Subject"
          variant="outlined"
          fullWidth
          {...field}
          error={!!errors.subject}
          helperText={errors.subject?.message}
         />
        )}
       />
      </Grid>
      <Grid item xs={12}>
       <Box className="rich-text-editor">
        <Controller
         name="message"
         control={control}
         render={({ field: { onChange, value } }) => (
          <ReactQuill
           placeholder='Write something here...'
           className={`quill-editor ${errors.message ? 'show__error' : ''}`}
           ref={quillRef}
           value={value}
           onChange={onChange}
           modules={{
            toolbar: [
             [{ 'header': [1, 2, false] }],
             ['bold', 'italic', 'underline'],
             ['image', 'code-block'],
             ['clean'],
            ],
           }}
          />
         )}
        />
        {errors.message && <div className='show__error_text'>{errors.message.message}</div>}
       </Box>
      </Grid>
      <Grid item xs={12}>
       <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <Button variant="contained" color="warning" onClick={onClose}>
         Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
         Send Response
        </Button>
       </Box>
      </Grid>
     </Grid>
    </form>
   </Grid>
  </Grid>
 );
};

export default SendEmailUpdate;
