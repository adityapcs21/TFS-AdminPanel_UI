import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllAssignments, GetBuddyActionsList, applyAssignBuddyFilters, buddyAssignmentIsLoading, clearAssignBuddyFilter } from '../../redux/slice/buddyAssignment'
import { Badge, Box, Button, Grid, Stack, Typography } from '@mui/material'
import ReusableTable from '../../components/SharedComponent/ReusableTable'
import { useState } from 'react'
import AddNewBuddy from '../../components/assign-buddy/AddNewBuddy'
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog'
import Loader from '../../common/loader'
import FilterAssignBuddy from '../../components/assign-buddy/FilterAssignBuddy'
import UserDetailsHistory from '../../components/assign-buddy/UserDetailsHistory'
import { GetStudentDetails } from '../../redux/slice/students'

const columns = [
  { id: 'studentId', label: "Student Id" },
  { id: 'buddyId', label: "Buddy Id" },
  { id: 'currentStatus', label: "Current Status" },
  { id: 'assignedBy', label: 'Assigned By' },
  { id: 'updatedDate', label: "Updated Date" },
  { id: 'firstName', label: "First Name" },
  { id: 'lastName', label: "Last Name" },
  { id: 'emailAddress', label: 'Email Id' },
  { id: 'mobileNumber', label: 'Mobile No.' },
  { id: 'subscriptionEndDate', label: "Subscription End Date" },
  { id: 'subscriptionType', label: "Subscription Type" },
]

export default function AssignBuddy() {
  const dispatch = useDispatch();

  const assignedUserList = useSelector(state => state.buddyAssignment?.AssignmentList.userAssignmentList);
  const totalSize = useSelector(state => state.buddyAssignment?.AssignmentList.size);
  const isLoading = useSelector(state => state.buddyAssignment.isLoading);
  const isUpdated = useSelector(state => state.buddyAssignment.ListUpdated);
  const appliedFilters = useSelector(state => state.buddyAssignment.AppliedFilters);

  const [addNewBuddy, setAddNewBuddy] = useState(false)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openUserDetails, setOpenUserDetails] = useState(false);
  console.log("assignedUserList", assignedUserList)

  useEffect(() => {
    dispatch(buddyAssignmentIsLoading())
    let payload = {
      "perPageResults": rowsPerPage,
      "pageNo": page + 1,
      "buddyId": appliedFilters?.buddyId,
      "userId": appliedFilters?.userId
    }
    dispatch(GetAllAssignments(payload))
  }, [page, rowsPerPage, appliedFilters])

  useEffect(() => {
    if (isUpdated) {
      dispatch(buddyAssignmentIsLoading())
      let payload = {
        "perPageResults": rowsPerPage,
        "pageNo": page + 1,
      }
      dispatch(GetAllAssignments(payload))
    }
  }, [isUpdated])

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClearFilter = () => {
    dispatch(clearAssignBuddyFilter())
  }

  const handleFilter = (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== null && value !== '')
    );
    setPage(0);
    setRowsPerPage(5)
    dispatch(buddyAssignmentIsLoading())
    dispatch(applyAssignBuddyFilters(filteredData))
    setOpenFilterModal(prevState => !prevState)
  };

  const handleView = (rowDetails) => {
    dispatch(buddyAssignmentIsLoading())
    dispatch(GetBuddyActionsList(rowDetails.studentId))
    dispatch(GetStudentDetails({ uniqueId: rowDetails.studentId }))
      .then((res) => {
        setOpenUserDetails(prevState => !prevState)
      })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Button onClick={() => setAddNewBuddy(prevState => !prevState)} variant="contained" color="primary">Add New Buddy </Button>
          <Badge badgeContent={Object.keys(appliedFilters).length} color="secondary">
            <Button onClick={() => setOpenFilterModal(prevState => !prevState)} variant="contained" color="primary">Filter </Button>
          </Badge>
          <Button onClick={() => handleClearFilter()} variant="contained" color="primary">Clear Filter </Button>

          <Stack direction="row" spacing={1} alignItems="center">
            {
              appliedFilters && Object.entries(appliedFilters).map(([key, val]) => (
                < Box key={key} sx={{ display: "flex" }}>
                  <Typography sx={{ fontSize: '12px' }}><strong>{key}:</strong></Typography>
                  <Typography sx={{ fontSize: '12px' }} >{val},</Typography>
                </Box>
              ))
            }
          </Stack>
        </Box>
      </Grid >
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', gap: '20px' }}>
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
              disableDelete={true}
              disableEdit={true}
              onView={handleView}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              count={totalSize || 0}
            />
        }
      </Grid>

      <ReusbaleDialog maxWidth="sm" open={addNewBuddy} onClose={() => setAddNewBuddy(prevState => !prevState)}>
        <AddNewBuddy onClose={() => setAddNewBuddy(false)} />
      </ReusbaleDialog>


      <ReusbaleDialog maxWidth="sm" open={openFilterModal} onClose={() => setOpenFilterModal(prevState => !prevState)}>
        <FilterAssignBuddy handleFilter={handleFilter} onClose={() => setOpenFilterModal(prevState => !prevState)} />
      </ReusbaleDialog>

      <ReusbaleDialog maxWidth="lg" open={openUserDetails} onClose={() => setOpenUserDetails(prevState => !prevState)}>
        <UserDetailsHistory onClose={() => setOpenUserDetails(prevState => !prevState)} />
      </ReusbaleDialog>

    </Grid>
  )
}
