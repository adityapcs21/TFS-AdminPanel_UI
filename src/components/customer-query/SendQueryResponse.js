import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Grid, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { SendResponse } from '../../redux/slice/customer-query';
import ReactQuill from 'react-quill';
import { useForm, Controller } from 'react-hook-form';

// Validation schema
const schema = yup.object().shape({
  queryId: yup.string().required('Query ID is required'),
  message: yup.string().required("Please add some message"),
});

const SendQueryResponse = ({ onClose, queryId }) => {
  const dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      queryId: queryId,
      message: '', // Initialize message as empty
    }
  });

  const onSubmit = (data) => {
    const payload = {
      queryId: data.queryId || queryId, // Ensure queryId is included
      message: data.message,
    };
    dispatch(SendResponse(payload));
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="queryId"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Query ID"
                    variant="outlined"
                    fullWidth
                    {...field}
                    error={!!errors.queryId}
                    helperText={errors.queryId?.message}
                    disabled // Disable as it's not editable
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
                      value={value}
                      onChange={onChange}
                      modules={{
                        toolbar: [
                          [{ 'color': [] }, { 'background': [] }],
                          [{ 'header': [1, 2, false] }],
                          ['bold', 'italic', 'underline'],
                          ['image', 'code-block'],
                          ['clean'], [{ 'font': [] }],
                          [{ 'align': [] }],
                        ]
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

export default SendQueryResponse;
