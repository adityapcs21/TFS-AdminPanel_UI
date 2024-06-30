import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CancelIcon from '@mui/icons-material/Cancel';
import { TextField, Button, Grid, Container, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import FullScreenLoader from '../../common/FullscreenLoader';
import { getS3SignedUrl } from '../../helpers/mediaUpload';
import { CreateAbout } from '../../redux/slice/about';


const schema = yup.object().shape({
 heading: yup.string().required(),
 subHeading: yup.string().required(),
 text: yup.string().required(),
 sequence: yup.number().required(),
 attachments: yup.array().of(yup.mixed().required('Image is required')),
});

const ViewAbout = ({ onClose, data }) => {
 const { attachments, deleted, heading, sequence, subHeading, text } = data;

 const dispatch = useDispatch()
 const isLoading = useSelector((state) => state.blog.isMediaUploading)

 const [file, setFile] = useState([]);
 const [fileName, setFileName] = useState([])
 const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
  defaultValues: {
   "heading": heading,
   "sequence": sequence,
   "subHeading": subHeading,
   "text": text
  }
 });


 async function onSubmit(data) {
  if (fileName && fileName.length > 0) {
   // dispatch(mediaIsUploading())
   const resultsArray = [];
   let uid;
   await Promise.all(fileName.map(async (item) => {
    let payload1 = {
     mediaType: "blogAttachments",
     fileName: item.Name,
     file: item.File
    }
    let response = await getS3SignedUrl(payload1);
    resultsArray.push(response.url);
    uid = response.uid
   }));

   let payload = {
    "heading": data.heading,
    "subHeading": data.subHeading,
    "text": data.text,
    "sequence": data.sequence,
    "attachments": resultsArray
   }
   dispatch(CreateAbout(payload))
  }
  else {
   let payload = {
    "heading": data.heading,
    "subHeading": data.subHeading,
    "text": data.text,
    "sequence": data.sequence,
    "attachments": [],
   }
   dispatch(CreateAbout(payload))
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
     resolve({ Name: name, "file": reader.result });
    };
    reader.readAsDataURL(file);
   });
  });

  Promise.all(urls).then((results) => {
   setFile(results);
  });

 };

 const handleRemoveImages = (img) => {
  let filtered = file.filter((item) => item != img)
  let filtered1 = file.filter((item) => item.Name != img.Name)

  setFile(filtered)
  setFileName(filtered1)
 }


 return (
  <Container >
   <Box sx={{ display: "flex", justifyContent: 'space-between', padding: '20px 0px' }}>
    <Typography variant='h5'>View About Details</Typography>
    <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
   </Box>
   <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={1}>
     <Grid item xs={6}>
      <Controller
       disabled
       name="heading"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Heading" {...field} error={!!errors.heading} helperText={errors.heading?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>

     <Grid item xs={6}>
      <Controller
       disabled
       name="subHeading"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Sub heading" {...field} error={!!errors.subHeading} helperText={errors.subHeading?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>

     <Grid item xs={6}>
      <Controller
       disabled
       name="text"
       control={control}
       render={({ field }) => (
        <TextField fullWidth label="Text" {...field} error={!!errors.text} helperText={errors.text?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>
     <Grid item xs={6}>
      <Controller
       disabled
       name="sequence"
       control={control}
       render={({ field }) => (
        <TextField type='number' fullWidth label="Sequence" {...field} error={!!errors.sequence} helperText={errors.sequence?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>

     <Grid item xs={12}>
      <Typography><strong>Is this deleted? : </strong>{deleted ? 'YES' : 'No'}</Typography>
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
       {attachments.length > 0 && (
        <Grid display="flex">
         {attachments.map((url, index) => (
          <Grid >
           <ImageWrapper key={index}>
            <DisplayAttachment src={url} />
            {/* <CloseIconCont>
             <CancelIcon onClick={() => handleRemoveImages(url)} />
            </CloseIconCont> */}
           </ImageWrapper>
          </Grid>
         ))}
        </Grid>
       )}
      </Box>

     </Grid>
     <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: 'flex-end', gap: '10px' }}>
       <Button variant="contained" color="warning" onClick={onClose}>Cancel</Button>
      </Box>
     </Grid>
    </Grid>
   </form>
   <FullScreenLoader loading={isLoading} />

  </Container>
 );
};

export default ViewAbout;
const ImageWrapper = styled(Box)({
 height: '100%',
 width: "100%",
 position: "relative"
})
const DisplayAttachment = styled('img')({
 objectFit: "cover",
 color: "#152766",
 width: "80px",
 height: "80px",
 background: "#f7f7f7",
 borderRadius: "3px",
 marginRight: "10px",
 border: "1px solid lightgray",
 '&.hover': {
  backgroundColor: "rgba(0, 0, 0)",
  opacity: 0.5,
 }
})

const CloseIconCont = styled(Box)({
 borderRadius: '50%',
 position: 'absolute',
 top: '-5px',
 right: '5px',
 height: '24px',
 background: 'white',
 "&.hover": {
  fontSize: "18px",
 }
})