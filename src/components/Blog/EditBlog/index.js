import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Grid, Container, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateBlog, mediaIsUploading } from '../../../redux/slice/blog';
import { getS3SignedUrl } from '../../../helpers/mediaUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import styled from '@emotion/styled';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import FullScreenLoader from '../../../common/FullscreenLoader';
import ReactQuill from 'react-quill';

const schema = yup.object().shape({
 title: yup.string().required(),
 description: yup.string().required(),
 attachments: yup.array().of(yup.mixed().required('Image is required')),
});

const EditBlog = ({ data, onClose }) => {
 const dispatch = useDispatch();
 const { blogId, title, createdBy, description, attachments } = data;

 const isLoading = useSelector((state) => state.blog.isMediaUploading);
 const [file, setFile] = useState(attachments);
 const [fileName, setFileName] = useState([]);
 const [previosImages, setPreviousImages] = useState(attachments);
 const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
 });
 let quillRef = null;



 async function onSubmit(data) {
  if (fileName && fileName.length > 0) {
   dispatch(mediaIsUploading());
   const resultsArray = [...previosImages];
   await Promise.all(fileName.map(async (item) => {
    let payload1 = {
     mediaType: "blogAttachments",
     fileName: item.Name,
     file: item.File
    };
    let response = await getS3SignedUrl(payload1);
    resultsArray.push(response.url);
   }));

   let payload = {
    "blogId": data.blogId,
    "title": data.title,
    "description": data.description,
    "createdBy": data.createdBy,
    "attachments": resultsArray
   };
   dispatch(UpdateBlog(payload));
   onClose();
  } else {
   data.attachments = file && file.length > 0 ? file : data.attachments;
   dispatch(UpdateBlog(data));
   onClose();
  }
 };

 const handleFileChange = (e) => {
  const files = e.target.files;
  const urls = Array.from(files).map((file) => {
   let name = file.name;
   setFileName(prevState => [...prevState, { Name: name, "File": file, isNew: true }]);
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
  let filtered = file.filter((item) => item !== img);
  let Filtered2 = fileName.filter(item2 => item2.Name !== img.Name);
  let filtered3 = previosImages.filter((item3) => item3 !== img);
  setFileName(Filtered2);
  setFile(filtered);
  setPreviousImages(filtered3);
 };

 return (
  <Container>
   <Box sx={{ display: "flex", justifyContent: 'space-between', padding: '5px 0px 20px 0px' }}>
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
        <TextField size='small' fullWidth label="Title" {...field} error={!!errors.title} helperText={errors.title?.message} />
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
        <TextField size='small' fullWidth label="Created By" {...field} error={!!errors.createdBy} helperText={errors.createdBy?.message} />
       )}
      />
     </Grid>

     <Grid item xs={12}>
      <Box className="rich-text-editor">
       <Controller
        name="description"
        control={control}
        defaultValue={description}
        render={({ field: { onChange, value } }) => (
         <ReactQuill
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
      <Grid container spacing={2}>
       <Grid item>
        <label htmlFor="fileInput">
         <IconButton component="span">
          <CloudUploadIcon />
         </IconButton>
        </label>
        <Button sx={{ display: 'none' }} variant="contained" component="span" onClick={() => document.getElementById('fileInput').click()}>
         Upload
        </Button>
       </Grid>
       {file && file.map((media, index) => (
        <Grid item key={index}>
         <ImageWrapper>
          <DisplayAttachment src={media.file || media} />
          <CloseIconCont>
           <CancelIcon onClick={() => handleRemoveImages(media)} />
          </CloseIconCont>
         </ImageWrapper>
        </Grid>
       ))}
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
   <FullScreenLoader loading={isLoading} />
  </Container>
 );
};

export default EditBlog;

const ImageWrapper = styled(Box)({
 height: '100%',
 width: "100%",
 position: "relative"
});

const DisplayAttachment = styled('img')({
 objectFit: "cover",
 color: "#152766",
 width: "50px",
 height: "50px",
 background: "#f7f7f7",
 borderRadius: "3px",
 marginRight: "10px",
 border: "1px solid lightgray",
 '&:hover': {
  backgroundColor: "rgba(0, 0, 0, 0.1)",
 }
});

const CloseIconCont = styled(Box)({
 borderRadius: '50%',
 position: 'absolute',
 top: '-5px',
 right: '5px',
 height: '24px',
 background: 'white',
 "&:hover": {
  fontSize: "18px",
 }
});
