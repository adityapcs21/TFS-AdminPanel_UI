import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js';
import { ReactMultiEmail } from 'react-multi-email';
import { SendTextEmail } from '../../../redux/slice/events';
import { useDispatch } from 'react-redux';
import DraftsIcon from '@mui/icons-material/Drafts';
import Swal from 'sweetalert2';
import Loader from '../../../common/loader';
import ReactQuill from 'react-quill';

const validationSchema = Yup.object().shape({
  receivers: Yup.array()
    .of(Yup.string().email('Invalid email address'))
    .min(1, 'At least one email address is required')
    .required('To field is required'),
  subject: Yup.string().required('Subject field is required'),
  message: Yup.string().required('Message field is required'),
  //  attachments: Yup.array().of(
  //   Yup.mixed()
  //    .test('fileSize', 'File size is too large', (value) => {
  //     return value && value.size <= 5 * 1024 * 1024; // 5MB
  //    })
  //    .test('fileType', 'Unsupported file type', (value) => {
  //     return value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type);
  //    })
  //  ),
});

const DraftEmail = () => {
  let quillRef = null;
  const dispatch = useDispatch();
  const [draftMessage, setDraftMessage] = useState(JSON.parse(localStorage.getItem('tfsDraftMessage')));
  const [isDiscarded, setIsDiscarded] = useState(false);
  const [emails, setEmails] = useState(draftMessage && draftMessage.receivers);
  const [focused, setFocused] = useState(false);
  const [haveDraft, setHaveDraft] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      receivers: draftMessage && draftMessage.receivers,
      subject: draftMessage && draftMessage.subject,
      message: draftMessage && draftMessage.message,
    },
  });

  const tfsDraftMessage = watch();

  useEffect(() => {
    if (draftMessage) {
      if (draftMessage.receivers?.length > 0 || (draftMessage.subject && draftMessage.subject.length > 0) || (draftMessage.message && draftMessage.message.trim() !== "<p></p>")) {
        setHaveDraft(true)
      }
      else {
        setHaveDraft(false)
      }

    }
  }, [draftMessage]);

  useEffect(() => {
    localStorage.setItem('tfsDraftMessage', JSON.stringify(tfsDraftMessage));
  }, [tfsDraftMessage]);


  const onSubmit = (data) => {
    setIsLoading(true);
    data.sender = "alerts@welcometotfs.com";
    dispatch(SendTextEmail(data))
      .then((response) => {
        console.log("responsee", response)
        setIsLoading(false);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response.payload?.data,
          showConfirmButton: false,
          timer: 1500
        })
      })
    localStorage.removeItem("tfsDraftMessage");
    reset({
      receivers: [],
      subject: "",
      message: "",
      //  attachments: [],
    });
    setIsDiscarded(true);
    localStorage.removeItem("tfsDraftMessage");
    setEmails([])
  };


  return (
    <Box width={"100%"}>
      {
        isLoading ? <Loader />
          :
          <Grid container spacing={3} justifyContent="space-between" flexWrap={"nowrap"}>
            {haveDraft ?
              <Grid item xs={12}>
                <Card sx={{ padding: '15px 20px' }}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography component="h3">Draft Message</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Controller
                          name="receivers"
                          control={control}
                          defaultValue={[]}
                          render={({ field }) => (
                            <ReactMultiEmail
                              placeholder='Input your email'
                              emails={emails}
                              onChange={(_emails) => {
                                setEmails(_emails);
                                field.onChange(_emails);
                              }}
                              autoFocus={true}
                              onFocus={() => setFocused(true)}
                              onBlur={() => setFocused(false)}
                              getLabel={(email, index, removeEmail) => {
                                return (
                                  <div data-tag key={index}>
                                    <div data-tag-item>{email}</div>
                                    <span data-tag-handle onClick={() => removeEmail(index)}>
                                      ×
                                    </span>
                                  </div>
                                );
                              }}
                              error={!!errors.receivers}
                              helperText={errors.receivers?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Controller
                          name="subject"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Subject"
                              variant="outlined"
                              fullWidth
                              error={!!errors.subject}
                              helperText={errors.subject?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box className="rich-text-editor">
                          <Controller
                            name="message"
                            control={control}
                            defaultValue={draftMessage && draftMessage.message}
                            render={({ field: { onChange, value } }) => (
                              <ReactQuill
                                className={`quill-editor ${errors.message ? 'show__error' : ''}`}
                                ref={quillRef}
                                value={value}
                                onChange={onChange}
                                modules={{
                                  toolbar: [
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
                          {errors.message && <div className='show__error_text'>{errors.message.message}</div>}
                        </Box>
                      </Grid>
                      {/* <Grid item xs={12}>
                    <Controller
                      name="attachments"
                      control={control}
                      defaultValue={[]}
                      render={({ field }) => (
                      <TextField
                        {...field}
                        type="file"
                        variant="outlined"
                        fullWidth
                        multiple
                        error={!!errors.attachments}
                        helperText={errors.attachments?.message}
                      />
                      )}
                    />
                    </Grid> */}
                    </Grid>
                    <Grid container spacing={2} justifyContent="flex-end" sx={{ marginTop: '10px' }}>
                      <Grid item>
                        <Button variant="contained" color="primary">
                          Save
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" color="error" type="submit">
                          Send
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Card>
              </Grid>
              :
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                  <DraftsIcon sx={{ fontSize: '80px' }} />
                  <Typography variant='h5'>No Draft message to show</Typography>
                </Box>
              </Grid>
            }
          </Grid>
      }
    </Box>
  );
};

export default DraftEmail;
