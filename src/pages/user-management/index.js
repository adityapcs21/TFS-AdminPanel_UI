import React, { useEffect, useState } from 'react'
import ReusableTable from '../../components/SharedComponent/ReusableTable';
import { Badge, Box, Button, Grid, Stack, Typography, IconButton, styled, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteAdminById, GetAllUserList, UnlockAdmin, manageAdminIsLoading } from '../../redux/slice/manageUser';
import Loader from '../../common/loader';
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog';
import CreateAdmin from '../../components/UserManagement/CreateAdmin';
import UpdateAdmin from '../../components/UserManagement/UpdateAdmin';
import Swal from 'sweetalert2';
import NothingToShow from '../../components/SharedComponent/NothingToShow';


const columns = [
  { id: 'name', label: 'Name' },
  { id: 'emailId', label: 'Email Id' },
  { id: 'group', label: 'Group' },
  { id: 'subgroup', label: 'Sub Group' },
  { id: 'userRole', label: 'User Role' },
  { id: 'updatedDate', label: 'Last Updated On' },
];

export default function UserManagement() {
  const dispatch = useDispatch()
  const manageUserData = useSelector((state) => state.manageUser.UserList?.userList)
  const isUserUpdated = useSelector((state) => state.manageUser.UserUpdated)
  const totalCount = useSelector((state) => state.manageUser.UserList?.size);
  const isLoading = useSelector((state) => state.manageUser.isLoading);
  const appliedFilters = {}

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editData, setEditData] = useState(false)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [openFilterModal, setOpenFilterModal] = useState(false)



  useEffect(() => {
    dispatch(manageAdminIsLoading())
    let payload = {
      "name": "",
      "emailId": "",
      "group": "",  //existing 
      "subgroup": "", //existing
      "userRole": "", //existing
      "pageNo": page + 1,
      "perPageResults": rowsPerPage
    }
    dispatch(GetAllUserList(payload))
  }, [page, rowsPerPage])

  useEffect(() => {
    if (isUserUpdated) {
      dispatch(manageAdminIsLoading())
      let payload = {
        "name": "",
        "emailId": "",
        "group": "",  //existing 
        "subgroup": "", //existing
        "userRole": "", //existing
        "pageNo": page + 1,
        "perPageResults": rowsPerPage
      }
      dispatch(GetAllUserList(payload))
    }
  }, [isUserUpdated])

  const handleDelete = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this?",
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
        dispatch(DeleteAdminById(row.emailId))
      }
    });
  }

  const handleEdit = (row) => {
    setEditData(row)
    setOpenEditModal(prevState => !prevState)
  }

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleFilter = (data) => {

    if (Object.keys(data).length > 0) {

      setPage(0);
      setRowsPerPage(5)

    }

  };

  const handleClearFilter = () => {
    // dispatch(ClearPaymentFilter())
  }



  const onUnlockAdmin = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to unlock this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2c4c74",
      cancelButtonColor: "#f36334",
      confirmButtonText: "Yes, unlock it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(UnlockAdmin(row.emailId))
          .then((res) => {
            console.log("=", res)
            if (res.payload) {
              Swal.fire({
                title: res?.payload.data === "success" ? 'success' : "Something Went Wrong!",
                text: res?.payload.data,
                icon: res?.payload.data === "success" ? 'success' : "warning"
              });
            }
          })


      }
    });
  }


  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack justifyContent="space-between" direction="row">
          <Button variant='contained' onClick={() => setOpenCreateModal(prevState => !prevState)}>Create User Admin</Button>
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
        </Stack>
      </Grid>
      <Grid item xs={12}>
        {
          !isLoading && manageUserData && manageUserData?.length > 0 ?
            <ReusableTable
              disableView
              columns={columns}
              data={manageUserData}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              count={totalCount}
              unlock
              handleUnlock={onUnlockAdmin}
            />
            : manageUserData?.length === 0 ?
              <NothingToShow />
              :
              <Loader />
        }
      </Grid>

      <ReusbaleDialog maxWidth="sm" open={openCreateModal} onClose={() => setOpenCreateModal(prevState => !prevState)}>
        <CreateAdmin onClose={() => setOpenCreateModal(prevState => !prevState)} />
      </ReusbaleDialog>

      <ReusbaleDialog maxWidth="md" open={openEditModal} onClose={() => setOpenEditModal(prevState => !prevState)}>
        <UpdateAdmin editData={editData} onClose={() => setOpenEditModal(prevState => !prevState)} />
      </ReusbaleDialog>

      <ReusbaleDialog maxWidth="sm" open={openFilterModal} onClose={() => setOpenFilterModal(prevState => !prevState)}>
        {/* <ManagePaymentFilters handleFilter={handleFilter} onClose={() => setOpenFilterModal(prevState => !prevState)} /> */}
      </ReusbaleDialog>
    </Grid>
  )
}

const IconContainer = styled(IconButton)({
  opacity: "0.9"
})