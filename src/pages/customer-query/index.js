import { Badge, Box, Button, Grid, Stack, Tooltip, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import ReusableTable from '../../components/SharedComponent/ReusableTable'
import { useDispatch, useSelector } from 'react-redux'
import { ApplyFilters, GetCustomerQuery, queryIsLoading } from '../../redux/slice/customer-query';
import Loader from '../../common/loader';
import { useState } from 'react';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog';
import SendQueryResponse from '../../components/customer-query/SendQueryResponse';
import FilterCustomerQuery from '../../components/customer-query/FilterCustomerQuery';

const columns = [
  { id: 'name', label: 'Name' },
  { id: "emailId", label: "Email ID" },
  { id: 'mobileNo', label: 'Mobile No.' },
  { id: 'subject', label: 'Subject' },
  { id: 'message', label: 'Message' },
  // { id: 'subscribe', label: 'Subscribe' },
];
export default function CustomerQuery() {
  const dispatch = useDispatch()
  const customerQueryData = useSelector((state) => state.customerQuery.data?.queryList);
  const totalPages = useSelector((state) => state.customerQuery.data?.size);
  const appliedFilters = useSelector((state) => state.customerQuery.appliedFilters);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false)
  const [queryId, setQueryId] = useState("");
  const [openFilterModal, setOpenFilterModal] = useState(false);

  // useEffect(() => {
  //   dispatch(GetCustomerQuery())
  // }, []);


  useEffect(() => {
    dispatch(queryIsLoading())
    let payload = {
      "emailId": appliedFilters && appliedFilters.emailId,
      "name": appliedFilters && appliedFilters.name,
      "message": appliedFilters && appliedFilters.message,
      "subject": appliedFilters && appliedFilters.subject,
      "pageNo": page + 1,
      "perPageResults": rowsPerPage
    }
    dispatch(GetCustomerQuery(payload))
  }, [page, rowsPerPage, appliedFilters])

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSendResponse = (data) => {
    setQueryId(data.queryId)
    setOpenModal(!openModal)
  }

  const handleFilter = (data) => {
    if (Object.keys(data).length > 0) {
      dispatch(ApplyFilters(data))
      setPage(0);
      setRowsPerPage(5)
    }
  };

  const handleClearFilter = () => {
    // dispatch(GetCustomerQuery())
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack justifyContent="space-between" direction="row">
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Badge badgeContent={appliedFilters && Object.keys(appliedFilters).length} color="secondary">
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
      {
        customerQueryData && customerQueryData.length > 0 ?
          <Grid item xs={12}>
            <ReusableTable
              columns={columns}
              data={customerQueryData}
              // disableActionButton
              disableDelete
              disableEdit
              disableView
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              count={totalPages}
              CustomButton={
                <Tooltip title="Send">
                  <ForwardToInboxIcon />
                </Tooltip>
              }
              handleCustomButton={handleSendResponse}
            />
          </Grid>
          :
          <Grid xs={12}>
            <Loader />
          </Grid>
      }
      <ReusbaleDialog maxWidth="md" open={openModal} onClose={() => setOpenModal(prevState => !prevState)}>
        <SendQueryResponse queryId={queryId} onClose={() => setOpenModal(prevState => !prevState)} />
      </ReusbaleDialog>


      <ReusbaleDialog maxWidth="sm" open={openFilterModal} onClose={() => setOpenFilterModal(prevState => !prevState)}>
        <FilterCustomerQuery handleFilter={handleFilter} onClose={() => setOpenFilterModal(prevState => !prevState)} />
      </ReusbaleDialog>
    </Grid>
  )
}
