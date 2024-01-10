import { Box, Button, Container, Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as yup from 'yup';

const schema = yup.object().shape({
 title: yup.string().required(),
 createdBy: yup.string().required(),
 description: yup.string().required(),
 externalLink: yup.string().url().required(),
 attachments: yup.array().of(yup.mixed().required('Image is required')),
});

export default function AboutUs() {
 const [file, setFile] = useState([]);
 const { control, register, handleSubmit, setValue, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
 });

 const handleFileChange = (e) => {
  const files = e.target.files;
  console.log("snkj", files)
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
  <Paper sx={{ paddingTop: '24px' }}>
   <form>
    <Grid padding={"0px 24px 24px 24px"} container spacing={3}>
     <Grid item xs={12}>
      <Typography variant='h6'>Add About us page details</Typography>
     </Grid>
     <Grid item xs={12} md={6}>
      <TextField fullWidth id="subHeading" label="Sub Heading" variant="outlined" />
     </Grid>
     <Grid item xs={12} md={6}>
      <TextField fullWidth id="title" label="Title" variant="outlined" />
     </Grid>
     <Grid item xs={12} >
      <TextField fullWidth id="description" label="Description" variant="outlined" multiline rows={3} />
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
     <Grid item xs={12} >
      <TextField fullWidth id="description2" label="Description 2" variant="outlined" multiline rows={3} />
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
        </IconButton>.
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
     <Grid xs={12} sx={{textAlign:'end'}}>
      <Button variant='contained'>Update</Button>
     </Grid>
    </Grid>
   </form>
  </Paper>
 )
}

