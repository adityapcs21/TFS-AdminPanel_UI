import { Box, Button, Grid, Pagination } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllGallery, galleryLoading } from '../../../redux/slice/gallery';
import BlogCard from '../../../components/ImageGallery/GalleryCard';
import ReusbaleDialog from '../../../components/SharedComponent/ReusableDialog';
import { useState } from 'react';
import AddImageInGallery from '../../../components/ImageGallery/AddImageGallery';
import Loader from '../../../common/loader';

export default function ImageGallery() {
    const dispatch = useDispatch();
    const AllGallery = useSelector((state) => state.gallery.Gallery.galleryList);
    const isGalleryUpdated = useSelector((state) => state.gallery.newGalleryAdded)
    const Gallery = useSelector((state) => state.gallery.Gallery);
    const isLoading = useSelector((state) => state.gallery.isLoading);

    const [openAddModal, setOpenAddModal] = useState(false)
    const [page, setPage] = React.useState(1);
    const [perPageResult, setPerpageResult] = useState(8);
    const [totalPages, setTotalPages] = useState(1)
    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        let payload = {
            "title": "",
            "type": "image", //image,video
            "createdDateFrom": "",
            "createdDateTo": "",
            "pageNo": page,
            "perPageResults": perPageResult

        }
        dispatch(galleryLoading())
        dispatch(GetAllGallery(payload))
    }, [page])

    useEffect(() => {
        if (Gallery) {
            const totalNoOfPages = Math.ceil(Gallery.size / perPageResult)
            setTotalPages(totalNoOfPages)
        }
    }, [Gallery])

    useEffect(() => {
        if (isGalleryUpdated) {
            dispatch(galleryLoading())
            let payload = {
                "title": "",
                "type": "image",
                "createdDateFrom": "",
                "createdDateTo": "",
                "pageNo": page,
                "perPageResults": perPageResult

            }
            dispatch(GetAllGallery(payload))
        }
    }, [isGalleryUpdated])

    const handleCloseAddModal = (event, reason) => {
        if (reason && reason === "backdropClick")
            return;
        setOpenAddModal(prevState => !prevState)
    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button variant='contained' onClick={() => setOpenAddModal(prevState => !prevState)}>Upload Image</Button>
            </Grid>
            {!isLoading && AllGallery && AllGallery.length > 0 ? AllGallery.map((item, index) => {
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


            <Grid item xs={12} marginTop={3}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination color="primary" count={totalPages} page={page} onChange={handleChange} />
                </Box>
            </Grid>

            <ReusbaleDialog maxWidth="md" open={openAddModal} onClose={handleCloseAddModal} >
                <AddImageInGallery onClose={() => setOpenAddModal(prevState => !prevState)} />
            </ReusbaleDialog>
        </Grid>
    )
}
