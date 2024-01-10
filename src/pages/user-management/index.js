import React, { useEffect } from 'react'
import ReusableTable from '../../components/SharedComponent/ReusableTable';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllSubscribedUser } from '../../redux/slice/manageUser';



const columns = [
  { id: 'name', label: 'Name' },
  { id: 'emailId', label: 'Email Id' },
  { id: 'subscribed', label: 'Subscribed' },
  { id: 'updatedDate', label: 'Updated date' },
];

export default function UserManagement() {
  const dispatch = useDispatch()
  const manageUserData = useSelector((state) => state.manageUser.SubscribedUser.emailSubscriptionList)
  console.log("manageUser", manageUserData)

  useEffect(() => {
    dispatch(GetAllSubscribedUser())
  }, [])

  const handleDelete = (id) => {

  }

  return (
    <Grid>
      <ReusableTable columns={columns} data={manageUserData} onDelete={handleDelete} />
    </Grid>
  )
}