import React, { useEffect, useState } from 'react';
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
import { EditorState, convertFromHTML, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import FullScreenLoader from '../../../common/FullscreenLoader';

const schema = yup.object().shape({
 title: yup.string().required(),
 description: yup.string().required(),
 attachments: yup.array().of(yup.mixed().required('Image is required')),
});

const EditBlog = ({ data, onClose }) => {
 const dispatch = useDispatch()
 const { blogId, title, createdBy, description, attachments } = data;

 const isLoading = useSelector((state) => state.blog.isMediaUploading)
 const [file, setFile] = useState(attachments);
 const [fileName, setFileName] = useState([]);
 const [prevImages, setPrevImages] = useState(attachments)
 const { control, setValue, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
 });

 const contentBlocks = convertFromHTML(description);
 const initialContentState = ContentState.createFromBlockArray(contentBlocks);
 const [editorState, setEditorState] = useState(EditorState.createWithContent(initialContentState));

 const onEditorStateChange = (newEditorState) => {
  setEditorState(newEditorState);
 };

 useEffect(() => {
  setValue('attachments', attachments);
 }, [])


 useEffect(() => {
  setValue("description", draftToHtml(convertToRaw(editorState.getCurrentContent())))
 }, [editorState])

 async function onSubmit(data) {
  if (fileName && fileName.length > 0) {
   dispatch(mediaIsUploading())
   const resultsArray = [];
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
    "blogId": data.blogId,
    "title": data.title,
    "description": data.description,
    "createdBy": data.createdBy,
    "attachments": [...resultsArray, ...prevImages]
   }
   dispatch(UpdateBlog(payload))
   onClose()
  }
  else {
   dispatch(UpdateBlog(data))
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
   setFile(prevState => [...prevState, results[0]]);
  });
 };

 const handleRemoveImages = (img) => {
  let filtered = file.filter((item) => item != img)
  let Filtered2 = fileName.filter(item2 => item2.Name != img.Name)
  let filtered3 = prevImages.filter((item3) => item3 != img)
  setFileName(Filtered2)
  setFile(filtered)
  setPrevImages(filtered3)
 }

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
      <Box sx={{ border: '1px solid lightgrey' }}>
       <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        editorClassName="richtext-editor-textarea"
       />
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
   <FullScreenLoader loading={isLoading} />
  </Container >
 );
};

export default EditBlog;

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