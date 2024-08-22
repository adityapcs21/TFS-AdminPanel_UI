import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Typography } from '@mui/material'
import ReusableTable from '../../components/SharedComponent/ReusableTable'
import { useState } from 'react'
import Loader from '../../common/loader'
import { GetAllStudentsList, StudentDataIsLoading } from '../../redux/slice/students'
import moment from 'moment'

const columns = [
 { id: 'firstName', label: "First Name" },
 { id: 'lastName', label: "Last Name" },
 { id: 'mobileNumber', label: 'Mobile Number' },
 { id: 'createdDateMillis', label: 'Created Date' },
 { id: 'emailAddress', label: "Email Id" },
 { id: 'referenceNo', label: 'Reference No' }
]

const columnFormats = {
  createdDateMillis: (value) => moment(value).format('DD-MM-YY HH:mm:ss'),
};

export default function PendingPayment() {
 const dispatch = useDispatch();
 const StudentData = useSelector((state) => state.students.StudentList?.userList)
 const totalPages = useSelector(state => state.students?.StudentList.size);
 const isLoading = useSelector(state => state.students.isLoading);

 const [page, setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(6);


 useEffect(() => {
  dispatch(StudentDataIsLoading())
  let payload = {
   "perPageResults": rowsPerPage,
   "pageNo": page + 1,
   "pendingInitialPayment": "YES"
  }
  dispatch(GetAllStudentsList(payload))
 }, [page, rowsPerPage])

 const handleChangePage = (_, newPage) => {
  setPage(newPage);
 };

 const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
 };

 return (
  <Grid container spacing={2}>
   <Grid item xs={12}>
    <Typography variant='h6'>Student Payment Pending List</Typography>
   </Grid>
   <Grid item xs={12}>
    {
     isLoading ?
      <Loader />
      :
      <ReusableTable
       columns={columns}
       data={StudentData}
       disableActionButton
       onPageChange={handleChangePage}
       onRowsPerPageChange={handleChangeRowsPerPage}
       page={page}
       rowsPerPage={rowsPerPage}
       count={totalPages || 0}
       columnFormats={columnFormats}
      />
    }
   </Grid>
  </Grid>
 )
}
