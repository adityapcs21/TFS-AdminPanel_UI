import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Grid, Container, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import CancelIcon from '@mui/icons-material/Cancel';
import styled from '@emotion/styled';
import { getS3SignedUrl } from '../../helpers/mediaUpload';
import FullScreenLoader from '../../common/FullscreenLoader';
import { UpdateAboutUs, setMediaIsLoading } from '../../redux/slice/about';

const schema = yup.object().shape({
 heading: yup.string().required(),
 subHeading: yup.string().required(),
 text: yup.string().required(),
 sequence: yup.number().required(),
 attachments: yup.array().of(yup.mixed().required('Image is required')),
});

const UpdateAbout = ({ data, onClose }) => {
 const dispatch = useDispatch()
 const { contentId, attachments, heading, sequence, subHeading, text } = data;
 const mediaIsLoading = useSelector((state) => state.about.mediaIsLoading)

 const [file, setFile] = useState(attachments);
 const [fileName, setFileName] = useState([]);
 const [previosImages, setPreviousImages] = useState(attachments)
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
   dispatch(setMediaIsLoading())
   const resultsArray = [...previosImages];
   await Promise.all(fileName.map(async (item) => {
    let payload1 = {
     mediaType: "blogAttachments",
     fileName: item.Name,
     file: item.File
    }
    let response = await getS3SignedUrl(payload1);
    resultsArray.push(response.url);
   }));

   let payload = {
    "contentId": data.contentId,
    "heading": data.heading,
    "sequence": data.sequence,
    "subHeading": data.subHeading,
    "text": data.text,
    "attachments": resultsArray
   }
   dispatch(UpdateAboutUs(payload))
   onClose()
  }
  else {
   data.attachments = file && file.length > 0 ? file : data.attachments
   dispatch(UpdateAboutUs(data))
   onClose()
  }
 };

 const handleFileChange = (e) => {
  const files = e.target.files;
  const urls = Array.from(files).map((file) => {
   let name = file.name
   setFileName(prevState => [...prevState, { Name: name, "File": file, isNew: true }])
   const reader = new FileReader();
   return new Promise((resolve) => {
    reader.onloadend = () => {
     resolve({ Name: name, "file": reader.result });
    };
    reader.readAsDataURL(file);
   });
  });

  Promise.all(urls).then((results) => {
   setFile(prevState => [...prevState, ...results]);
  });
 };

 const handleRemoveImages = (img) => {
  let filtered = file.filter((item) => item != img)
  let Filtered2 = fileName.filter(item2 => item2.Name != img.Name)
  let filtered3 = previosImages.filter((item3) => item3 != img)
  setFileName(Filtered2)
  setFile(filtered)
  setPreviousImages(filtered3)
 }

 return (
  <Container >
   <Box sx={{ display: "flex", justifyContent: 'space-between', padding: '20px 0px' }}>
    <Typography variant='h5'>Update About Us page</Typography>
    <CloseIcon onClick={onClose} />
   </Box>
   <form onSubmit={handleSubmit((data) => {
    data.contentId = contentId;
    onSubmit(data);
   })}>
    <Grid container spacing={2}>
     <Grid item xs={6}>
      <Controller
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
       name="sequence"
       control={control}
       render={({ field }) => (
        <TextField type='number' fullWidth label="Sequence" {...field} error={!!errors.sequence} helperText={errors.sequence?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
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
         <Grid item>
          <ImageWrapper key={index}>
           <DisplayAttachment src={media.file || media} />
           <CloseIconCont>
            <CancelIcon onClick={() => handleRemoveImages(media)} />
           </CloseIconCont>
          </ImageWrapper>
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
   <FullScreenLoader loading={mediaIsLoading} />
  </Container >
 );
};

export default UpdateAbout;

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