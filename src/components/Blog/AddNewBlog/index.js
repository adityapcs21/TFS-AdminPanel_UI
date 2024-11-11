import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CancelIcon from '@mui/icons-material/Cancel';
import { TextField, Button, Grid, Container, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { SaveBlog, mediaIsUploading } from '../../../redux/slice/blog';
import { getS3SignedUrl } from '../../../helpers/mediaUpload';
import useEditorState from '../../../helpers/textEditorHandler';
import FullScreenLoader from '../../../common/FullscreenLoader';
import styled from '@emotion/styled';
import ReactQuill, { Quill } from 'react-quill';



const schema = yup.object().shape({
 title: yup.string().required(),
 createdBy: yup.string().required(),
 attachments: yup.array().of(yup.mixed().required('Image is required')),
 description: yup.string().required('description is required'),
});

const AddNewBlog = ({ onClose }) => {

 let quillRef = null;
 const dispatch = useDispatch()
 const isLoading = useSelector((state) => state.blog.isMediaUploading)

 const [file, setFile] = useState([]);
 const [fileName, setFileName] = useState([])
 const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem("tfsUserDetails")))
 const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
 });

 async function onSubmit(data) {

  if (fileName && fileName.length > 0) {
   dispatch(mediaIsUploading())
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
    "title": data.title,
    "description": data.description,
    "createdBy": data.createdBy,
    "attachments": resultsArray,
    "blogId": uid
   }
   dispatch(SaveBlog(payload))
  }
  else {
   let payload = {
    "title": data.title,
    "description": data.description,
    "createdBy": data.createdBy,
    "attachments": [],
    // "blogId": uid
   }
   dispatch(SaveBlog(payload))
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
   <Box sx={{ display: "flex", justifyContent: 'space-between', padding: '5px 0px 20px 0px' }}>
    <Typography variant='h5'>Add New Blog</Typography>
    <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
   </Box>
   <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={1}>
     <Grid item xs={12}>
      <Controller
       name="title"
       control={control}
       render={({ field }) => (
        <TextField size='small' fullWidth label="Title" {...field} error={!!errors.title} helperText={errors.title?.message} />
       )}
      />
     </Grid>
     <Grid sx={{ display: "none" }} item xs={5}>
      <Controller
       name="createdBy"
       defaultValue={userDetails?.emailId}
       control={control}
       render={({ field }) => (
        <TextField size='medium' fullWidth label="Created By" {...field} error={!!errors.createdBy} helperText={errors.createdBy?.message} />
       )}
      />
      <Box sx={{ minHeight: '16px' }}></Box>
     </Grid>

     <Grid item xs={12}>
      <Box className="rich-text-editor">
       <Controller
        name="description"
        control={control}
        render={({ field: { onChange, value } }) => (
         <ReactQuill
          placeholder='Write something here...'
          className={`quill-editor ${errors.description ? 'show__error' : ''}`}
          ref={quillRef}
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
           ],
           
          }}
         />
        )}
       />
       {errors.description && <div className='show__error_text'>{errors.description.message}</div>}
      </Box>
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
        <Grid display="flex">
         {file.map((url, index) => (
          <Grid >
           <ImageWrapper key={index}>
            <DisplayAttachment src={url.file || url} />
            <CloseIconCont>
             <CancelIcon onClick={() => handleRemoveImages(url)} />
            </CloseIconCont>
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
       <Button type="submit" variant="contained" color="primary">Add Blog</Button>
      </Box>
     </Grid>
    </Grid>
   </form>
   <FullScreenLoader loading={isLoading} />

  </Container>
 );
};

export default AddNewBlog;
const ImageWrapper = styled(Box)({
 height: '100%',
 width: "100%",
 position: "relative"
})
const DisplayAttachment = styled('img')({
 objectFit: "cover",
 color: "#152766",
 width: "50px",
 height: "50px",
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
 top: '-9px',
 right: '2px',
 height: '23px',
 background: 'white',
 "&.hover": {
  fontSize: "8px",
 }
})