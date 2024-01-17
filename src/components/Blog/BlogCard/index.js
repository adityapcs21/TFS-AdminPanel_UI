import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import moment from 'moment';
import { Box } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ReusbaleDialog from '../../SharedComponent/ReusableDialog';
import UpdateImageGallery from '../../ImageGallery/UpdateImageGallery';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DeleteGalleryById } from '../../../redux/slice/gallery';
export default function BlogCard({ title, createdBy, date, media, onDelete, data }) {

 const dispatch = useDispatch()
 function getInitials(name) {
  const initials = name.split(' ').map(word => word.charAt(0)).join('');
  return initials;
 }
 const [openEditModal, setOpenEditModal] = React.useState(false);
 const [editRowsData, setEditRowsData] = React.useState({})
 const [toggler, setToggler] = useState(false);
 const [showImages, setShowImages] = useState([]);


 const handleViewImage = (item) => {
  let arr = item.attachments.map((val) => { return { "src": val } })
  setToggler(true)
  setShowImages(arr)
 };

 const handleUpdate = () => {
  setEditRowsData(data)
  setOpenEditModal(prevState => !prevState)
 }

 const handleDelete = () => {
  dispatch(DeleteGalleryById(data.galleryId))
 }
 return (
  <Card sx={{ maxWidth: 345 }}>
   <CardHeader
    avatar={
     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
      {getInitials(createdBy)}
     </Avatar>
    }

    title={title}
    subheader={moment(date).format('LL')}
   />
   <CardMedia
    component="img"
    height="194"
    image={media}
    alt={createdBy}
   />
   <CardContent>
    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
     <IconButton onClick={() => handleViewImage(data)}>
      <RemoveRedEyeIcon />
     </IconButton>
     <IconButton onClick={onDelete}>
      <DeleteForeverIcon onClick={() => handleDelete()} />
     </IconButton>
     <IconButton onClick={() => handleUpdate()}>
      <EditIcon />
     </IconButton>
    </Box>
   </CardContent>

   <ReusbaleDialog maxWidth="md" open={openEditModal} onClose={() => setOpenEditModal(prevState => !prevState)}>
    <UpdateImageGallery data={editRowsData} onClose={() => setOpenEditModal(prevState => !prevState)} />
   </ReusbaleDialog>

   <Lightbox
    open={toggler}
    close={() => setToggler(false)}
    slides={showImages}
   />
  </Card>
 );
}