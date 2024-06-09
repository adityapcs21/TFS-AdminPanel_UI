import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './manageEmail.css'
import routeNames from '../../router/routeNames';
import { Avatar, Button, Card, Divider, Grid, ListItem, ListItemAvatar, ListItemIcon, ListItemText, MenuItem, MenuList, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import SendIcon from '@mui/icons-material/Send';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const mailingData = [
  {
    id: 1,
    class: 'unread',
    staricon: <i className="typcn typcn-star"></i>,
    starActive: '',
    pic: '',
    picClass: 'main-img-user',
    content: '',
    badgecolor: 'gray',
    username: 'Adrian Monino',
    title: 'Someone who believes in you',
    description: 'enean commodo li gula eget dolor cum socia eget dolor enean commodo li gula eget dolor cum socia eget dolor',
    attachicon: <i className="typcn typcn-attachment"></i>,
    time: '11:30am'
  },
  {
    id: 2,
    class: 'unread',
    staricon: <i className="typcn typcn-star"></i>,
    starActive: 'active',
    pic: '',
    picClass: 'main-img-user',
    content: '',
    badgecolor: 'gray',
    username: 'Albert Ansing',
    title: 'Here is What You Missed This Week',
    description: 'enean commodo li gula eget dolor cum socia eget dolor enean commodo li gula eget dolor cum socia eget dolor',
    attachicon: '',
    time: '06:50am'
  },
  {
    id: 3,
    class: '',
    staricon: <i className="typcn typcn-star"></i>,
    starActive: '',
    pic: '',
    picClass: 'main-img-user',
    content: '',
    badgecolor: 'gray',
    username: 'Carla Guden',
    title: '4 Ways to Optimize Your Search',
    description: 'viva mus elemen tum semper nisi enean vulputat enean commodo li gula eget dolor cum socia eget dolor',
    attachicon: <i className="typcn typcn-attachment"></i>,
    time: 'Yesterday'
  },
  {
    id: 4,
    class: 'unread',
    staricon: <i className="typcn typcn-star"></i>,
    starActive: '',
    pic: '',
    picClass: 'main-img-user',
    content: '',
    badgecolor: 'gray',
    username: 'Reven Galeon',
    title: 'We are Giving a Macbook for Free',
    description: 'viva mus elemen tum semper nisi enean vulputat enean commodo li gula eget dolor cum socia eget dolor',
    attachicon: '',
    time: 'Yesterday'
  },
  {
    id: 5,
    class: '',
    staricon: <i className="typcn typcn-star"></i>,
    starActive: '',
    pic: '',
    picClass: 'main-img-user',
    content: '',
    badgecolor: 'gray',
    username: 'Elisse Tan',
    title: 'Keep Your Personal Data Safe',
    description: 'viva mus elemen tum semper nisi enean vulputat enean commodo li gula eget dolor cum socia eget dolor',
    attachicon: '',
    time: 'Oct 13'
  },
  {
    id: 6,
    class: '',
    staricon: <i className="typcn typcn-star"></i>,
    starActive: '',
    pic: '',
    picClass: 'main-img-user',
    content: '',
    badgecolor: 'gray',
    username: 'Marianne Audrey',
    title: 'We have Made Some Changes',
    description: 'viva mus elemen tum semper nisi enean vulputat enean commodo li gula eget dolor cum socia eget dolor',
    attachicon: '',
    time: 'Oct 13'
  },
  {
    id: 7,
    class: '',
    staricon: <i className="typcn typcn-star"></i>,
    starActive: '',
    pic: '',
    picClass: 'main-avatar bg-gray-800',
    content: 'J',
    badgecolor: 'gray',
    username: 'Jane Phoebe',
    title: 'Grab Our Holiday Deals',
    description: 'viva mus elemen tum semper nisi enean vulputat enean commodo li gula eget dolor cum socia eget dolor',
    attachicon: '',
    time: 'Oct 12'
  },
  {
    id: 8,
    class: '',
    staricon: <i className="typcn typcn-star"></i>,
    starActive: '',
    pic: '',
    picClass: 'main-img-user',
    content: '',
    badgecolor: 'gray',
    username: 'Raffy Godinez',
    title: 'Just a Few Steps Away',
    description: 'viva mus elemen tum semper nisi enean vulputat enean commodo li gula eget dolor cum socia eget dolor',
    attachicon: '',
    time: 'Oct 05'
  },
  {
    id: 9,
    class: '',
    staricon: <i className="typcn typcn-star"></i>,
    starActive: 'active',
    pic: '',
    picClass: 'main-img-user',
    content: '',
    badgecolor: 'gray',
    username: 'Allan Cadungog',
    title: 'Credit Card Promos',
    description: 'viva mus elemen tum semper nisi enean vulputat enean commodo li gula eget dolor cum socia eget dolor',
    attachicon: '',
    time: 'Oct 04'
  },
  {
    id: 10,
    class: '',
    staricon: <i className="typcn typcn-star"></i>,
    starActive: '',
    pic: '',
    picClass: 'main-img-user',
    content: '',
    badgecolor: 'gray',
    username: 'Alfie Salinas',
    title: '4 Ways to Optimize Your Search',
    description: 'viva mus elemen tum semper nisi enean vulputat enean commodo li gula eget dolor cum socia eget dolor',
    attachicon: '',
    time: 'Oct 02'
  },
  {
    id: 11,
    class: 'border-bottom-0',
    staricon: <i className="typcn typcn-star"></i>,
    starActive: '',
    pic: '',
    picClass: 'main-img-user',
    content: '',
    badgecolor: 'gray',
    username: 'Jove Guden',
    title: 'Keep Your Personal Data Safe',
    description: 'viva mus elemen tum semper nisi enean vulputat enean commodo li gula eget dolor cum socia eget dolor',
    attachicon: '',
    time: 'Oct 02'
  }
]

const MailItem = memo(({ email }) => (
  <ListItem alignItems="flex-start" sx={{ gap: "15px", alignItems: "center" }}>
    <ListItemAvatar>
      <Avatar alt={email.username} src="/static/images/avatar/2.jpg" />
    </ListItemAvatar>
    <ListItemText
      primary={email.title}
      secondary={
        <React.Fragment>
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {email.username} -
          </Typography>
          {email.description}
        </React.Fragment>
      }
    />
    <ListItemText
      secondary={
        <Typography
          sx={{ display: 'flex', justifyContent: 'end' }}
          component="span"
          variant="body2"
          color="text.secondary"
        >
          {email.time}
        </Typography>
      }
    />
    <div className={`main-mail-star ${email.starActive}`}>
      <StarOutlineIcon fontSize="small" />
    </div>
  </ListItem>
));

const Mail = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4} md={3}>
        <Card sx={{ padding: "15px 20px", height: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate(routeNames.COMPOSEMAIL)}
          >
            Compose
          </Button>
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
          </MenuList>
        </Card>
      </Grid>
      <Grid item xs={12} sm={8} md={9}>
        <Card sx={{ padding: "15px 20px", height: '100%' }}>
          <div className="main-content-body main-content-body-mail">
            <div className="main-mail-header">
              <div>
                <Typography variant="h5" gutterBottom>
                  Inbox
                </Typography>
                <Typography variant="body1">You have 2 unread messages</Typography>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Typography variant="body2" color="text.secondary">
                  1-50 of 1200
                </Typography>
                <div className="btn-group gap-2" role="group">
                  <Button>
                    <KeyboardArrowLeftIcon />
                  </Button>
                  <Button>
                    <KeyboardArrowRightIcon />
                  </Button>
                </div>
              </div>
            </div>
            <div className="main-mail-list">
              {mailingData.map((email) => (
                <MailItem key={email.id} email={email} />
              ))}
            </div>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Mail;
