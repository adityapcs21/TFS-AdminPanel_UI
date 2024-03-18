import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CancelIcon from '@mui/icons-material/Cancel';
import { TextField, Button, Grid, Box, Typography, IconButton, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { getS3SignedUrl } from '../../helpers/mediaUpload';
import styled from '@emotion/styled';
import FullScreenLoader from '../../common/FullscreenLoader';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from 'react-draft-wysiwyg';
import useEditorState from '../../helpers/textEditorHandler';
import draftToHtml from 'draftjs-to-html';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import { AddEvent, EditEvent, mediaIsLoading } from '../../redux/slice/events';
import moment from 'moment';
import htmlToDraft from 'html-to-draftjs';

const schema = yup.object().shape({
  eventName: yup.string().required('Event Name is required'),
  eventDate: yup.string().required('Event Date is required'),
  eventStartTime: yup.string().required('Event Start Time is required'),
  eventEndTime: yup.string().required('Event End Time is required'),
  registrationDeadLineDate: yup.date().required('Registration Deadline Date is required'),
  description: yup.string().required('Description is required'),
  location: yup.string().required('Location is required'),
  attachments: yup.array().of(yup.string()),
  registrationLimit: yup.number().required('Registration Limit is required').positive('Registration Limit must be a positive number'),
  eventType: yup.string().required('Event Type is required'),
  registrationFees: yup.string().required('Registration Fees is required'),
});

const UpdateEvent = ({ onClose }) => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.events.mediaUploading)
  const eventDetails = useSelector(state => state.events.eventDetails)

  const [file, setFile] = useState(eventDetails.attachments);
  const [fileName, setFileName] = useState([])
  // const { editorState, onChange } = useEditorState();
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem("userDetails")));

  const [editorState, setEditorState] = useState(() => {
    const contentBlock = htmlToDraft(eventDetails.description);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      );
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });

  const { control, setValue, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      "eventDate": moment(eventDetails.eventDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
      "registrationDeadLineDate": moment(eventDetails.registrationDeadLineDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
      "eventName": eventDetails.eventName,
      "eventStartTime": eventDetails.eventStartTime,
      "eventEndTime": eventDetails.eventEndTime,
      "description": eventDetails.description,
      "location": eventDetails.location,
      "registrationLimit": eventDetails.registrationLimit,
      "eventType": eventDetails.eventType,
      "registrationFees": eventDetails.registrationFees
    }
  });

  useEffect(() => {
    const contentAsHtml = draftToHtml(
      convertToRaw(editorState.getCurrentContent()),
    );
    setValue("description", contentAsHtml)
  }, [editorState]);

  async function onSubmit(data) {
    data.eventId = eventDetails.eventId;
    data.eventDate = moment(data.eventDate, 'YYYY-MM-DDs').format('DD-MM-YYYY')
    data.registrationDeadLineDate = moment(data.registrationDeadLineDate, 'YYYY-MM-DDs').format('DD-MM-YYYY')
    if (fileName && fileName.length > 0) {
      dispatch(mediaIsLoading())
      const resultsArray = [];
      let uid;
      await Promise.all(fileName.map(async (item) => {
        let payload1 = {
          mediaType: "eventAttachments",
          fileName: item.Name,
          file: item.File
        }
        let response = await getS3SignedUrl(payload1);
        resultsArray.push(response.url);
        uid = response.uid
      }));

      data.attachments = resultsArray
      dispatch(EditEvent(data))
    }
    else {
      data.attachments = eventDetails.attachments
      dispatch(EditEvent(data))
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


  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    setValue("description", newEditorState)
  };



  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: 'space-between', padding: '20px 0px' }}>
          <Typography variant='h5'>Update Event</Typography>
          <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Controller
                name="eventName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    size='small'
                    label="Event Name"
                    variant="outlined"
                    fullWidth
                    {...field}
                    error={!!errors.eventName}
                    helperText={errors.eventName?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="location"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    size='small'
                    label="Location"
                    variant="outlined"
                    fullWidth
                    {...field}
                    error={!!errors.location}
                    helperText={errors.location?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="eventDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    size='small'
                    {...field}
                    label="Event Start Date"
                    type="date"
                    fullWidth
                    error={!!errors.eventDate}
                    helperText={errors.eventDate?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="registrationDeadLineDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    size='small'
                    {...field}
                    label="Registration Deadline Date"
                    type="date"
                    fullWidth
                    error={!!errors.registrationDeadLineDate}
                    helperText={errors.registrationDeadLineDate?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="eventStartTime"
                control={control}
                render={({ field }) => (
                  <TextField
                    size='small'
                    label="Event Start Time"
                    variant="outlined"
                    fullWidth
                    {...field}
                    error={!!errors.eventStartTime}
                    helperText={errors.eventStartTime?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="eventEndTime"
                control={control}
                render={({ field }) => (
                  <TextField
                    size='small'
                    label="Event End Time"
                    variant="outlined"
                    fullWidth
                    {...field}
                    error={!!errors.eventEndTime}
                    helperText={errors.eventEndTime?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="registrationLimit"
                control={control}
                render={({ field }) => (
                  <TextField
                    size='small'
                    label="Registration Limit"
                    variant="outlined"
                    fullWidth
                    {...field}
                    error={!!errors.registrationLimit}
                    helperText={errors.registrationLimit?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="registrationFees"
                control={control}
                render={({ field }) => (
                  <TextField
                    size='small'
                    label="Registration Fees"
                    variant="outlined"
                    fullWidth
                    {...field}
                    error={!!errors.registrationFees}
                    helperText={errors.registrationFees?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="eventType"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Event Type</InputLabel>
                    <Select
                      size='small'
                      {...field}
                      error={!!errors.eventType}
                      label="Event Type"
                      value={field.value || ''}  // Explicitly set the value
                    >
                      <MenuItem value="">Select Event Type</MenuItem>
                      <MenuItem value="ONLINE">ONLINE</MenuItem>
                      <MenuItem value="PHYSICAL">PHYSICAL</MenuItem>
                    </Select>
                    <FormHelperText>{errors.eventType?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>


            <Grid item xs={12}>
              <Box sx={{ border: '1px solid lightgrey' }}>
                <Editor
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                  editorClassName="event-text-editor"
                  toolbar={
                    {
                      options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'remove'],
                    }}
                />
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
                <Button type="submit" variant="contained" color="primary">Update Event</Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <FullScreenLoader loading={isLoading} />

    </Grid>
  );
};

export default UpdateEvent;
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