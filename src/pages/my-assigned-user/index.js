import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetBuddyActionsList, GetMyAssignedUsers } from '../../redux/slice/buddyAssignment'
import { Box, Button, Grid, IconButton } from '@mui/material'
import ReusableTable from '../../components/SharedComponent/ReusableTable'
import { useState } from 'react'
import AddNewBuddy from '../../components/assign-buddy/AddNewBuddy'
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog'
import { CloseOutlined } from '@mui/icons-material'
import ActionOfStudents from '../../components/my-asignedUser/actionOfStudents'
import { GetAllStudentsList, GetStudentDetails } from '../../redux/slice/students'

const columns = [
  { id: 'studentId', label: "Student Id" },
  // { id: 'buddyId', label: "Buddy Id" },
  { id: 'currentStatus', label: "Current Status" },
  { id: 'assignedBy', label: 'Assigned By' },
  { id: 'createdDate', label: 'Created Date' },
  { id: 'updatedDate', label: "Updated Date" },
]

export default function MyAssignedUser() {
  const dispatch = useDispatch();

  const assignedUserList = useSelector(state => state.buddyAssignment.AssignedUserList?.userAssignmentList);
  const ListUpdated = useSelector(state => state.buddyAssignment.ListUpdated);

  const [showActionOfStudent, setShowActionOfStudent] = useState(false)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);



  useEffect(() => {
    let payload = {
      "perPageResults": rowsPerPage,
      "pageNo": page + 1
    }
    dispatch(GetMyAssignedUsers(payload))
  }, [page, rowsPerPage, ListUpdated])

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = (rowDetails) => {
    dispatch(GetBuddyActionsList(rowDetails.studentId))
    dispatch(GetStudentDetails({ uniqueId: rowDetails.studentId }))
      .then((res) => {
        setShowActionOfStudent(prevState => !prevState)
      })
  }

  // const customActionButton = (rowDetails) => {
  //   return (
  //     <Box>
  //       <IconButton onClick={() => ViewStudentActions(rowDetails)}>
  //         <CloseOutlined />
  //       </IconButton >
  //     </Box>
  //   )
  // }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ReusableTable
          columns={columns}
          data={assignedUserList}
          // disableActionButton
          disableDelete
          disableEdit
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          count={10}
          onView={handleView}
        />
      </Grid>

      <ReusbaleDialog maxWidth="lg" open={showActionOfStudent} onClose={() => setShowActionOfStudent(prevState => !prevState)}>
        <ActionOfStudents onClose={() => setShowActionOfStudent(prevState => !prevState)} />
      </ReusbaleDialog>
    </Grid>
  )
}
