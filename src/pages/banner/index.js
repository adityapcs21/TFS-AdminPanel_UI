import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteBanner, getAllBanner, isBannerLoading } from '../../redux/slice/banner';
import { Box, Button, Card, CardMedia, Grid, IconButton, Pagination } from '@mui/material';
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import AddBannerModal from '../../components/Banner/AddBannerModal';
import Loader from '../../common/loader';


export default function Banner() {
 const dispatch = useDispatch();
 const AllBannerImages = useSelector(state => state.banner.bannerImages?.bannerList)
 const totalBanner = useSelector(state => state.banner.bannerImages?.size)
 const isBannerUpdated = useSelector(state => state.banner.isBannerUpdated)
 const isLoading = useSelector(state => state.banner.isLoading)

 const [openAddModal, setOpenAddModal] = useState(false);
 const [hovered, setHovered] = useState(false);
 const [activeIndex, setActiveIndex] = useState()
 const [page, setPage] = React.useState(1);
 const [perPageResult, setPerpageResult] = useState(8);
 const [totalPages, setTotalPages] = useState(1)


 const handleChange = (event, value) => {
  setPage(value);
 };

 const handleMouseEnter = (id) => {
  setHovered(true);
  setActiveIndex(id)
 };

 const handleMouseLeave = () => {
  setHovered(false);
 };

 useEffect(() => {
  if (AllBannerImages) {
   const totalNoOfPages = Math.ceil(totalBanner / perPageResult)
   setTotalPages(totalNoOfPages)
  }
 }, [AllBannerImages])

 useEffect(() => {
  let payload = {
   "test": "",
   "createdDateFrom": "",
   "createdDateTo": "",
   "pageNo": page,
   "perPageResults": perPageResult
  }

  dispatch(isBannerLoading())
  dispatch(getAllBanner(payload))
 }, [page, perPageResult])


 useEffect(() => {
  if (isBannerUpdated) {
   let payload = {
    "test": "",
    "createdDateFrom": "",
    "createdDateTo": "",
    "pageNo": page,
    "perPageResults": perPageResult
   }
   console.log("Called2")

   dispatch(getAllBanner(payload))
  }
 }, [isBannerUpdated])

 const AddBanner = () => {
  setOpenAddModal(prevState => !prevState)
 }

 const handleDelete = (id) => {
  Swal.fire({
   title: "Are you sure?",
   text: "You want to delete this banner?",
   icon: "warning",
   showCancelButton: true,
   confirmButtonColor: "#2c4c74",
   cancelButtonColor: "#f36334",
   confirmButtonText: "Yes, delete it!"
  }).then((result) => {
   if (result.isConfirmed) {
    Swal.fire({
     title: "Deleted!",
     text: "Your banner has been deleted.",
     icon: "success"
    });
    dispatch(DeleteBanner(id));
   }
  });
 }

 return (
  <Grid container spacing={2}>
   <Grid item xs={12}>
    <Button onClick={() => AddBanner()} variant="contained" color="primary">Add Banner</Button>
   </Grid>
   <Grid item xs={12}>
    <Grid container spacing={2}>
     {!isLoading && AllBannerImages && AllBannerImages.length > 0 ? AllBannerImages.map((item, index) => (
      <Grid item xs={12} md={3} key={item.bannerId}>
       <Card sx={{ maxWidth: 345, position: 'relative', cursor: 'pointer' }}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={() => handleMouseLeave()}
       >
        <CardMedia
         component="img"
         height="194"
         image={item.url}
         alt={"thumbnail"}
        />
        <Box sx={{ display: hovered && index === activeIndex ? 'block' : 'none' }}>
         <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', background: 'rgba(0, 0, 0, 0.54)', color: '#FFFFFF', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <Box>{item.text}</Box>
         </Box>
         <IconButton
          onClick={() => handleDelete(item.bannerId)}
          sx={{
           color: 'rgba(255, 255, 255)',
           position: 'absolute',
           top: '0',
           right: 0
          }}
          aria-label={`info about ${item.text}`}
         >
          <DeleteIcon />
         </IconButton>
        </Box>
       </Card>
      </Grid>
     ))
      :
      <Grid item xs={12}>
       <Loader />
      </Grid>
     }
    </Grid>
   </Grid>

   {totalPages && totalPages > 1 &&
    <Grid item xs={12} marginTop={3}>
     <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Pagination color='primary' count={totalPages} page={page} onChange={handleChange} />
     </Box>
    </Grid>
   }

   <ReusbaleDialog maxWidth="md" open={openAddModal} onClose={() => setOpenAddModal(prevState => !prevState)}>
    <AddBannerModal onClose={() => setOpenAddModal(!openAddModal)} />
   </ReusbaleDialog>

  </Grid>
 )
}
