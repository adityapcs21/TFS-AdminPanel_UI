import { Button, Grid } from '@mui/material'
import React, { lazy, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteBlogById, getAllBlogs } from '../../redux/slice/blog';
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog';
import EditBlog from '../../components/Blog/EditBlog';
import Loader from '../../common/loader';
import ViewBlog from '../../components/Blog/ViewBlog';
import AddNewBlog from '../../components/Blog/AddNewBlog';
import Swal from 'sweetalert2';
const ReusableTable = lazy(() => import("../../components/SharedComponent/ReusableTable"));

const columns = [
  { id: 'title', label: 'Title' },
  { id: "createdBy", label: "Created By" },
  { id: 'createdDate', label: 'Published On' },
  { id: 'description', label: 'Description' },
  { id: 'attachments', label: 'Thumbnails' },
];

export default function Blog() {
  const dispatch = useDispatch();
  const BlogData = useSelector((state) => state.blog.BlogData?.blogList)
  const NewBlogAdded = useSelector((state) => state.blog.newBlogAdded)

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editRowsData, setEditRowsData] = useState({});

  useEffect(() => {
    if (NewBlogAdded) {
      dispatch(getAllBlogs())
    }
  }, [NewBlogAdded])


  useEffect(() => {
    dispatch(getAllBlogs())
  }, [])

  const handleDeleteRows = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        dispatch(DeleteBlogById(row.blogId));
      }
    });
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

  const handleCloseAddModal = (event, reason) => {
    if (reason && reason === "backdropClick")
      return;
    setOpenAddModal(prevState => !prevState)
  }

  const handleCloseViewModal = (event, reason) => {
    if (reason && reason === "backdropClick")
      return;
    setOpenViewModal(prevState => !prevState)
  }

  const handleCloseEditModal = (event, reason) => {
    if (reason && reason === "backdropClick")
      return;
    setOpenEditModal(prevState => !prevState)
  }

  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      <Grid item xs={12}>
        <Button onClick={() => AddBlog()} variant="contained" color="primary">Add Blog</Button>
      </Grid>
      <Grid item xs={12}>
        {BlogData ?
          <ReusableTable
            columns={columns}
            data={BlogData}
            onDelete={handleDeleteRows}
            onView={handleView}
            onEdit={handleEdit}
          />
          :
          <Loader />
        }
      </Grid>
      <ReusbaleDialog maxWidth="md" open={openAddModal} onClose={handleCloseAddModal}>
        <AddNewBlog onClose={() => setOpenAddModal(prevState => !prevState)} />
      </ReusbaleDialog>

      <ReusbaleDialog maxWidth="md" open={openEditModal} onClose={handleCloseEditModal}>
        <EditBlog data={editRowsData} onClose={() => setOpenEditModal(prevState => !prevState)} />
      </ReusbaleDialog>

      <ReusbaleDialog maxWidth={"md"} open={openViewModal} onClose={handleCloseViewModal}>
        <ViewBlog data={editRowsData} onClose={() => setOpenViewModal(prevState => !prevState)} />
      </ReusbaleDialog>
    </Grid >
  )
}
