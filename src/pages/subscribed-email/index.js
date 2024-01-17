import React, { useEffect } from 'react'
import ReusableTable from '../../components/SharedComponent/ReusableTable';
import { Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllUserList } from '../../redux/slice/manageUser';
import { GetAllSubscribedUser, UnsubscribeUser } from '../../redux/slice/subscribedUser';
import Loader from '../../common/loader';



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

 console.log("subscribed user", emailSubscriptionList)

 useEffect(() => {
  if (isUpdated) {
   dispatch(GetAllSubscribedUser())
  }
 }, [isUpdated])

 useEffect(() => {
  dispatch(GetAllSubscribedUser())
 }, [])

 const handleDelete = (row) => {
  dispatch(UnsubscribeUser(row.emailId))
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