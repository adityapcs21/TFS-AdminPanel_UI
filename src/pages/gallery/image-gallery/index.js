import { Button, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllGallery } from '../../../redux/slice/gallery';
import BlogCard from '../../../components/Blog/BlogCard';
import ReusbaleDialog from '../../../components/SharedComponent/ReusableDialog';
import { useState } from 'react';
import AddImageInGallery from '../../../components/ImageGallery/AddImageGallery';
import Loader from '../../../common/loader';

export default function ImageGallery() {
    const dispatch = useDispatch();
    const AllGallery = useSelector((state) => state.gallery.Gallery.galleryList)
    const [openAddModal, setOpenAddModal] = useState(false)

    useEffect(() => {
        dispatch(GetAllGallery("image"))
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button variant='contained' onClick={() => setOpenAddModal(prevState => !prevState)}>Create Gallery</Button>
            </Grid>
            {AllGallery && AllGallery.length > 0 ? AllGallery.map((item, index) => {
                return (
                    <Grid key={index} item xs={3} >
                        < BlogCard data={item} title={item.title} createdBy={item.createdBy} date={item.createdDate} media={item.attachments[0]} />
                    </Grid>
                )
            }) :
                <Loader />
            }

            <ReusbaleDialog maxWidth="md" open={openAddModal} onClose={() => setOpenAddModal(prevState => !prevState)}>
                <AddImageInGallery onClose={() => setOpenAddModal(prevState => !prevState)} />
            </ReusbaleDialog>
        </Grid>
    )
}
