import { Box, Button, Grid, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReusableTable from '../../components/SharedComponent/ReusableTable'
import { useDispatch, useSelector } from 'react-redux'
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog';
import Loader from '../../common/loader';
import { DeleteBatch, GetAllBatches, batchIsLoading } from '../../redux/slice/batch';
import Swal from 'sweetalert2';
import CreateBatchModal from '../../components/batch/AddBatch';
import UpdateBatchModal from '../../components/batch/UpdateBatch';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import SendEmailUpdate from '../../components/batch/SendEmailUpdate';

const columns = [
  { id: 'id', label: 'Batch No.' },
  { id: "startDate", label: "Start Date" },
  { id: "endDate", label: "End Date" },
];

export default function Batch() {
  const dispatch = useDispatch();
  const BatchList = useSelector((state) => state.batch.batchList?.batchList);
  const isLoading = useSelector((state) => state.batch.isLoading);
  const ListSize = useSelector((state) => state.batch.batchList?.size)
  const BatchUpdated = useSelector((state) => state.batch.batchIsUpdated)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOPenUpdateModal] = useState(false)
  const [batchData, setBatchData] = useState({})
  const [openEmailModal, setOpenEmailModal] = useState(false)
  const [batchId, setBatchId] = useState();

  useEffect(() => {
    let payload = {
      "pageNo": page + 1,
      "perPageResults": rowsPerPage
    }
    dispatch(batchIsLoading());
    dispatch(GetAllBatches(payload)).then((response) => {
      if (response && response.error && response.error.mesage === "Rejected") {
        Swal.fire("SweetAlert2 is working!");
      }
    })

  }, [page, rowsPerPage])

  useEffect(() => {
    if (BatchUpdated) {
      let payload = {
        // "status": "ACTIVE", //IN-ACTIVE
        "pageNo": page + 1,
        "perPageResults": rowsPerPage
      }
      dispatch(batchIsLoading());
      dispatch(GetAllBatches(payload)).then((response) => {
        if (response && response.error && response.error.mesage === "Rejected") {
          Swal.fire("SweetAlert2 is working!");
        }
      })
    }

  }, [BatchUpdated])

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUpdate = (rows) => {
    setBatchData(rows)
    setOPenUpdateModal(prevState => !prevState)
  }

  const AddNewBatch = () => {
    setOpenCreateModal(prevState => !prevState)
  }

  const handleDelete = (row) => {
    dispatch(DeleteBatch(row.id))
  }

  const handleSendEmail = () => {
    setOpenEmailModal(true)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} >
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Button onClick={() => AddNewBatch()} variant="contained" color="primary">Add Batch</Button>
          <Button onClick={() => handleSendEmail()} variant="contained" color="primary">Send Email</Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {
          isLoading ?
            <Loader />
            :
            <ReusableTable
              columns={columns}
              data={BatchList}
              onEdit={handleUpdate}
              disableView
              onDelete={handleDelete}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              count={ListSize || 1}
            />
        }

      </Grid>

      <ReusbaleDialog open={openCreateModal} close={() => setOpenCreateModal(prevState => !prevState)}>
        <CreateBatchModal onClose={() => setOpenCreateModal(prevState => !prevState)} />
      </ReusbaleDialog>

      <ReusbaleDialog open={openUpdateModal} close={() => setOPenUpdateModal(prevState => !prevState)}>
        <UpdateBatchModal data={batchData} onClose={() => setOPenUpdateModal(prevState => !prevState)} />
      </ReusbaleDialog>

      <ReusbaleDialog maxWidth="md" open={openEmailModal} onClose={() => setOpenEmailModal(prevState => !prevState)}>
        <SendEmailUpdate onClose={() => setOpenEmailModal(prevState => !prevState)} />
      </ReusbaleDialog>

    </Grid>
  )
}
