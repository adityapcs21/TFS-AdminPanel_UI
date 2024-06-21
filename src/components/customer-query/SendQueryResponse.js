import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Grid, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { CreateBatch } from '../../redux/slice/batch';
import { Editor } from 'react-draft-wysiwyg';
import useEditorState from '../../helpers/textEditorHandler';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { SendResponse } from '../../redux/slice/customer-query';

const schema = yup.object().shape({
 queryId: yup.string().required('query id is required'),
 message: yup.string().required("Please add some message"),
});

const SendQueryResponse = ({ onClose, queryId }) => {
 const dispatch = useDispatch();
 const { editorState, onChange } = useEditorState();
 const [message, setMessage] = useState("")

 const { control, setValue, formState: { errors } } = useForm();

 useEffect(() => {
  setMessage(draftToHtml(convertToRaw(editorState.getCurrentContent())))
 }, [editorState])

 const handleSubmit = () => {
  let payload = {
   queryId,
   message: message
  }
  dispatch(SendResponse(payload))
  onClose();
 };

 return (
  <Grid container spacing={2}>
   <Grid item xs={12}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0px' }}>
     <Typography variant='h5'>Send Query Response</Typography>
     <IconButton onClick={onClose}>
      <CloseIcon />
     </IconButton>
    </Box>
   </Grid>
   <Grid item xs={12}>
    <Grid container spacing={2}>
     <Grid item xs={12}>
      <Controller
       name="queryId"
       control={control}
       disabled
       render={({ field }) => (
        <TextField
         label="Query Id"
         variant="outlined"
         fullWidth
         {...field}
         error={!!errors.queryId}
         helperText={errors.queryId?.message}
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
        toolbar={
         {
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
       <Button type="submit" onClick={() => handleSubmit()} variant="contained" color="primary">
        Send Response
       </Button>
      </Box>
     </Grid>
    </Grid>
   </Grid>
  </Grid>
 );
};

export default SendQueryResponse;
