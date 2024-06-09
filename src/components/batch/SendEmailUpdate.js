import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Grid, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import useEditorState from '../../helpers/textEditorHandler';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { SendBatchEmail } from '../../redux/slice/batch';


const schema = yup.object().shape({
 message: yup.string().required('Please add some message'),
 subject: yup.string().required('Please add a subject'),
});

const SendEmailUpdate = ({ onClose }) => {
 const dispatch = useDispatch();
 const { editorState, onChange } = useEditorState();
 const { control, setValue, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema)
 });

 useEffect(() => {
  setValue('message', draftToHtml(convertToRaw(editorState.getCurrentContent())));
 }, [editorState, setValue]);

 const onSubmit = (data) => {
  let payload = {
   message: data.message,
   subject: data.subject
  }
  console.log("payloaddd", payload)
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
       <Box sx={{ border: '1px solid lightgrey' }}>
        <Editor
         editorState={editorState}
         editorClassName="event-text-editor"
         onEditorStateChange={onChange}
         toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign'],
         }}
        />
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
