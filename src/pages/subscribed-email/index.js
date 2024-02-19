import React, { useEffect } from 'react'
import ReusableTable from '../../components/SharedComponent/ReusableTable';
import { Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllSubscribedUser, UnsubscribeUser } from '../../redux/slice/subscribedUser';
import Loader from '../../common/loader';
import Swal from 'sweetalert2';
import { useState } from 'react';
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog';
import SendEmailModal from '../../components/students/SendEmailModal';



const columns = [
  { id: 'name', label: 'Name' },
  { id: 'emailId', label: 'Email Id' },
  { id: 'createdDate', label: 'Subscribed date' },
  { id: 'status', label: "Status" }
]

export default function SubscribedEmail() {
  const dispatch = useDispatch()
  const emailSubscriptionList = useSelector((state) => state.subscribedUser.SubscribedUser?.emailSubscriptionList)
  const isUpdated = useSelector((state) => state.subscribedUser.SubscribedUserUpdated)
  const totalPages = useSelector((state) => state.subscribedUser.SubscribedUser?.size)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openEmailModal, setOpenEmailModal] = useState(false)


  useEffect(() => {
    if (isUpdated) {
      let payload = {
        "status": "",//ACTIVE or IN-ACTIVE
        "emailId": "",
        "name": "",
        "pageNo": page + 1,
        "perPageResults": rowsPerPage
      }
      dispatch(GetAllSubscribedUser(payload))
    }
  }, [isUpdated])

  useEffect(() => {
    let payload = {
      "status": "",//ACTIVE or IN-ACTIVE
      "emailId": "",
      "name": "",
      "pageNo": page + 1,
      "perPageResults": rowsPerPage
    }
    dispatch(GetAllSubscribedUser(payload))
  }, [page, rowsPerPage])

  const handleDelete = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to unsubscribe?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2c4c74",
      cancelButtonColor: "#f36334",
      confirmButtonText: "Yes, unsubscribe it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        dispatch(UnsubscribeUser(row.emailId))
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

  const handleSendEmail = () => {
    setOpenEmailModal(prevState => !prevState)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button onClick={() => handleSendEmail()} variant="contained" color="primary">Send Email </Button>
      </Grid>
      <Grid item xs={12}>
        {emailSubscriptionList && emailSubscriptionList.length > 0 ?
          <ReusableTable
            disableEdit
            disableView
            columns={columns}
            data={emailSubscriptionList}
            onDelete={handleDelete}
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
      <ReusbaleDialog maxWidth="md" open={openEmailModal} close={() => setOpenEmailModal(prevState => !prevState)}>
        <SendEmailModal onClose={() => setOpenEmailModal(prevState => !prevState)} />
      </ReusbaleDialog>
    </Grid>
  )
}