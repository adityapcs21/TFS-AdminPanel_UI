import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Grid, Container, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { getS3SignedUrl } from '../../../helpers/mediaUpload';
import { UpdateGallery, galleryIsUpdating } from '../../../redux/slice/gallery';
import FullScreenLoader from '../../../common/FullscreenLoader';

const schema = yup.object().shape({
 title: yup.string().optional(),
 createdBy: yup.string().required(),
 attachments: yup.array().of(yup.mixed().required('Video is required')),
});

const UpdateVideoGallery = ({ onClose, data }) => {
 const dispatch = useDispatch()
 const { galleryId, title, attachments } = data;
 const isLoading = useSelector((state) => state.gallery.isMediaUploading)


 const [file, setFile] = useState(attachments);
 const [fileName, setFileName] = useState([])
 const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem("userDetails")))
 const { control, setValue, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
 });

 useEffect(() => {
  setValue('attachments', attachments);
 }, [])

 async function onSubmit(data) {
  const resultsArray = [];
  if (fileName && fileName.length > 0) {
   dispatch(galleryIsUpdating())
   await Promise.all(fileName.map(async (item) => {
    let payload1 = {
     mediaType: "galleryAttachments/videos",
     fileName: item.Name,
     file: item.File
    }
    let response = await getS3SignedUrl(payload1);
    resultsArray.push(response.url);
   }));

   let payload = {
    "galleryId": galleryId,
    "title": data.title,
    "attachments": resultsArray
   }
   dispatch(UpdateGallery(payload))
  }
  else {
   let payload = {
    "galleryId": galleryId,
    "title": data.title,
    "attachments": data.attachments
   }
   dispatch(UpdateGallery(payload))

  }
  onClose()
 };

 const handleFileChange = (e) => {
  const files = e.target.files;
  const urls = Array.from(files).map((file) => {
   let name = file.name
   setFileName(prevState => [...prevState, { Name: name, "File": file }])
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
    <Typography variant='h5'>Update Video gallery</Typography>
    <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
   </Box>
   <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={2}>
     <Grid item xs={12}>
      <Controller
       defaultValue={title}
       name="title"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Title" {...field} error={!!errors.title} helperText={errors.title?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>
     <Grid sx={{ display: "none" }} item xs={5}>
      <Controller
       name="createdBy"
       defaultValue={userDetails?.emailId}
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Created By" {...field} error={!!errors.createdBy} helperText={errors.createdBy?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
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
          <Box sx={{ width: '80px', height: '80px', position: 'relative' }}>
           <video src={url} width="80px" height="80px" autoPlay />
          </Box>
         ))}
        </div>
       )}
      </Box>

     </Grid>
     <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: 'flex-end', gap: '10px' }}>
       <Button variant="contained" color="warning" onClick={onClose}>Cancel</Button>
       <Button type="submit" variant="contained" color="primary">Update Video</Button>
      </Box>
     </Grid>
    </Grid>
   </form>
   <FullScreenLoader loading={isLoading} />
  </Container>
 );
};

export default UpdateVideoGallery;
