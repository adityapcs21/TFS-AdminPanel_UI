import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import moment from 'moment';
import { Box, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ReusbaleDialog from '../../SharedComponent/ReusableDialog';
import "yet-another-react-lightbox/styles.css";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DeleteGalleryById } from '../../../redux/slice/gallery';
import UpdateVideoGallery from '../UpdateVideo';
import Swal from 'sweetalert2';

export default function VideoCard({ title, createdBy, updatedDate, media, onDelete, data }) {
 const dispatch = useDispatch()
 function getInitials(name) {
  const initials = name.split(' ').map(word => word.charAt(0)).join('');
  return initials;
 }
 const [openEditModal, setOpenEditModal] = React.useState(false);
 const [editRowsData, setEditRowsData] = React.useState({})

 const handleUpdate = () => {
  setEditRowsData(data)
  setOpenEditModal(prevState => !prevState)
 }

 const handleDelete = () => {
  Swal.fire({
   title: "Are you sure?",
   text: "You want to delete?",
   icon: "warning",
   showCancelButton: true,
   confirmButtonColor: "#3085d6",
   cancelButtonColor: "#d33",
   confirmButtonText: "Yes, delete it!"
  }).then((result) => {
   if (result.isConfirmed) {
    Swal.fire({
     title: "Deleted!",
     text: "Your file has been deleted.",
     icon: "success"
    });
    dispatch(DeleteGalleryById(data.galleryId))
   }
  });
 }
 return (
  <Card sx={{ maxWidth: 345 }}>
   <Typography sx={{ padding: '10px 20px' }}>{title}</Typography>
   <video src={media} controls width="100%" height="200px" muted />
   <CardHeader
    sx={{ padding: "6px 16px" }}
    avatar={
     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
      {getInitials(createdBy)}
     </Avatar>
    }
    title={createdBy}
    subheader={moment(updatedDate).format('LL')}
   />

   <Box sx={{ display: 'flex', gap: '20px', padding: '10px 20px' }} onClick={onDelete}>
    <Typography sx={{ color: 'darkblue', cursor: 'pointer' }} onClick={() => handleDelete()}>Delete</Typography>
    <Typography sx={{ color: 'darkblue', cursor: 'pointer' }} onClick={() => handleUpdate()}>Edit</Typography>
   </Box>

   <ReusbaleDialog maxWidth="md" open={openEditModal} onClose={() => setOpenEditModal(prevState => !prevState)}>
    <UpdateVideoGallery data={editRowsData} onClose={() => setOpenEditModal(prevState => !prevState)} />
   </ReusbaleDialog>
  </Card>
 );
}
