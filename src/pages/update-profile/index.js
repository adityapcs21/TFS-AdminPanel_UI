import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReusableTable from '../../components/SharedComponent/ReusableTable'
import { useDispatch, useSelector } from 'react-redux'
import { ProfileUpdateRequestList, StudentDataIsLoading } from '../../redux/slice/students';
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog';
import Loader from '../../common/loader';
import ApproveProfileUpdate from '../../components/students/ApproveProfileUpdate';
const columns = [
 { id: 'firstName', label: "First Name" },
 { id: 'lastName', label: "Last Name" },
 { id: 'emailAddress', label: 'Email Id' },
 { id: 'mobileNumber', label: 'Mobile Number' },
 { id: 'approvedBy', label: "Approved By" },
 { id: 'updatedDate', label: "Updated On" },
 { id: 'requestStatus', label: "Request Status" },

]

export default function UpdateProfile() {
 const dispatch = useDispatch();
 const profileUpdateRequestList = useSelector((state) => state.students.ProfileUpdateRequestList?.userList || []);
 const ListSize = useSelector((state) => state.students.ProfileUpdateRequestList?.size);
 const isLoading = useSelector((state) => state.students.isLoading);
 const StudentsDataUpdated = useSelector(state => state.StudentsDataUpdated)

 const [page, setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(5);
 const [openApproveModal, setOpenApproveModal] = useState(false);
 const [approvedData, setApprovedData] = useState({});
 const [userData, setUserData] = useState([])


 useEffect(() => {
  let payload = {
   "requestId": "",
   "uniqueId": "",
   "requestStatus": "",
   "pageNo": page + 1,
   "perPageResults": rowsPerPage
  }
  dispatch(StudentDataIsLoading());
  dispatch(ProfileUpdateRequestList(payload))

 }, [page, rowsPerPage])

 useEffect(() => {
  if (StudentsDataUpdated) {
   let payload = {
    "requestId": "",
    "uniqueId": "",
    "requestStatus": "",
    "pageNo": page + 1,
    "perPageResults": rowsPerPage
   }
   StudentDataIsLoading()
   dispatch(ProfileUpdateRequestList(payload))
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
       data={profileUpdateRequestList}
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
    <ReusbaleDialog maxWidth="lg" open={openApproveModal} close={() => setOpenApproveModal(prevState => !prevState)}>
     <ApproveProfileUpdate data={approvedData} onClose={() => setOpenApproveModal(prevState => !prevState)} />
    </ReusbaleDialog>
   }
  </Grid>
 )
}
