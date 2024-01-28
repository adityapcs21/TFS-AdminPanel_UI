import { Button, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllGallery } from '../../../redux/slice/gallery';
import BlogCard from '../../../components/ImageGallery/GalleryCard';
import ReusbaleDialog from '../../../components/SharedComponent/ReusableDialog';
import { useState } from 'react';
import AddImageInGallery from '../../../components/ImageGallery/AddImageGallery';
import Loader from '../../../common/loader';

export default function ImageGallery() {
    const dispatch = useDispatch();
    const AllGallery = useSelector((state) => state.gallery.Gallery.galleryList);
    const isGalleryUpdated = useSelector((state) => state.gallery.newGalleryAdded)

    const [openAddModal, setOpenAddModal] = useState(false)

    useEffect(() => {
        dispatch(GetAllGallery("image"))
    }, [])

    useEffect(() => {
        if (isGalleryUpdated) {
            dispatch(GetAllGallery("image"))
        }
    }, [isGalleryUpdated])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button variant='contained' onClick={() => setOpenAddModal(prevState => !prevState)}>Upload Image</Button>
            </Grid>
            {AllGallery && AllGallery.length > 0 ? AllGallery.map((item, index) => {
                return (
                    <Grid key={index} item xs={6} md={4} lg={3} >
                        < BlogCard data={item} title={item.title} createdBy={item.createdBy} date={item.createdDate} media={item.attachments[0]} />
                    </Grid>
                )
            }) :
                <Grid item xs={12}>
                    <Loader />
                </Grid>
            }

            <ReusbaleDialog maxWidth="md" open={openAddModal} onClose={() => setOpenAddModal(prevState => !prevState)}>
                <AddImageInGallery onClose={() => setOpenAddModal(prevState => !prevState)} />
            </ReusbaleDialog>
        </Grid>
    )
}
