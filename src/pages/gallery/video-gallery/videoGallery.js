import { Box, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteGalleryById, GetAllGallery } from '../../../redux/slice/gallery';
import styled from 'styled-components';
import BlogCard from '../../../components/Blog/BlogCard';

import ReusbaleDialog from '../../../components/SharedComponent/ReusableDialog';
import UpdateImageGallery from '../../../components/ImageGallery/UpdateImageGallery';

export default function VideoGallery() {
    const dispatch = useDispatch();
    const AllGallery = useSelector((state) => state.gallery.Gallery.galleryList)


    useEffect(() => {
        dispatch(GetAllGallery("videos"))
    }, [])


    const handleViewImage = (item) => {
        console.log(item)

    };

    return (
        <Grid container spacing={2}>
            {AllGallery && AllGallery.map((item, index) => {
                return (
                    <Grid key={index} item xs={3} >
                        < BlogCard onView={handleViewImage} data={item} title={item.title} createdBy={item.createdBy} date={item.createdDate} media={item.attachments[0]} />
                    </Grid>
                )
            })}




            {/* <ReusbaleDialog maxWidth="md" open={openEditModal} onClose={() => setOpenEditModal(prevState => !prevState)}>
                <UpdateImageGallery data={editRowsData} onClose={() => setOpenEditModal(prevState => !prevState)} />
            </ReusbaleDialog> */}
        </Grid>


    )
}

const Images = styled('img')({
    width: '200px',
    height: '200px'
})