import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import VideoCard from '../../../components/VideoGallery/VideoCard';
import ReusbaleDialog from '../../../components/SharedComponent/ReusableDialog';
import AddVideoGallery from '../../../components/VideoGallery/AddVideoGallery';
import { GetAllVideoGallery } from '../../../redux/slice/gallery';
import Loader from '../../../common/loader';

export default function VideoGallery() {
    const dispatch = useDispatch();
    const AllGallery = useSelector((state) => state.gallery.Video.galleryList)
    const isGalleryUpdated = useSelector((state) => state.gallery.newGalleryAdded)

    const [openAddModal, setOpenAddModal] = useState(false)


    useEffect(() => {
        dispatch(GetAllVideoGallery("video"))
    }, [])

    useEffect(() => {
        if (isGalleryUpdated) {
            dispatch(GetAllVideoGallery("video"))
        }
    }, [isGalleryUpdated])

    const handleViewImage = (item) => {
        console.log(item)
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button variant='contained' onClick={() => setOpenAddModal(prevState => !prevState)}>Upload Video</Button>
            </Grid>

            {AllGallery && AllGallery.length > 0 ? AllGallery.map((item, index) => {
                return (
                    <Grid key={index} item xs={6} md={4} lg={3} >
                        < VideoCard onView={handleViewImage} data={item} title={item.title} createdBy={item.createdBy} date={item.createdDate} media={item.attachments[0]} />
                    </Grid>
                )
            })
                :
                <Grid xs={12}>
                    <Loader />
                </Grid>
            }
            <ReusbaleDialog maxWidth="md" open={openAddModal} onClose={() => setOpenAddModal(prevState => !prevState)}>
                <AddVideoGallery onClose={() => setOpenAddModal(prevState => !prevState)} />
            </ReusbaleDialog>
        </Grid>
    )
}
