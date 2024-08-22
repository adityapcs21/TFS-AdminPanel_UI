import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReusableTable from '../../components/SharedComponent/ReusableTable'
import { useDispatch, useSelector } from 'react-redux'
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog';
import Loader from '../../common/loader';
import Swal from 'sweetalert2';
import { GetAllPendingKYCList, activePendingId, kycListIsLoading } from '../../redux/slice/kyc';
import { useNavigate } from 'react-router-dom';
import routeNames from '../../router/routeNames';
import NoDataFound from '../../components/SharedComponent/NoDataFound';
import moment from 'moment';

const columns = [
  { id: 'emailAddress', label: 'Email' },
  { id: "mobileNumber", label: "Mobile No" },
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "subscriptionType", label: "Subscription Type" },
  { id: "dob", label: "DOB" },
  { id: "fatherOrSpouseName", label: "Parent Name" },
  { id: "permanentAddress", label: "P. Address" },
  { id: "currentAddress", label: "Current Address" },
  { id: "referralName", label: "Referral Name" },
  { id: "telegramUserName", label: "DOB" },
  { id: "createdDateMillis", label: "Created Date" },
  { id: "updatedDateMillis", label: "Updated Date" },
];
const columnFormats = {
  createdDateMillis: (value) => moment(value).format('DD-MM-YY HH:mm:ss'),
  updatedDateMillis: (value) => moment(value).format('DD-MM-YY HH:mm:ss'),
};

export default function KYCApproval() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const KYCList = useSelector(state => state.kyc.allKycList?.userList);
  const KYCList1 = useSelector(state => state.kyc);

  console.log("KYCList", KYCList1)
  const isLoading = useSelector((state) => state.kyc.isLoading);
  const ListSize = useSelector((state) => state.kyc.allKycList?.size)
  const KYCIsUpdated = useSelector((state) => state.kyc.kycUpdated)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openUpdateModal, setOPenUpdateModal] = useState(false)
  const [testimonialData, setTestimonialData] = useState({})

  useEffect(() => {
    let payload = {
      "pageNo": page + 1,
      "perPageResults": rowsPerPage
    }
    dispatch(kycListIsLoading());
    dispatch(GetAllPendingKYCList(payload)).then((response) => {
      if (response && response.error && response.error.mesage === "Rejected") {
        Swal.fire("SweetAlert2 is working!");
      }
    })

  }, [page, rowsPerPage])

  useEffect(() => {
    if (KYCIsUpdated) {
      let payload = {
        // "status": "ACTIVE", //IN-ACTIVE
        "pageNo": page + 1,
        "perPageResults": rowsPerPage
      }
      dispatch(kycListIsLoading());
      dispatch(GetAllPendingKYCList(payload)).then((response) => {
        if (response && response.error && response.error.mesage === "Rejected") {
          Swal.fire("SweetAlert2 is working!");
        }
      })
    }

  }, [KYCIsUpdated])

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUpdate = (rows) => {
    setTestimonialData(rows)
    navigate(`/kyc/pending/${rows.uniqueId}`)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {
          isLoading ?
            <Loader />
            : !isLoading && KYCList?.length > 0
              ?
              <ReusableTable
                columns={columns}
                data={KYCList}
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
              :
              <NoDataFound />
        }

      </Grid>
    </Grid>
  )
}
