import React, { useEffect, useState } from 'react'
import ReusableTable from '../../components/SharedComponent/ReusableTable';
import { Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllSubscribedUser } from '../../redux/slice/subscribedUser';
import { DeleteAdminById, GetAllUserList } from '../../redux/slice/manageUser';
import Loader from '../../common/loader';
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog';
import CreateAdmin from '../../components/UserManagement/CreateAdmin';
import UpdateAdmin from '../../components/UserManagement/UpdateAdmin';

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'emailId', label: 'Email Id' },
  { id: 'userRole', label: 'User Role' },
  { id: 'group', label: 'Group' },
  { id: 'subgroup', label: 'Sub Group' },
  // { id: "deleted", label: "Deleted" },
  { id: 'updatedDate', label: 'Last Updated On' },
];

export default function UserManagement() {
  const dispatch = useDispatch()
  const manageUserData = useSelector((state) => state.manageUser.UserList)
  const isUserUpdated = useSelector((state) => state.manageUser.UserUpdated)

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editData, setEditData] = useState(false)

  useEffect(() => {
    dispatch(GetAllUserList())
  }, [])

  useEffect(() => {
    if (isUserUpdated) {
      dispatch(GetAllUserList())
    }
  }, [isUserUpdated])

  const handleDelete = (row) => {
    dispatch(DeleteAdminById(row.emailId))
  }

  const handleEdit = (row) => {
    setEditData(row)
    setOpenEditModal(prevState => !prevState)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button variant='contained' onClick={() => setOpenCreateModal(prevState => !prevState)}>Create User Admin</Button>
      </Grid>
      <Grid item xs={12}>
        {
          manageUserData && manageUserData.length > 0 ?
            <ReusableTable disableView columns={columns} data={manageUserData} onDelete={handleDelete} onEdit={handleEdit} />
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
    </Grid>
  )
}