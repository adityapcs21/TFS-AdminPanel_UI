import React, { useEffect } from 'react'
import ReusableTable from '../../components/SharedComponent/ReusableTable';
import { Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllSubscribedUser, SendEmailToEmailSubscribers, UnsubscribeUser, subscribedUserIsLoading } from '../../redux/slice/subscribedUser';
import Loader from '../../common/loader';
import Swal from 'sweetalert2';
import { useState } from 'react';
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog';
import { SendEmailToActiveSubscriptionUsers } from '../../redux/slice/students';
import SendEmailModal from '../../components/SharedComponent/SendEmailModal';
import NothingToShow from '../../components/SharedComponent/NothingToShow';



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
  const isLoading = useSelector((state) => state.subscribedUser.isLoading)

  const totalPages = useSelector((state) => state.subscribedUser.SubscribedUser?.size)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openEmailModal, setOpenEmailModal] = useState(false)


  useEffect(() => {
    if (isUpdated) {
      dispatch(subscribedUserIsLoading())
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
    dispatch(subscribedUserIsLoading())
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

  const onSubmit = (data) => {
    setOpenEmailModal(prevState => !prevState)
    Swal.fire({
      title: "Are you sure?",
      text: "You want to send email?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2c4c74",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, send it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(SendEmailToEmailSubscribers(data))
          .then((response) => {
            if (response.payload && response.payload.message) {
              Swal.fire({
                title: "Not Sent!",
                text: response.payload.message,
                icon: "error"
              });
            } else {
              Swal.fire({
                title: "Email Sent!",
                text: response.payload.data,
                icon: "success"
              });
            }
          })
      }
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button onClick={() => handleSendEmail()} variant="contained" color="primary">Send Email </Button>
      </Grid>
      <Grid item xs={12}>
        {!isLoading && emailSubscriptionList && emailSubscriptionList.length > 0 ?
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
          : isLoading ?
            <Loader />
            : <NothingToShow />
        }
      </Grid>
      <ReusbaleDialog maxWidth="md" open={openEmailModal} onClose={() => setOpenEmailModal(prevState => !prevState)}>
        <SendEmailModal onSubmit={onSubmit} onClose={() => setOpenEmailModal(prevState => !prevState)} />
      </ReusbaleDialog>
    </Grid>
  )
}