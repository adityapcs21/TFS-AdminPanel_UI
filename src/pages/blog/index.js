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


const BlogData1 = {
  "blogList": [
    {
      "blogId": "598a72bc-018c-1000-9afe-bea6ad8ed7113",
      "title": "Second Blog changed",
      "createdBy": "vishal Soni",
      "createdDate": "11-12-2023",
      "updatedDate": "17-12-2023",
      "description": "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels,if you like.",
      "externalLink": "www.google.com",
      "mediaLink": "https://pbwebdev.co.uk/wp-content/uploads/2018/12/blogs.jpg",
      "type": "image",
      "deleted": true
    },
    {
      "blogId": "598a72bc-018c-1000-9afe-bea6ad8ed712",
      "title": "Shrimp and Chorizo Paella",
      "createdBy": "Aditya Ranjan",
      "createdDate": "11-12-2023",
      "updatedDate": "17-12-2023",
      "description": "this is description 2",
      "externalLink": "www.google.com",
      "mediaLink": "https://cdn.pixabay.com/photo/2016/03/15/12/24/student-1258137_1280.jpg",
      "type": "image",
      "deleted": false
    },
    {
      "blogId": "598a72bc-018c-1000-9afe-bea6ad8ed714",
      "title": "Second Blog changed",
      "createdBy": "vishal",
      "createdDate": "11-12-2023",
      "updatedDate": "17-12-2023",
      "description": "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels,if you like.",
      "externalLink": "www.google.com",
      "mediaLink": "https://cdn.pixabay.com/photo/2023/12/01/15/16/red-fruits-8423880_1280.jpg",
      "type": "image",
      "deleted": false
    },
    {
      "blogId": "598a72bc-018c-1000-9afe-bea6ad8ed715",
      "title": "Second Blog changed",
      "createdBy": "vishal",
      "createdDate": "11-12-2023",
      "updatedDate": "17-12-2023",
      "description": "this is description 2",
      "externalLink": "www.google.com",
      "mediaLink": "https://pbwebdev.co.uk/wp-content/uploads/2018/12/blogs.jpg",
      "type": "image",
      "deleted": false
    },
    {
      "blogId": "598a72bc-018c-1000-9afe-bea6ad8ed716",
      "title": "Second Blog changed",
      "createdBy": "vishal",
      "createdDate": "11-12-2023",
      "updatedDate": "17-12-2023",
      "description": "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels,if you like.",
      "externalLink": "www.google.com",
      "mediaLink": "https://pbwebdev.co.uk/wp-content/uploads/2018/12/blogs.jpg",
      "type": "image",
      "deleted": false
    },
    {
      "blogId": "598a72bc-018c-1000-9afe-bea6ad8ed717",
      "title": "Second Blog changed",
      "createdBy": "vishal",
      "createdDate": "11-12-2023",
      "updatedDate": "17-12-2023",
      "description": "this is description 2",
      "externalLink": "www.google.com",
      "mediaLink": "https://cdn.pixabay.com/photo/2016/03/15/12/24/student-1258137_1280.jpg",
      "type": "image",
      "deleted": false
    },
    {
      "blogId": "598a72bc-018c-1000-9afe-bea6ad8ed719",
      "title": "Second Blog changed",
      "createdBy": "vishal",
      "createdDate": "11-12-2023",
      "updatedDate": "17-12-2023",
      "description": "this is description 2",
      "externalLink": "www.google.com",
      "mediaLink": "https://cdn.pixabay.com/photo/2023/12/01/15/16/red-fruits-8423880_1280.jpg",
      "type": "image",
      "deleted": false
    }
  ],
  "size": 5
}

const columns = [
  { id: 'title', label: 'Title' },
  { id: 'createdDate', label: 'Published On' },
  { id: 'description', label: 'Description' },
  { id: 'externalLink', label: 'External Link' },
  { id: 'attachments', label: 'Thumbnails' },
];

export default function Blog() {
  const dispatch = useDispatch();
  const BlogData = useSelector((state) => state.blog.BlogData)

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  const [editRowsData, setEditRowsData] = useState({})
  const [rowData, setRowData] = useState([])

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
