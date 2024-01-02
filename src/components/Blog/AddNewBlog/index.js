import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Grid, Container, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch } from 'react-redux';
import { SaveBlog } from '../../../redux/slice/blog';

const schema = yup.object().shape({
 title: yup.string().required(),
 createdBy: yup.string().required(),
 description: yup.string().required(),
 externalLink: yup.string().url().required(),
 attachments: yup.array().of(yup.mixed().required('Image is required')),
});

const AddNewBlog = ({ onClose }) => {
 const dispatch = useDispatch()

 const [file, setFile] = useState([]);
 const { control, handleSubmit, setValue, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
 });

 const onSubmit = (data) => {
  dispatch(SaveBlog(data))
  onClose();
 };

 const handleFileChange = (e) => {
  const files = e.target.files;
  // setValue('media', files);
  setValue('attachments', ["http://nightmare.mit.edu/static/homepage/img/portfolio/colosseum_haunted.png", "http://nightmare.mit.edu/static/homepage/img/portfolio/colosseum_orig.png"]);


  // Preview all selected images
  const urls = Array.from(files).map((file) => {
   const reader = new FileReader();
   return new Promise((resolve) => {
    reader.onloadend = () => {
     resolve(reader.result);
    };
    reader.readAsDataURL(file);
   });
  });

  Promise.all(urls).then((results) => {
   setFile(results);
  });
 };

 return (
  <Container >
   <Box sx={{ display: "flex", justifyContent: 'space-between', padding: '20px 0px' }}>
    <Typography variant='h5'>Add New Blog</Typography>
    <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
   </Box>
   <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={2}>
     <Grid item xs={7}>
      <Controller
       name="title"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Title" {...field} error={!!errors.title} helperText={errors.title?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>
     <Grid item xs={5}>
      <Controller
       name="createdBy"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Created By" {...field} error={!!errors.createdBy} helperText={errors.createdBy?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>
     <Grid item xs={12}>
      <Controller
       name="externalLink"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="External Link" {...field} error={!!errors.externalLink} helperText={errors.externalLink?.message} />
       )}
      />
     </Grid>

     <Grid item xs={12}>
      <Controller
       name="description"
       control={control}
       render={({ field }) => (
        <TextField id="outlined-multiline-static"
         multiline
         rows={4}
         fullWidth
         label="Description"
         {...field}
         error={!!errors.description}
         helperText={errors.description?.message}
        />
       )}
      />
     </Grid>

     <Grid item xs={12}>
      <Typography>Attachment</Typography>
      <Box sx={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
       <Controller
        name="attachments"
        control={control}
        render={({ field }) => (
         <input
          multiple
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          style={{ display: 'none' }}
         />
        )}
       />
       <label htmlFor="fileInput">
        <IconButton component="span">
         <CloudUploadIcon />
        </IconButton>
       </label>
       <Button sx={{ display: 'none' }} variant="contained" component="span" onClick={() => document.getElementById('fileInput').click()}>
        Upload
       </Button>
       {file.length > 0 && (
        <div>
         {file.map((url, index) => (
          <img
           key={index}
           src={url}
           alt={`Preview ${index + 1}`}
           style={{ height: "80px", width: 'auto', maxWidth: '100%', margin: '5px' }}
          />
         ))}
        </div>
       )}
      </Box>

     </Grid>
     <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: 'flex-end', gap: '10px' }}>
       <Button variant="contained" color="warning" onClick={onClose}>Cancel</Button>
       <Button type="submit" variant="contained" color="primary">Add Blog</Button>
      </Box>
     </Grid>
    </Grid>
   </form>
  </Container>
 );
};

export default AddNewBlog;
