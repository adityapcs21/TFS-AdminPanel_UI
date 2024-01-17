import { Button, Grid } from '@mui/material'
import React, { lazy, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReusbaleDialog from '../../../components/SharedComponent/ReusableDialog';
import AddImageInGallery from '../../../components/ImageGallery/AddImageGallery';
import UpdateImageGallery from '../../../components/ImageGallery/UpdateImageGallery';
import Loader from '../../../common/loader';
import { DeleteGalleryById, GetAllGallery } from '../../../redux/slice/gallery';
const ReusableTable = lazy(() => import("../../../components/SharedComponent/ReusableTable"));

const columns = [
    { id: 'title', label: 'Title' },
    { id: "createdBy", label: "Created By" },
    { id: 'createdDate', label: 'Image Created On' },
    { id: 'updatedDate', label: 'Image Updated On' },
    { id: 'attachments', label: 'Thumbnails' },
];

export default function ImageGallery() {
    const dispatch = useDispatch();
    const AllGallery = useSelector((state) => state.gallery.Gallery.galleryList)
    const NewBlogAdded = useSelector((state) => state.blog.newBlogAdded)
    console.log("All", AllGallery)


    const [openEditModal, setOpenEditModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [editRowsData, setEditRowsData] = useState({})


    useEffect(() => {
        if (NewBlogAdded) {
            dispatch(GetAllGallery("image"))
        }
    }, [NewBlogAdded])


    useEffect(() => {
        dispatch(GetAllGallery("image"))
    }, [])

    const handleDeleteRows = (row) => {
        dispatch(DeleteGalleryById(row.galleryId))
    }

    const handleView = (row) => {
        setEditRowsData(row)
        setOpenViewModal(prevState => !prevState)
    }

    const handleEdit = (row) => {
        setEditRowsData(row)
        setOpenEditModal(prevState => !prevState)
    }

    const AddBlog = () => {
        setOpenAddModal(prevState => !prevState)
    }


    return (
        <Grid container spacing={2} sx={{ width: '100%' }}>
            <Grid item xs={12}>
                <Button onClick={() => AddBlog()} variant="contained" color="primary">Add Gallery Image</Button>
            </Grid>
            <Grid item xs={12}>
                {AllGallery ?
                    <ReusableTable
                        columns={columns}
                        data={AllGallery}
                        onDelete={handleDeleteRows}
                        onView={handleView}
                        onEdit={handleEdit}
                    />
                    :
                    <Loader />
                }
            </Grid>
            <ReusbaleDialog maxWidth="md" open={openAddModal} onClose={() => setOpenAddModal(prevState => !prevState)}>
                <AddImageInGallery onClose={() => setOpenAddModal(prevState => !prevState)} />
            </ReusbaleDialog>

            <ReusbaleDialog maxWidth="md" open={openEditModal} onClose={() => setOpenEditModal(prevState => !prevState)}>
                <UpdateImageGallery data={editRowsData} onClose={() => setOpenEditModal(prevState => !prevState)} />
            </ReusbaleDialog>

            {/* <ReusbaleDialog maxWidth={"md"} open={openViewModal} onClose={() => setOpenViewModal(prevState => !prevState)}>
                <ViewBlog data={editRowsData} onClose={() => setOpenViewModal(prevState => !prevState)} />
            </ReusbaleDialog> */}
        </Grid >
    )
}
