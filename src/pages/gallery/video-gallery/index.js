import { Box, Button, Grid, Pagination, TablePagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import VideoCard from '../../../components/VideoGallery/VideoCard';
import ReusbaleDialog from '../../../components/SharedComponent/ReusableDialog';
import AddVideoGallery from '../../../components/VideoGallery/AddVideoGallery';
import { GetAllVideoGallery, galleryLoading } from '../../../redux/slice/gallery';
import Loader from '../../../common/loader';

export default function VideoGallery() {
    const dispatch = useDispatch();
    const AllGallery = useSelector((state) => state.gallery.Video?.galleryList)
    const Gallery = useSelector((state) => state.gallery.Video)

    const isGalleryUpdated = useSelector((state) => state.gallery.newGalleryAdded);
    const isLoading = useSelector((state) => state.gallery.isLoading);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [page, setPage] = React.useState(1);
    const [perPageResult, setPerpageResult] = useState(8);
    const [totalPages, setTotalPages] = useState(1)
    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        let payload = {
            "title": "",
            "type": "video", //image,video
            "createdDateFrom": "",
            "createdDateTo": "",
            "pageNo": page,
            "perPageResults": perPageResult

        }
        dispatch(galleryLoading())
        dispatch(GetAllVideoGallery(payload))
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
                "type": "video", //image,video
                "createdDateFrom": "",
                "createdDateTo": "",
                "pageNo": page,
                "perPageResults": perPageResult

            }
            dispatch(GetAllVideoGallery(payload))
        }
    }, [isGalleryUpdated])

    const handleViewImage = (item) => {
        console.log(item)
    };

    const handleCloseAddModal = (event, reason) => {
        if (reason && reason === "backdropClick")
            return;
        setOpenAddModal(prevState => !prevState)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button variant='contained' onClick={() => setOpenAddModal(prevState => !prevState)}>Upload Video</Button>
            </Grid>

            {!isLoading && AllGallery && AllGallery.length > 0 ? AllGallery.map((item, index) => {
                return (
                    <Grid key={index} item xs={6} lg={4} xl={3}>
                        < VideoCard onView={handleViewImage} data={item} title={item.title} createdBy={item.createdBy} date={item.createdDate} media={item.attachments[0]} />
                    </Grid>
                )
            })
                :
                <Grid item xs={12}>
                    <Loader />
                </Grid>
            }

            <Grid item xs={12} marginTop={3}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination color='primary' count={totalPages} page={page} onChange={handleChange} />
                </Box>
            </Grid>

            <ReusbaleDialog maxWidth="md" open={openAddModal} onClose={handleCloseAddModal}>
                <AddVideoGallery onClose={() => setOpenAddModal(prevState => !prevState)} />
            </ReusbaleDialog>
        </Grid>
    )
}
