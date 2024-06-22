import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js';
import { ReactMultiEmail } from 'react-multi-email';
import { SendTextEmail } from '../../../redux/slice/events';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();
  const [draftMessage, setDraftMessage] = useState(JSON.parse(localStorage.getItem('tfsDraftMessage')));
  const [isDiscarded, setIsDiscarded] = useState(false);
  const [emails, setEmails] = useState(draftMessage && draftMessage.receivers);
  const [focused, setFocused] = useState(false);

  const { control, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      receivers: draftMessage && draftMessage.receivers,
      subject: draftMessage && draftMessage.subject,
    },
  });

  const contentBlocks = convertFromHTML(draftMessage.message || "");
  const initialContentState = ContentState.createFromBlockArray(contentBlocks);

  const [editorState, setEditorState] = useState(EditorState.createWithContent(initialContentState));

  const tfsDraftMessage = watch();

  useEffect(() => {
    localStorage.setItem('tfsDraftMessage', JSON.stringify(tfsDraftMessage));
  }, [tfsDraftMessage]);

  useEffect(() => {
    setValue("receivers", emails)
  }, [editorState, setValue]);

  useEffect(() => {
    setValue("message", draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }, [editorState, setValue]);

  const onSubmit = (data) => {
    data.sender = "alerts@welcometotfs.com";
    console.log("data", data);
    dispatch(SendTextEmail(data))
    localStorage.removeItem("tfsDraftMessage");
    reset({
      receivers: [],
      subject: "",
      message: "",
      //  attachments: [],
    });
    setEditorState(EditorState.createEmpty());
    setIsDiscarded(true);
    localStorage.removeItem("tfsDraftMessage");
    setEmails([])
  };

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <Box width={"100%"}>
      <Grid container spacing={3} justifyContent="space-between" flexWrap={"nowrap"}>
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
                  <Editor
                    editorState={editorState}
                    editorClassName="richtext-editor-textarea"
                    onEditorStateChange={onEditorStateChange}
                    toolbar={{
                      options: ['inline', 'fontSize', 'fontFamily', 'list'],
                    }}
                  />
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
      </Grid>
    </Box>
  );
};

export default DraftEmail;
