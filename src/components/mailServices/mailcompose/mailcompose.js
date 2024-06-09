import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Box, Button, Card, Grid, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, TextField, Typography } from '@mui/material';
import { Cloud, Group } from '@mui/icons-material';
import InboxIcon from '@mui/icons-material/Inbox';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import routeNames from '../../../router/routeNames';
import useEditorState from '../../../helpers/textEditorHandler';

const validationSchema = Yup.object().shape({
	to: Yup.string().email('Invalid email address').required('To field is required'),
	subject: Yup.string().required('Subject field is required'),
	message: Yup.string().required('Message field is required'),
	attachments: Yup.array().of(
		Yup.mixed()
			.test('fileSize', 'File size is too large', (value) => {
				return value && value.size <= 5 * 1024 * 1024; // 5MB
			})
			.test('fileType', 'Unsupported file type', (value) => {
				return value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type);
			})
	),
});

const MailCompose = () => {
	const navigate = useNavigate();
	const { editorState, onChange } = useEditorState();

	const { control, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = (data) => {
		console.log(data);
		// Perform additional logic to send the email
	};

	return (
		<Box width={"100%"} >
			<Grid container spacing={3} justifyContent="space-between" flexWrap={"nowrap"}>
				<Grid item xs={12} md={4} lg={3}>
					<Card sx={{ padding: "15px 20px" }}>
						<Button variant="contained" color="primary" fullWidth onClick={() => navigate(routeNames.COMPOSEMAIL)}>
							Compose
						</Button>
						<Box component="div">
							<MenuList>
								<MenuItem>
									<ListItemIcon>
										<InboxIcon fontSize="small" />
									</ListItemIcon>
									<ListItemText>Inbox</ListItemText>
									<Typography variant="body2" color="text.secondary">
										234
									</Typography>
								</MenuItem>
								<MenuItem>
									<ListItemIcon>
										<StarBorderPurple500Icon fontSize="small" />
									</ListItemIcon>
									<ListItemText>Starred</ListItemText>
									<Typography variant="body2" color="text.secondary">
										12
									</Typography>
								</MenuItem>
								<MenuItem>
									<ListItemIcon>
										<SendIcon fontSize="small" />
									</ListItemIcon>
									<ListItemText>Sent</ListItemText>
									<Typography variant="body2" color="text.secondary">
										423
									</Typography>
								</MenuItem>
								<Box component="div" className="divider" />
								<MenuItem>
									<ListItemIcon>
										<Cloud fontSize="small" />
									</ListItemIcon>
									<ListItemText>Important</ListItemText>
								</MenuItem>
							</MenuList>
						</Box>
					</Card>
				</Grid>
				<Grid item xs={12} md={8} lg={9}>
					<Card sx={{ padding: '15px 20px' }} component="form" onSubmit={handleSubmit(onSubmit)}>
						<Box component="div" >

							<Grid container spacing={3}>
								<Grid item xs={12}>
									<Typography component="h3" >
										Compose new message
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Controller
										name="to"
										control={control}
										defaultValue=""
										render={({ field }) => (
											<TextField
												{...field}
												label="To"
												variant="outlined"
												fullWidth
												error={!!errors.to}
												helperText={errors.to?.message}
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
										editorClassName="richtext-editor-textarea"
										onEditorStateChange={onChange}
										toolbar={{
											options: ['inline', 'fontSize', 'fontFamily', 'list'],
										}}
									/>
								</Grid>
								<Grid item xs={12}>
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
								</Grid>
							</Grid>
							<Grid container spacing={2} justifyContent="flex-end" sx={{ marginTop: '10px' }}>
								<Grid item>
									<Button variant="contained" color="success">
										Discard
									</Button>
								</Grid>
								<Grid item>
									<Button variant="contained" color="primary" type="submit">
										Save
									</Button>
								</Grid>
								<Grid item>
									<Button variant="contained" color="error" type="submit">
										Send
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
};

export default MailCompose;
