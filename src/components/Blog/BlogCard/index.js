import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';


export default function BlogCard({ title, createdBy, date, description, media }) {

 function getInitials(name) {
  const initials = name.split(' ').map(word => word.charAt(0)).join('');
  return initials;
 }

 return (
  <Card sx={{ maxWidth: 345 }}>
   <CardHeader
    avatar={
     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
      {getInitials(createdBy)}
     </Avatar>
    }
    action={
     <IconButton aria-label="settings">
      <MoreVertIcon />
     </IconButton>
    }
    title={title}
    subheader={moment().format('LL')}
   />
   <CardMedia
    component="img"
    height="194"
    image={media}
    alt={createdBy}
   />
   <CardContent>
    <Typography variant="body2" color="text.secondary" sx={{ minHeight: '62px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>{description}</Typography>
   </CardContent>
  </Card>
 );
}