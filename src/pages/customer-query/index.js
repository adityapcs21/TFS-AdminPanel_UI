import { Grid, Tooltip } from '@mui/material'
import React, { useEffect } from 'react'
import ReusableTable from '../../components/SharedComponent/ReusableTable'
import { useDispatch, useSelector } from 'react-redux'
import { GetCustomerQuery } from '../../redux/slice/customer-query';
import Loader from '../../common/loader';
import { useState } from 'react';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog';
import SendQueryResponse from '../../components/customer-query/SendQueryResponse';

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
  console.log("totalPages", totalPages)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false)
  const [queryId, setQueryId] = useState("")
  useEffect(() => {
    dispatch(GetCustomerQuery())
  }, [])

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSendResponse = (data) => {
    console.log(",datata", data)
    setQueryId(data.queryId)
    setOpenModal(!openModal)
  }

  return (
    <Grid container>
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
    </Grid>
  )
}
