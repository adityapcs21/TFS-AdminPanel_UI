import { Badge, Box, Button, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReusableTable from '../../components/SharedComponent/ReusableTable'
import { useDispatch, useSelector } from 'react-redux'
import { ApplyFilters, ClearPaymentFilter, GetPaymentList, ManagePaymentIsLoading } from '../../redux/slice/managePayment'
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog'
import ManagePaymentFilters from '../../components/managePayment/ManagePaymentFilter'
import moment from 'moment'
import Loader from '../../common/loader'
import NothingToShow from '../../components/SharedComponent/NothingToShow'

const columns = [
  { id: 'transactionId', label: "Transaction Id" },
  { id: 'razorPayOrderId', label: "Razor Pay OrderId" },
  { id: 'userId', label: "User Id" },
  { id: 'amount', label: 'Amount' },
  { id: 'status', label: 'Status' },
  { id: 'action', label: "Payment Type" },
  { id: 'updateddDate', label: "Updated Date" },
  { id: 'createdDate', label: "Created Date" },
]

export default function ManagePayment() {
  const dispatch = useDispatch()
  const PaymentList = useSelector(state => state.managePayment.paymentDetails?.transactionList)
  const totalPages = useSelector(state => state.managePayment.paymentDetails?.size);
  const appliedFilters = useSelector(state => state.managePayment.appliedFilters);
  const isLoading = useSelector(state => state.managePayment.isLoading);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [openFilterModal, setOpenFilterModal] = useState(false)

  useEffect(() => {
    let payload = {
      // "userId": "10011",
      "paymentStatus": appliedFilters.paymentStatus,
      "actionName": appliedFilters.actionName,
      "fromDate": appliedFilters.fromDate,
      "toDate": appliedFilters.toDate,
      "pageNo": page + 1,
      "perPageResults": rowsPerPage
    }
    dispatch(ManagePaymentIsLoading())
    dispatch(GetPaymentList(payload))
  }, [page, rowsPerPage, appliedFilters])

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilter = (data) => {

    if (data.toDate === null || data.fromDate === null) {
      delete data["fromDate"];
      delete data["toDate"];
    } else {
      data.fromDate = moment(data.fromDate).format('DD-MM-YYYY');
      data.toDate = moment(data.toDate).format('DD-MM-YYYY');

    }
    if (Object.keys(data).length > 0) {
      console.log("data", data)
      setPage(0);
      setRowsPerPage(5)
      dispatch(ManagePaymentIsLoading())
      dispatch(ApplyFilters(data))
      setOpenFilterModal(prevState => !prevState)
    }

  };

  const handleClearFilter = () => {
    dispatch(ClearPaymentFilter())
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
      </Grid>
      <Grid item xs={12}>
        {
          isLoading ?
            <Loader />
            :
            !isLoading && PaymentList && PaymentList.length > 0 ?
              <ReusableTable
                columns={columns}
                data={PaymentList}
                disableActionButton
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                page={page}
                rowsPerPage={rowsPerPage}
                count={totalPages}
              />
              :
              <NothingToShow />
        }
      </Grid>

      <ReusbaleDialog maxWidth="sm" open={openFilterModal} onClose={() => setOpenFilterModal(prevState => !prevState)}>
        <ManagePaymentFilters handleFilter={handleFilter} onClose={() => setOpenFilterModal(prevState => !prevState)} />
      </ReusbaleDialog>
    </Grid>
  )
}
