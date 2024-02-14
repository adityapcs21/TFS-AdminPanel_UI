import React, { useEffect } from 'react'
import ReusableTable from '../../components/SharedComponent/ReusableTable';
import { Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../common/loader';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { GetAllStudentsList, deleteStudent } from '../../redux/slice/students';
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog';
import UpdateStudent from '../../components/students/EditStudent';
import ViewStudent from '../../components/students/ViewStudent';


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
  { id: 'status', label: "Status" },
  { id: 'incorrectPasswordCount', label: "Incorrect Password Count" },
]

export default function Students() {
  const dispatch = useDispatch()
  const StudentData = useSelector((state) => state.students.StudentList?.userList)
  const isUpdated = useSelector((state) => state.students.StudentsDataUpdated)
  const totalPages = useSelector((state) => state.students.StudentList?.size);
  const isLoading = useSelector((state) => state.students.isLoading);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [editData, setEditData] = useState({})


  useEffect(() => {
    if (isUpdated) {
      let payload = {
        "pageNo": page + 1,
        "perPageResults": rowsPerPage,
        "status": "", //"ACTIVE", "IN-ACTIVE"
        "uniqueId": "",
        "emailId": "",
        "mobileNo": "",
        "firstName": "",
        "lastName": "",
        "batchNo": "",
        "subscriptionType": "", // Annual, Half Yearly
        "subscriptionStatus": "", //"ACTIVE", "IN-ACTIVE",
        "renewalDue": "",//"YES" or blank,
        "subscriptionEndDateFrom": "",// "09-02-2024"
        "subscriptionEndDateTo": ""
      }
      dispatch(GetAllStudentsList(payload))
    }
  }, [isUpdated])

  useEffect(() => {
    let payload = {
      "pageNo": page + 1,
      "perPageResults": rowsPerPage,
      "status": "", //"ACTIVE", "IN-ACTIVE"
      "uniqueId": "",
      "emailId": "",
      "mobileNo": "",
      "firstName": "",
      "lastName": "",
      "batchNo": "",
      "subscriptionType": "", // Annual, Half Yearly
      "subscriptionStatus": "", //"ACTIVE", "IN-ACTIVE",
      "renewalDue": "",//"YES" or blank,
      "subscriptionEndDateFrom": "",// "09-02-2024"
      "subscriptionEndDateTo": ""
    }
    dispatch(GetAllStudentsList(payload))
  }, [page, rowsPerPage])

  const handleDelete = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
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
    setOpenViewModal(data)
    setOpenViewModal(true)
  }

  const handleEdit = (data) => {
    setEditData(data)
    setOpenEditModal(true)
  }

  return (
    <Grid container spacing={2}>
      {/* <Grid item xs={12}>
        <Button variant="contained" color="primary">Send Email </Button>
      </Grid> */}
      <Grid item xs={12}>
        {!isLoading && StudentData && StudentData.length > 0 ?
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
          <Loader />
        }
      </Grid>

      <ReusbaleDialog maxWidth="md" open={openEditModal} onClose={() => setOpenEditModal(prevState => !prevState)}>
        <UpdateStudent editData={editData} onClose={() => setOpenEditModal(prevState => !prevState)} />
      </ReusbaleDialog>


      <ReusbaleDialog maxWidth="md" open={openViewModal} onClose={() => setOpenViewModal(prevState => !prevState)}>
        <ViewStudent data={editData} onClose={() => setOpenViewModal(prevState => !prevState)} />
      </ReusbaleDialog>
    </Grid>
  )
}