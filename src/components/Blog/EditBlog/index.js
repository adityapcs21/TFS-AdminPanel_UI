import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Grid, Container, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch } from 'react-redux';
import { UpdateBlog } from '../../../redux/slice/blog';

const schema = yup.object().shape({
 title: yup.string().required(),
 // createdBy: yup.string().required(),
 description: yup.string().required(),
 externalLink: yup.string().url().optional(),
 attachments: yup.array().of(yup.mixed().required('Image is required')),
});

const EditBlog = ({ data, onClose }) => {
 const dispatch = useDispatch()
 const { blogId, title, createdBy, description, attachments, externalLink } = data;
 const [file, setFile] = useState(attachments);
 const { control, setValue, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
 });

 useEffect(() => {
  setValue('attachments', attachments);
 }, [])

 const onSubmit = (data) => {
  console.log(data);
  dispatch(UpdateBlog(data))
  onClose()
 };

 const handleFileChange = (e) => {
  const files = e.target.files;
  setValue('attachments', ["http://nightmare.mit.edu/static/homepage/img/portfolio/colosseum_orig.png"]);

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
    <Typography variant='h5'>Edit Blog</Typography>
    <CloseIcon onClick={onClose} />
   </Box>
   <form onSubmit={handleSubmit((data) => {
    data.blogId = blogId;
    onSubmit(data);
   })}>
    <Grid container spacing={2}>
     <Grid item xs={6}>
      <Controller
       name="title"
       defaultValue={title}
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Title" {...field} error={!!errors.title} helperText={errors.title?.message} />
       )}
      />
     </Grid>
     <Grid item xs={6}>
      <Controller
       name="createdBy"
       defaultValue={createdBy}
       control={control}
       disabled
       render={({ field }) => (
        <TextField fullWidth label="Created By" {...field} error={!!errors.createdBy} helperText={errors.createdBy?.message} />
       )}
      />
     </Grid>

     <Grid item xs={12}>
      <Controller
       name="description"
       defaultValue={description}
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
      <Controller
       name="attachments"
       control={control}
       defaultValue={attachments}
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
      <Grid container spacing={2}>
       {file && file.map((media, index) => {
        return (
         <Grid item key={index}>
          <img src={media} alt="Preview" style={{ maxWidth: '100%', maxHeight: '80px', borderRadius: '5px' }} />
         </Grid>
        )
       })}
      </Grid>
     </Grid>
     <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: 'flex-end', gap: '10px' }}>
       <Button variant="contained" color="warning" onClick={onClose}>Cancel</Button>
       <Button type="submit" variant="contained" color="primary">Update</Button>
      </Box>
     </Grid>
    </Grid>
   </form>
  </Container >
 );
};

export default EditBlog;
