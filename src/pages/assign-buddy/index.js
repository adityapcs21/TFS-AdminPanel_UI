import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllAssignments, buddyAssignmentIsLoading } from '../../redux/slice/buddyAssignment'
import { Box, Button, Grid } from '@mui/material'
import ReusableTable from '../../components/SharedComponent/ReusableTable'
import { useState } from 'react'
import AddNewBuddy from '../../components/assign-buddy/AddNewBuddy'
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog'
import Loader from '../../common/loader'

const columns = [
  { id: 'studentId', label: "Student Id" },
  { id: 'buddyId', label: "Buddy Id" },
  { id: 'currentStatus', label: "Current Status" },
  { id: 'assignedBy', label: 'Assigned By' },
  { id: 'createdDate', label: 'Created Date' },
  { id: 'updatedDate', label: "Updated Date" },
]

export default function AssignBuddy() {
  const dispatch = useDispatch();

  const assignedUserList = useSelector(state => state.buddyAssignment?.AssignmentList.userAssignmentList);
  const totalSize = useSelector(state => state.buddyAssignment?.AssignmentList.size);
  const isLoading = useSelector(state => state.buddyAssignment.isLoading);

  const [addNewBuddy, setAddNewBuddy] = useState(false)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  useEffect(() => {
    dispatch(buddyAssignmentIsLoading())
    let payload = {
      "perPageResults": rowsPerPage,
      "pageNo": page + 1,
      "buddyId": "",
      "userId": "" //or blank or null
    }
    dispatch(GetAllAssignments(payload))
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
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Button onClick={() => setAddNewBuddy(prevState => !prevState)} variant="contained" color="primary">Add New Buddy </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {
          isLoading ?
            <Loader />
            :
            <ReusableTable
              columns={columns}
              data={assignedUserList}
              disableActionButton
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              count={totalSize}
            />
        }
      </Grid>

      <ReusbaleDialog maxWidth="sm" open={addNewBuddy} onClose={() => setAddNewBuddy(prevState => !prevState)}>
        <AddNewBuddy onClose={() => setAddNewBuddy(prevState => !prevState)} />
      </ReusbaleDialog>
    </Grid>
  )
}
