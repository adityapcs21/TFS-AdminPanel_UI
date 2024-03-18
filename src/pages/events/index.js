import { Box, Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReusableTable from '../../components/SharedComponent/ReusableTable'
import { useDispatch, useSelector } from 'react-redux'
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog'
import Loader from '../../common/loader'
import { DeleteEvent, GetAllEvents, GetEventDetails, eventIsLoading } from '../../redux/slice/events'
import CreateEvent from '../../components/Events/CreateEvents'
import Swal from 'sweetalert2'
import ViewEvent from '../../components/Events/ViewEvent'
import EditEvent from '../../components/Events/EditEvent'

const columns = [
  { id: 'eventName', label: "Event Name" },
  { id: 'eventDate', label: "Event Date" },
  // { id: 'eventStartTime', label: "Event Start Time" },
  // { id: 'eventEndTime', label: 'Event End Time' },
  // { id: 'registrationDeadLineDate', label: 'Registration Deadline' },
  // { id: 'createdBy', label: "Created By" },
  { id: 'description', label: "Description" },
  { id: 'location', label: "Location" },
  // { id: 'registrationLimit', label: "Maximum Registration" },
  // { id: 'currentRegistrations', label: "Current Registration" },
  { id: 'eventType', label: "Event Type" },
  { id: 'registrationFees', label: "Registration Fee" },
  // { id: 'attachments', label: "Attachments" }

]

export default function Events() {
  const dispatch = useDispatch()
  const EventList = useSelector(state => state.events.allEvents?.eventList)
  const eventIsUpdated = useSelector(state => state.events.newEventAdded)
  // const totalPages = useSelector(state => state.events.paymentDetails?.size);
  // const appliedFilters = useSelector(state => state.events.appliedFilters);
  const isLoading = useSelector(state => state.events.isLoading);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    let payload = {
      "pageNo": page + 1,
      "perPageResults": rowsPerPage
    }
    dispatch(eventIsLoading())
    dispatch(GetAllEvents(payload))
  }, [page, rowsPerPage])

  useEffect(() => {
    if (eventIsUpdated) {
      dispatch(GetAllEvents({
        "pageNo": 1,
        "perPageResults": rowsPerPage
      }))
    }
  }, [eventIsUpdated])

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleCreateEvent = () => {
    setOpenCreateModal(true)
  }

  const handleUpdateEvent = (id) => {
    dispatch(GetEventDetails(id.eventId))
      .then(() => {
        setShowEditModal(prevState => !prevState)
      })
  }

  const handleDeleteEvent = (id) => {
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

        dispatch(DeleteEvent(id.eventId))
          .then((response) => {
            if (response.payload && response.payload.message) {
              Swal.fire({
                title: "Not Deleted!",
                text: response.payload.message,
                icon: "error"
              });
            } else {
              Swal.fire({
                // title: "Deleted!",
                text: response.payload.data,
                icon: "success"
              });
            }
          })
      }
    });
  }
  const handleViewEvent = (row) => {
    dispatch(GetEventDetails(row.eventId))
      .then(() => {
        setShowViewModal(prevState => !prevState)
      })
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Button onClick={() => handleCreateEvent()} variant="contained" color="primary">Create Event </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {
          isLoading ?
            <Loader />
            :
            <ReusableTable
              columns={columns}
              data={EventList}
              onView={handleViewEvent}
              onDelete={handleDeleteEvent}
              onEdit={handleUpdateEvent}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              count={10}
            />
        }
      </Grid>

      <ReusbaleDialog maxWidth="lg" open={openCreateModal} onClose={() => setOpenCreateModal(prevState => !prevState)}>
        <CreateEvent onClose={() => setOpenCreateModal(prevState => !prevState)} />
      </ReusbaleDialog>
      <ReusbaleDialog maxWidth="md" open={showViewModal} onClose={() => setShowViewModal(prevState => !prevState)}>
        <ViewEvent onClose={() => setShowViewModal(prevState => !prevState)} />
      </ReusbaleDialog>
      <ReusbaleDialog maxWidth="lg" open={showEditModal} onClose={() => setShowEditModal(prevState => !prevState)}>
        <EditEvent onClose={() => setShowEditModal(prevState => !prevState)} />
      </ReusbaleDialog>
    </Grid>
  )
}
