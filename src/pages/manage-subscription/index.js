import { Box, Button, Card, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteSubscriptionPlan, GetAllSubscriptionPlan, subscriptionDataLoading } from '../../redux/slice/manageSubscription'
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog'
import AddSubscriptionPlan from '../../components/manageSubscription/addSubscriptionPlan'
import UpdateSubscriptionPlan from '../../components/manageSubscription/updateSubscriptionPlan'
import Swal from 'sweetalert2'
import Loader from '../../common/loader'



export default function ManageSubscription() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.manageSubscription.PlanList);
  const isLoading = useSelector(state => state.manageSubscription.isLoading)

  const SubscriptionListUpdated = useSelector(state => state.manageSubscription.SubscriptionListUpdated)

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editData, setEditData] = useState({});


  useEffect(() => {
    dispatch(subscriptionDataLoading());
    dispatch(GetAllSubscriptionPlan())
  }, []);

  useEffect(() => {
    if (SubscriptionListUpdated) {
      dispatch(GetAllSubscriptionPlan())
    }
  }, [SubscriptionListUpdated])

  const handleAdd = () => {
    setOpenAddModal(prevState => !prevState)
  }

  const handleUpdate = (rows) => {
    setOpenEditModal(prevState => !prevState)
    setEditData(rows)
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2c4c74",
      cancelButtonColor: "#f36334",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteSubscriptionPlan(id))
          .then((response) => {
            if (response.payload && response.payload.message) {
              Swal.fire({
                title: "Not Deleted!",
                text: response.payload.message,
                icon: "error"
              });
            } else {
              Swal.fire({
                title: "Deleted!",
                text: response.payload.data,
                icon: "success"
              });
            }
          })
      }
    });
  }

  return (
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={() => handleAdd()}>Create Plan</Button>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={3}>
          {
            !isLoading ? data && data.map((item, index) => (
              <Grid item xs={4}>
                <Card sx={{ maxWidth: 345, padding: '20px' }}>
                  <Box sx={{ background: '#ecf0fa', width: '100%', overflow: "hidden", padding: '10px 20px', borderRadius: '5px', display: 'flex', justifyContent: 'center' }}>
                    <Typography sx={{ fontSize: '18px', fontWeight: '500', textTransform: 'uppercase', }}>{item.planName}</Typography>
                  </Box>

                  <Box sx={{ width: '100%', overflow: "hidden", padding: '10px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '32px', fontWeight: '600', textTransform: 'uppercase' }}>₹{item.fees}</Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: '400', color: 'lightgray' }}>Fees</Typography>
                  </Box>

                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Button onClick={() => handleDelete(item.planId)} sx={{ width: '100%' }} variant="contained" color="warning" name="DELETE">DELETE</Button>
                    </Grid>

                    <Grid item xs={12}>
                      <Button onClick={() => handleUpdate(item)} sx={{ width: '100%' }} variant="contained" color="primary" name="UPDATE">UPDATE</Button>
                    </Grid>
                  </Grid>
                </Card >
              </Grid>
            ))
              :
              <Grid item xs={12}>
                <Loader />
              </Grid>
          }
        </Grid>
      </Grid>

      <ReusbaleDialog maxWidth="sm" open={openAddModal} close={() => setOpenAddModal(prevState => !prevState)}>
        <AddSubscriptionPlan onClose={() => setOpenAddModal(prevState => !prevState)} />
      </ReusbaleDialog>

      <ReusbaleDialog maxWidth="sm" open={openEditModal} close={() => setOpenEditModal(prevState => !prevState)}>
        <UpdateSubscriptionPlan data={editData} onClose={() => setOpenEditModal(prevState => !prevState)} />
      </ReusbaleDialog>
    </Grid>
  )
}
