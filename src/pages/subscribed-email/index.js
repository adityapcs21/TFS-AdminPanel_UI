import React, { useEffect } from 'react'
import ReusableTable from '../../components/SharedComponent/ReusableTable';
import { Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllUserList } from '../../redux/slice/manageUser';
import { GetAllSubscribedUser, UnsubscribeUser } from '../../redux/slice/subscribedUser';
import Loader from '../../common/loader';
import Swal from 'sweetalert2';



const columns = [
 { id: 'name', label: 'Name' },
 { id: 'emailId', label: 'Email Id' },
 { id: 'createdDate', label: 'Subscribed date' },
 { id: 'status', label: "Status" }
]

export default function SubscribedEmail() {
 const dispatch = useDispatch()
 const emailSubscriptionList = useSelector((state) => state.subscribedUser.SubscribedUser)
 const isUpdated = useSelector((state) => state.subscribedUser.SubscribedUserUpdated)

 useEffect(() => {
  if (isUpdated) {
   dispatch(GetAllSubscribedUser())
  }
 }, [isUpdated])

 useEffect(() => {
  dispatch(GetAllSubscribedUser())
 }, [])

 const handleDelete = (row) => {
  Swal.fire({
   title: "Are you sure?",
   text: "You want to unsubscribe?",
   icon: "warning",
   showCancelButton: true,
   confirmButtonColor: "#3085d6",
   cancelButtonColor: "#d33",
   confirmButtonText: "Yes, unsubscribe it!"
  }).then((result) => {
   if (result.isConfirmed) {
    Swal.fire({
     title: "Deleted!",
     text: "Your file has been deleted.",
     icon: "success"
    });
    dispatch(UnsubscribeUser(row.emailId))
   }
  });
 }

 return (
  <Grid container spacing={2}>
   <Grid item xs={12}>
    <Button variant="contained" color="primary">Send Email </Button>
   </Grid>
   <Grid item xs={12}>
    {emailSubscriptionList && emailSubscriptionList.length > 0 ?
     <ReusableTable disableEdit disableView columns={columns} data={emailSubscriptionList} onDelete={handleDelete} />
     :
     <Loader />
    }
   </Grid>
  </Grid>
 )
}