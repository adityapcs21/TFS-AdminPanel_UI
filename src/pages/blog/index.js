import { Button, Grid } from '@mui/material'
import React, { lazy, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteBlogById, getAllBlogs } from '../../redux/slice/blog';
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog';
import EditBlog from '../../components/Blog/EditBlog';
import Loader from '../../common/loader';
import ViewBlog from '../../components/Blog/ViewBlog';
import AddNewBlog from '../../components/Blog/AddNewBlog';
const ReusableTable = lazy(() => import("../../components/SharedComponent/ReusableTable"));

const columns = [
  { id: 'title', label: 'Title' },
  { id: "createdBy", label: "Created By" },
  { id: 'createdDate', label: 'Published On' },
  { id: 'description', label: 'Description' },
  { id: 'externalLink', label: 'External Link' },
  { id: 'attachments', label: 'Thumbnails' },
];

export default function Blog() {
  const dispatch = useDispatch();
  const BlogData = useSelector((state) => state.blog.BlogData)
  const NewBlogAdded = useSelector((state) => state.blog.newBlogAdded)
  console.log("--------", NewBlogAdded)

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editRowsData, setEditRowsData] = useState({})
  const [rowData, setRowData] = useState([])

  useEffect(() => {
    if (NewBlogAdded) {
      dispatch(getAllBlogs())
    }
  }, [NewBlogAdded])

  useEffect(() => {
    if (BlogData) {
      setRowData(BlogData.blogList)
    }
  }, [BlogData])

  useEffect(() => {
    dispatch(getAllBlogs())
  }, [])

  const handleDeleteRows = (row) => {
    dispatch(DeleteBlogById(row.blogId))
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
        <Button onClick={() => AddBlog()} variant="contained" color="primary">Add Blog</Button>
      </Grid>
      <Grid item xs={12}>
        {rowData ?
          <ReusableTable
            columns={columns}
            data={rowData}
            onDelete={handleDeleteRows}
            onView={handleView}
            onEdit={handleEdit}
          />
          :
          <Loader />
        }
      </Grid>
      <ReusbaleDialog maxWidth="md" open={openAddModal} onClose={() => setOpenAddModal(prevState => !prevState)}>
        <AddNewBlog onClose={() => setOpenAddModal(prevState => !prevState)} />
      </ReusbaleDialog>

      <ReusbaleDialog maxWidth="md" open={openEditModal} onClose={() => setOpenEditModal(prevState => !prevState)}>
        <EditBlog data={editRowsData} onClose={() => setOpenEditModal(prevState => !prevState)} />
      </ReusbaleDialog>

      <ReusbaleDialog maxWidth={"md"} open={openViewModal} onClose={() => setOpenViewModal(prevState => !prevState)}>
        <ViewBlog data={editRowsData} onClose={() => setOpenViewModal(prevState => !prevState)} />
      </ReusbaleDialog>
    </Grid >
  )
}
