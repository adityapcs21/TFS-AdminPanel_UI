import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBanner } from '../../redux/slice/banner';
import { Button, Grid, ImageList, ImageListItem } from '@mui/material';
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog';
import { useState } from 'react';

export default function Banner() {
 const dispatch = useDispatch();
 const AllBannerImages = useSelector(state => state.banner.bannerImages?.bannerList)
 const [openAddModal, setOpenAddModal] = useState(false);

 useEffect(() => {
  dispatch(getAllBanner())
 }, [])

 const AddBanner = () => {
  setOpenAddModal(prevState => !prevState)
 }

 return (
  <Grid container>
   {/* <Grid xs={12}>
    <Grid item xs={12}>
     <Button onClick={() => AddBanner()} variant="contained" color="primary">Add Banner</Button>
    </Grid>
   </Grid>
   <Grid item xs={12}>
    <ImageList variant="masonry" cols={3} gap={8}>
     {AllBannerImages && AllBannerImages.length > 0 && AllBannerImages.map((item) => (
      <ImageListItem key={item.url}>
       <img
        srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
        src={`${item.url}?w=248&fit=crop&auto=format`}
        alt={item.url}
        loading="lazy"
       />
      </ImageListItem>
     ))}
    </ImageList>
   </Grid>
   <ReusbaleDialog maxWidth="md" open={openAddModal} onClose={() => setOpenAddModal(prevState => !prevState)}>

   </ReusbaleDialog> */}
   <Grid xs={12}> we are in progress...</Grid>
  </Grid>
 )
}
