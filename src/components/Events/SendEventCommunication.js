import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Grid, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import useEditorState from '../../helpers/textEditorHandler';
import { SendEventEmail } from '../../redux/slice/events';
import ReactQuill from 'react-quill';

const schema = yup.object().shape({
 message: yup.string().required('Please add some message'),
 subject: yup.string().required('Please add a subject'),
});

const SendEventCommunication = ({ onClose, eventId }) => {
 let quillRef = null;
 const dispatch = useDispatch();
 const { editorState, onChange } = useEditorState();
 const { control, setValue, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
  defaultValues: {
   eventId: eventId,
  },
 });

 const onSubmit = (data) => {
  data.eventId = eventId
  let payload = {
   eventId: eventId,
   message: data.message,
   subject: data.subject
  }
  dispatch(SendEventEmail(payload));
  onClose();
 };

 return (
  <Grid container spacing={2}>
   <Grid item xs={12}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0px' }}>
     <Typography variant='h5'>Send Event Communication</Typography>
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
        name="eventId"
        control={control}
        disabled
        render={({ field }) => (
         <TextField
          label="Event Id"
          variant="outlined"
          fullWidth
          {...field}
         />
        )}
       />
      </Grid>
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
           className={`quill-editor ${errors.message ? 'show__error' : ''}`}
           ref={quillRef}
           value={value}
           onChange={onChange}
           modules={{
            toolbar: [
             [{ 'header': [1, 2, false] }],
             ['bold', 'italic', 'underline'],
             ['image', 'code-block'],
             ['clean'], [{ 'font': [] }],
             [{ 'align': [] }],
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

export default SendEventCommunication;
