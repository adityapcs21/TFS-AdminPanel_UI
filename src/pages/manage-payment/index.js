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
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import * as XLSX from 'xlsx';
import jwtInterceptor from '../../helpers/jwtInterceptors'


const columns = [
  { id: 'razorPayOrderId', label: "Razor Pay OrderId" },
  { id: 'userId', label: "User Id" },
  { id: 'userName', label: 'User Name' },
  { id: 'amount', label: 'Amount' },
  { id: 'status', label: 'Status' },
  { id: 'actionName', label: "Payment Type" },
  { id: 'updatedDateMillis', label: "Payment Date" },
  { id: 'createdDateMillis', label: "Created Date" },
  { id: 'isGstRequired', label: 'GST Required' }
]

const columnFormats = {
  createdDateMillis: (value) => moment(value).format('DD-MM-YY HH:mm:ss'),
  updatedDateMillis: (value) => moment(value).format('DD-MM-YY HH:mm:ss'),
  isGstRequired: (value) => (value ? "YES" : "NO")
};

export default function ManagePayment() {
  const dispatch = useDispatch()
  const PaymentList = useSelector(state => state.managePayment.paymentDetails?.transactionList)
  const totalPages = useSelector(state => state.managePayment.paymentDetails?.size);
  const appliedFilters = useSelector(state => state.managePayment.appliedFilters);
  const isLoading = useSelector(state => state.managePayment.isLoading);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [openFilterModal, setOpenFilterModal] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0);
    let payload = {
      "userId": appliedFilters.userId,
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

  const handleFilter = (payload) => {
    let data = { ...payload }
    if (data.toDate === null || data.fromDate === null) {
      delete data["fromDate"];
      delete data["toDate"];
    } else {
      data.fromDate = moment(data.fromDate).format('DD-MM-YYYY');
      data.toDate = moment(data.toDate).format('DD-MM-YYYY');
    }
    if (Object.keys(data).length > 0) {
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



  const downloadExcel = async () => {
    let axiosConfig = {
      headers: {
        "Authorization": localStorage.getItem("tfstoken")
      }
    };
    let payload = {
      "userId": appliedFilters.userId,
      "paymentStatus": appliedFilters.paymentStatus,
      "actionName": appliedFilters.actionName,
      "fromDate": appliedFilters.fromDate,
      "toDate": appliedFilters.toDate,
    }
    const apiResponse = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}payments/getPaymentList`, payload, axiosConfig)
    if (apiResponse && apiResponse.data && apiResponse.data.transactionList?.length > 0) {
      const finalDate = await apiResponse.data.transactionList.map((record) => ({
        "Razor Pay OrderId": record.razorPayOrderId,
        "User Id": record.userId,
        "User Name": record.userName,
        "Amount": record.amount,
        "Status": record.status,
        "Payment Type": record.actionName,
        "Payment Date": moment(record.updatedDateMillis).format('DD-MM-YY HH:mm:ss'),
        "Created Date": moment(record.createdDateMillis).format('DD-MM-YY HH:mm:ss'),
        "GST Required": record.isGstRequired ? 'YES' : 'NO',
      }))
      const worksheet = XLSX.utils.json_to_sheet(finalDate);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "PaymentList.xlsx");
    }
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
      <Grid item xs={12} textAlign="end">
        <Button disabled={Object.keys(appliedFilters).length === 0} onClick={() => setOpenFilterModal(prevState => !prevState)} onClick={() => downloadExcel()} variant='contained' color='success' endIcon={<PictureAsPdfIcon />}>Export as PDF</Button>
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
                columnFormats={columnFormats}
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
