import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Grid, Box, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import ReactQuill from 'react-quill';


const schema = yup.object().shape({
  subject: yup.string().required('subject is required'),
  message: yup.string().required('message is required'),
});

const SendEmailModal = ({ onClose, onSubmit }) => {
  let quillRef = null;
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Container maxWidth="md">
      <Box sx={{ display: "flex", justifyContent: 'space-between', padding: '20px 0px' }}>
        <Typography variant='h5'>Send Email</Typography>
        <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Subject"
                  variant="outlined"
                  fullWidth
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
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'header': [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        ['image', 'code-block'],
                        ['clean'], // remove formatting button
                      ],
                    }}
                  />
                )}
              />
              {errors.message && <div className='show__error_text'>{errors.message.message}</div>}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: 'flex-end', gap: '10px' }}>
              <Button variant="contained" color="warning" onClick={() => onClose()}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">Send Email</Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SendEmailModal;
