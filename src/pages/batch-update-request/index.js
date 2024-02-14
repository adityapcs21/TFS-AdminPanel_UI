import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReusableTable from '../../components/SharedComponent/ReusableTable'
import { useDispatch, useSelector } from 'react-redux'
import { BatchUpdateRequestList, StudentDataIsLoading } from '../../redux/slice/students';
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog';
import ApproveStudentModal from '../../components/students/ApproveStudentModal';
import Loader from '../../common/loader';

const columns = [
  { id: 'userName', label: 'Name' },
  { id: "batchNo", label: "Batch NO" },
  { id: 'subscriptionEndDate', label: 'Subscription EndDate' },
  { id: 'subscriptionStartDate', label: 'Subscription StartDate' },
  { id: 'price', label: 'Price' },
  { id: 'requestStatus', label: 'Request Status' },
  { id: 'approvedBy', label: 'Approved By' },

];

export default function BatchUpdateRequest() {
  const dispatch = useDispatch();
  const BatchUpdateList = useSelector((state) => state.students.BatchUpdateList?.userList);
  const ListSize = useSelector((state) => state.students.BatchUpdateList?.size);
  const isLoading = useSelector((state) => state.students.isLoading);
  const StudentsDataUpdated = useSelector(state => state.StudentsDataUpdated)

  console.log("Batc", BatchUpdateList)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [approvedData, setApprovedData] = useState({})


  useEffect(() => {
    let payload = {
      "requestId": "",
      "uniqueId": "",
      "requestStatus": "",//APPROVED,REJECTED,CANCELLED,FAILED,PENDING,SUBMITTED
      "pageNo": page + 1,
      "perPageResults": rowsPerPage
    }
    dispatch(StudentDataIsLoading());
    dispatch(BatchUpdateRequestList(payload))

  }, [page, rowsPerPage])

  useEffect(() => {
    if (StudentsDataUpdated) {
      let payload = {
        "requestId": "",
        "uniqueId": "",
        "requestStatus": "",//APPROVED,REJECTED,CANCELLED,FAILED,PENDING,SUBMITTED
        "pageNo": page + 1,
        "perPageResults": rowsPerPage
      }
      StudentDataIsLoading()
      dispatch(BatchUpdateRequestList(payload))
    }

  }, [StudentsDataUpdated])

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUpdate = (rows) => {
    console.log("rows", rows)
    setApprovedData(rows)
    setOpenApproveModal(prevState => !prevState)
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        {
          isLoading ?
            <Loader />
            :
            <ReusableTable
              columns={columns}
              data={BatchUpdateList}
              onEdit={handleUpdate}
              disableView
              disableDelete
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              count={ListSize}
            />

        }

      </Grid>

      {
        <ReusbaleDialog open={openApproveModal} close={() => setOpenApproveModal(prevState => !prevState)}>
          <ApproveStudentModal data={approvedData} onClose={() => setOpenApproveModal(prevState => !prevState)} />
        </ReusbaleDialog>
      }
    </Grid>
  )
}
