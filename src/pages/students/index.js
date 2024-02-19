import React, { useEffect } from 'react'
import ReusableTable from '../../components/SharedComponent/ReusableTable';
import { Badge, Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../common/loader';
import Swal from 'sweetalert2';
import { useState } from 'react';
import students, { GetAllStudentsList, GetStudentDetails, StudentDataIsLoading, applyStudentFilter, clearStudentFilter, deleteStudent } from '../../redux/slice/students';
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog';
import UpdateStudent from '../../components/students/EditStudent';
import ViewStudent from '../../components/students/ViewStudent';
import FilterStudents from '../../components/students/FilterStudents';
import moment from 'moment';


const columns = [
  { id: 'firstName', label: "First Name" },
  { id: 'lastName', label: "Last Name" },
  { id: 'emailAddress', label: 'Email Id' },
  { id: 'mobileNumber', label: 'Mobile Number' },
  { id: 'batchNo', label: "Batch No." },
  { id: 'subscriptionEndDate', label: "Subscription End Date" },
  { id: 'subscriptionType', label: "Subscription Type" },
  { id: 'lastLoginDate', label: "Last Login Date" },
  { id: 'lastChangePasswordDate', label: "Last Password Change" },
  // { id: 'status', label: "Status" },
  // { id: 'incorrectPasswordCount', label: "Incorrect Password Count" },
]

export default function Students() {
  const dispatch = useDispatch()
  const StudentData = useSelector((state) => state.students.StudentList?.userList)
  const isUpdated = useSelector((state) => state.students.StudentsDataUpdated)
  const totalPages = useSelector((state) => state.students.StudentList?.size);
  const isLoading = useSelector((state) => state.students.isLoading);
  const appliedFilters = useSelector((state) => state.students.AppliedFilters);

  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem("userDetails")));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [viewData, setViewData] = useState({})
  const [openFilterModal, setOpenFilterModal] = useState(false)

  // useEffect(() => {
  //   if (isUpdated) {
  //     let payload = {
  //       "pageNo": page + 1,
  //       "perPageResults": rowsPerPage,
  //       "status": "", //"ACTIVE", "IN-ACTIVE"
  //       "uniqueId": "",
  //       "emailId": "",
  //       "mobileNo": "",
  //       "firstName": "",
  //       "lastName": "",
  //       "batchNo": "",
  //       "subscriptionType": "", // Annual, Half Yearly
  //       "subscriptionStatus": "", //"ACTIVE", "IN-ACTIVE",
  //       "renewalDue": "",//"YES" or blank,
  //       "subscriptionEndDateFrom": "",// "09-02-2024"
  //       "subscriptionEndDateTo": ""
  //     }
  //     dispatch(GetAllStudentsList(payload))
  //   }
  // }, [isUpdated])

  useEffect(() => {

    let payload = {
      "pageNo": page + 1,
      "perPageResults": rowsPerPage,
      "status": appliedFilters.status,
      "search": appliedFilters?.search,
      "batchNo": appliedFilters?.batchNo,
      "subscriptionType": appliedFilters.subscriptionType,
      "subscriptionStatus": appliedFilters.subscriptionStatus,
      "renewalDue": appliedFilters?.renewalDue,
      "subscriptionEndDateFrom": appliedFilters.subscriptionEndDateFrom,
      "subscriptionEndDateTo": appliedFilters.subscriptionEndDateTo
    }

    dispatch(GetAllStudentsList(payload))
  }, [page, rowsPerPage, isUpdated, appliedFilters])

  const handleDelete = (row) => {
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
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        dispatch(deleteStudent(row.uniqueId))
      }
    });
  }

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = (data) => {
    dispatch(StudentDataIsLoading())
    console.log(data)
    // setViewData(data)
    let payload = {
      uniqueId: data.uniqueId
    }
    dispatch(GetStudentDetails(payload))
      .then((res) => {
        setOpenViewModal(true)
      })
  }

  const handleEdit = (data) => {
    dispatch(StudentDataIsLoading())
    let payload = {
      uniqueId: data.uniqueId
    }
    dispatch(GetStudentDetails(payload))
      .then((res) => {
        setOpenEditModal(true)
      })
  }

  const handleFilter = (data) => {
    // Handle form submission
    if (data.subscriptionEndDateFrom && data.subscriptionEndDateFrom) {
      data.subscriptionEndDateFrom = moment(data.subscriptionEndDateFrom).format('DD-MM-YYYY');
      data.subscriptionEndDateTo = moment(data.subscriptionEndDateTo).format('DD-MM-YYYY');
    }
    setPage(0);
    setRowsPerPage(5)
    dispatch(StudentDataIsLoading())
    dispatch(applyStudentFilter(data))
    setOpenFilterModal(prevState => !prevState)
  };

  const handleClearFilter = () => {
    dispatch(clearStudentFilter())
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', gap: '20px' }}>
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
        {!isLoading && StudentData && StudentData.length > 0 ?

          userDetails.role === "SUPER USER" ?
            <ReusableTable
              columns={columns}
              data={StudentData}
              onDelete={handleDelete}
              onView={handleView}
              onEdit={handleEdit}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              count={totalPages}
            />
            :
            <ReusableTable
              columns={columns}
              data={StudentData}
              disableDelete
              disableEdit
              onView={handleView}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              count={totalPages}
            />
          :
          StudentData && StudentData.length === 0 ?
            <Grid item xs={12} sx={{ minHeight: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant='h5'>No Record found</Typography>
            </Grid>
            :
            <Loader />
        }
      </Grid>

      <ReusbaleDialog maxWidth="md" open={openEditModal} onClose={() => setOpenEditModal(prevState => !prevState)}>
        <UpdateStudent editData={editData} onClose={() => setOpenEditModal(prevState => !prevState)} />
      </ReusbaleDialog>


      <ReusbaleDialog maxWidth="md" open={openViewModal} onClose={() => setOpenViewModal(prevState => !prevState)}>
        <ViewStudent onClose={() => setOpenViewModal(prevState => !prevState)} />
      </ReusbaleDialog>

      <ReusbaleDialog maxWidth="sm" open={openFilterModal} onClose={() => setOpenFilterModal(prevState => !prevState)}>
        <FilterStudents handleFilter={handleFilter} onClose={() => setOpenFilterModal(prevState => !prevState)} />
      </ReusbaleDialog>
    </Grid >
  )
}