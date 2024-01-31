import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import ReusableTable from '../../components/SharedComponent/ReusableTable'
import { useDispatch, useSelector } from 'react-redux'
import { GetCustomerQuery } from '../../redux/slice/customer-query';
import Loader from '../../common/loader';

// "queryId": "4ee09e62-018d-1000-a8de-15814bf4e77c",
// "name": "vishal",
// "emailId": "testing@gmail.com",
// "mobileNo": "9999999999",
// "subject": "subject",
// "message": "Test message",
// "createdDate": "28-01-2024",
// "subscribe": false

const columns = [
 { id: 'name', label: 'Name' },
 { id: "emailId", label: "Email ID" },
 { id: 'mobileNo', label: 'Mobile No.' },
 { id: 'subject', label: 'Subject' },
 { id: 'message', label: 'Message' },
 // { id: 'subscribe', label: 'Subscribe' },
];
export default function CustomerQuery() {
 const dispatch = useDispatch()
 const customerQueryData = useSelector((state) => state.customerQuery.data?.queryList)

 useEffect(() => {
  dispatch(GetCustomerQuery())
 }, [])
 return (
  <Grid container>
   {
    customerQueryData && customerQueryData.length > 0 ?
     <Grid item xs={12}>
      <ReusableTable
       columns={columns}
       data={customerQueryData}
       disableActionButton
      />
     </Grid>
     :
     <Grid xs={12}>
      <Loader />
     </Grid>
   }
  </Grid>
 )
}