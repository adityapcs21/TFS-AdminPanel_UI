import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Grid, Container, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { getS3SignedUrl } from '../../helpers/mediaUpload';
import FullScreenLoader from '../../common/FullscreenLoader';
import { CreateBanner, bannerIsUpdating } from '../../redux/slice/banner';


const schema = yup.object().shape({
  text: yup.string().optional(),
  attachments: yup.array().of(yup.mixed().required('Image is required')),
});

const AddBannerModal = ({ onClose }) => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.banner.isMediaUploading);

  console.log("banner", isLoading)

  const [file, setFile] = useState([]);
  const [fileName, setFileName] = useState([])
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem("userDetails")))
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  console.log("file", file)

  async function onSubmit(data) {
    const resultsArray = [];
    let uid;
    dispatch(bannerIsUpdating())
    await Promise.all(fileName.map(async (item) => {
      let payload1 = {
        mediaType: "galleryAttachments/videos",
        fileName: item.Name,
        file: item.File
      }
      let response = await getS3SignedUrl(payload1);
      resultsArray.push(response.url);
      uid = response.uid
    }));

    let payload = {
      "text": data.text,
      "url": resultsArray.toString(),
      "bannerId": uid
    }
    console.log("payload", payload)
    dispatch(CreateBanner(payload))
    onClose()
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const urls = Array.from(files).map((file) => {
      let name = file.name
      setFileName(prevState => [{ Name: name, "File": file }])
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
        <Typography variant='h5'>Add New Banner</Typography>
        <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
      </Box>
      <form onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="text"
              control={control}
              render={({ field }) => (
                <TextField fullWidth label="Text" {...field} error={!!errors.title} helperText={errors.title?.message} />
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
              {file && file.length > 0 && file.map((item) => {
                console.log("item", item)
                return (
                  <Box sx={{ width: '80px', height: '80px', position: 'relative' }}>
                    <img src={item} width="80px" height="80px" alt='thumbnail' />
                  </Box>
                )
              })}
            </Box>

          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: 'flex-end', gap: '10px' }}>
              <Button variant="contained" color="warning" onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">Add Banner</Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      <FullScreenLoader loading={isLoading} />
    </Container>
  );
};

export default AddBannerModal;
