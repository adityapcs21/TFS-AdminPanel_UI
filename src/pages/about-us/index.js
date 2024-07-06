import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteAbout, GetAllAbout, allAboutIsLoading } from '../../redux/slice/about';
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog';
import AddNewAbout from '../../components/about/createAbout';
import UpdateAbout from '../../components/about/updateAbout';
import ViewAbout from '../../components/about/viewAbout';
import Swal from 'sweetalert2';
import Loader from '../../common/loader';

function AboutCard({ heading, text, attachments, subHeading, data, handleView, handleUpdate, handleDelete }) {

  return (
    <Card sx={{ maxWidth: 345, width: '100%' }}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {heading}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ height: '45px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {subHeading}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt=""
        height="140"
        image={attachments}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{ height: '40px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleView(data)}>View</Button>
        <Button size="small" onClick={() => handleDelete(data)}>Delete</Button>
        <Button size="small" onClick={() => handleUpdate(data)}>Update</Button>
      </CardActions>
    </Card>
  );
}

export default function AboutUs() {
  const dispatch = useDispatch()
  const allData = useSelector(state => state.about.allAbout);
  const isLoading = useSelector(state => state.about.isLoading)
  const isUpdated = useSelector(state => state.about.allAboutUpdated)


  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [viewData, setViewData] = useState({});
  const [updateData, setUpdateData] = useState({})

  useEffect(() => {
    dispatch(allAboutIsLoading())
    dispatch(GetAllAbout())
  }, [])

  useEffect(() => {
    if (isUpdated) {
      dispatch(GetAllAbout())
    }
  }, [isUpdated])


  const handleAddAbout = () => {
    setOpenCreateModal(!openCreateModal)
  }

  const handleUpdate = (data) => {
    setUpdateData(data)
    setOpenUpdateModal(!openUpdateModal)
  }

  const handleDelete = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this About content?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2c4c74",
      cancelButtonColor: "#f36334",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your about content has been deleted.",
          icon: "success"
        });
        dispatch(DeleteAbout(data.contentId));
      }
    });
  }

  const handleView = (data) => {
    setViewModal(!viewModal)
    setViewData(data)
  }


  return (
    <Grid>
      {isLoading ?
        <Loader />
        :
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button onClick={() => handleAddAbout()} variant="contained" color="primary">Add About Us</Button>
          </Grid>
          {
            allData && allData.map((item, index) => {
              return (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <AboutCard
                    handleView={handleView}
                    data={item}
                    heading={item.heading}
                    text={item.text}
                    attachments={item.attachments[0]}
                    subHeading={item.subHeading}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}

                  />
                </Grid>
              )
            })}

          <ReusbaleDialog maxWidth="md" open={openCreateModal} onClose={() => setOpenCreateModal(!openCreateModal)}>
            <AddNewAbout onClose={() => setOpenCreateModal(prevState => !prevState)} />
          </ReusbaleDialog>

          <ReusbaleDialog maxWidth="md" open={openUpdateModal} onClose={() => setOpenUpdateModal(!openUpdateModal)}>
            <UpdateAbout data={updateData} onClose={() => setOpenUpdateModal(prevState => !prevState)} />
          </ReusbaleDialog>

          <ReusbaleDialog maxWidth="md" open={viewModal} onClose={() => setViewModal(!viewModal)}>
            <ViewAbout data={viewData} onClose={() => setViewModal(prevState => !prevState)} />
          </ReusbaleDialog>
        </Grid>
      }
    </Grid>
  )
}
