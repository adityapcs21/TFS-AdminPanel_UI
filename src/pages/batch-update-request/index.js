import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReusableTable from '../../components/SharedComponent/ReusableTable'
import { useDispatch, useSelector } from 'react-redux'
import { BatchUpdateRequestList, StudentDataIsLoading } from '../../redux/slice/students';
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog';
import ApproveStudentModal from '../../components/students/ApproveStudentModal';
import Loader from '../../common/loader';
import NothingToShow from '../../components/SharedComponent/NothingToShow';
import moment from 'moment';

const columns = [
  { id: 'userName', label: 'Name' },
  { id: "batchNo", label: "Batch NO" },
  { id: "currentBatchNo", label: "Current Batch NO" },
  { id: 'createdDateMillis', label: 'Subscription StartDate' },
  { id: 'subscriptionEndDate', label: 'Subscription EndDate' },
  { id: 'price', label: 'Price' },
  { id: 'requestStatus', label: 'Request Status' },
  { id: 'approvedBy', label: 'Approved By' },
];

const columnFormats = {
  createdDateMillis: (value) => moment(value).format('DD-MM-YYYY'),
  // endDateMillis: (value) => moment(value).format('DD-MM-YY HH:mm:ss'),
};

export default function BatchUpdateRequest() {
  const dispatch = useDispatch();
  const BatchUpdateList = useSelector((state) => state.students.BatchUpdateList?.userList);
  const ListSize = useSelector((state) => state.students.BatchUpdateList?.size);
  const isLoading = useSelector((state) => state.students.isLoading);
  const StudentsDataUpdated = useSelector(state => state.students.StudentsDataUpdated)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [approvedData, setApprovedData] = useState({})


  useEffect(() => {
    window.scrollTo(0, 0);
    let payload = {
      "pageNo": page + 1,
      "perPageResults": rowsPerPage
    }
    dispatch(StudentDataIsLoading());
    dispatch(BatchUpdateRequestList(payload))

  }, [page, rowsPerPage])

  useEffect(() => {
    if (StudentsDataUpdated) {
      let payload = {
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
    setApprovedData(rows)
    setOpenApproveModal(prevState => !prevState)
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        {
          isLoading ?
            <Loader />
            : !isLoading && BatchUpdateList && BatchUpdateList.length === 0 ?
              <NothingToShow />
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
                columnFormats={columnFormats}

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
