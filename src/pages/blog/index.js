import { Button, Grid } from '@mui/material'
import React, { lazy, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteBlogById, GetBlogDetails, blogIsLoading, getAllBlogs } from '../../redux/slice/blog';
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
  const totalPages = useSelector((state) => state.blog.BlogData?.size)
  const isLoading = useSelector((state) => state.blog.isLoading)

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editRowsData, setEditRowsData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [blogDetails, showBlogDetails] = useState({})

  useEffect(() => {
    if (NewBlogAdded) {
      let payload = {
        "title": "",
        "description": "",
        "createdDateFrom": "",
        "createdDateTo": "",
        "pageNo": page + 1,
        "perPageResults": rowsPerPage
      }
      dispatch(getAllBlogs(payload))
    }
  }, [NewBlogAdded])


  useEffect(() => {
    dispatch(blogIsLoading())
    let payload = {
      "title": "",
      "description": "",
      "createdDateFrom": "",
      "createdDateTo": "",
      "pageNo": page + 1,
      "perPageResults": rowsPerPage
    }
    dispatch(getAllBlogs(payload))
  }, [page, rowsPerPage])

  const handleDeleteRows = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2c4c74",
      cancelButtonColor: "#f36334",
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
    dispatch(GetBlogDetails(row.blogId))
      .then((response) => {
        showBlogDetails(response.payload)
        setOpenViewModal(prevState => !prevState)
      })
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

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      <Grid item xs={12}>
        <Button onClick={() => AddBlog()} variant="contained" color="primary">Add Blog</Button>
      </Grid>
      <Grid item xs={12}>
        {!isLoading && BlogData ?
          <ReusableTable
            columns={columns}
            data={BlogData}
            onDelete={handleDeleteRows}
            onView={handleView}
            onEdit={handleEdit}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            count={totalPages}
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

      <ReusbaleDialog maxWidth={"lg"} open={openViewModal} onClose={handleCloseViewModal}>
        <ViewBlog data={blogDetails} onClose={() => setOpenViewModal(prevState => !prevState)} />
      </ReusbaleDialog>
    </Grid >
  )
}
