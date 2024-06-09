import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReusableTable from '../../components/SharedComponent/ReusableTable'
import { useDispatch, useSelector } from 'react-redux'
import ReusbaleDialog from '../../components/SharedComponent/ReusableDialog';
import Loader from '../../common/loader';
import Swal from 'sweetalert2';
import CreateBatchModal from '../../components/batch/AddBatch';
import UpdateBatchModal from '../../components/batch/UpdateBatch';
import { GetAllTestimonials, testimonialIsLoading } from '../../redux/slice/testimonials';
import UpdateTestimonials from '../../components/Testimonials/UpdateTestimonial';

const columns = [
  { id: 'testimonialId', label: 'Testimonial Id' },
  { id: "title", label: "Title" },
  { id: "userId", label: "User Id" },
  { id: "message", label: "Message" },
  { id: "testimonialStatus", label: "Status" },
  { id: "available", label: "Available" },
];

export default function Testimonial() {
  const dispatch = useDispatch();
  const TestimonialList = useSelector((state) => state.testimonial.allTestimonials?.testimonialsList);
  const isLoading = useSelector((state) => state.testimonial.isLoading);
  const ListSize = useSelector((state) => state.testimonial.allTestimonials?.size)
  const BatchUpdated = useSelector((state) => state.testimonial.testimonialUpdated)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openUpdateModal, setOPenUpdateModal] = useState(false)
  const [testimonialData, setTestimonialData] = useState({})

  useEffect(() => {
    let payload = {
      "pageNo": page + 1,
      "perPageResults": rowsPerPage
    }
    dispatch(testimonialIsLoading());
    dispatch(GetAllTestimonials(payload)).then((response) => {
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
      dispatch(testimonialIsLoading());
      dispatch(GetAllTestimonials(payload)).then((response) => {
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
    setTestimonialData(rows)
    setOPenUpdateModal(prevState => !prevState)
  }


  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {
          isLoading ?
            <Loader />
            :
            <ReusableTable
              columns={columns}
              data={TestimonialList}
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

      <ReusbaleDialog open={openUpdateModal} close={() => setOPenUpdateModal(prevState => !prevState)}>
        <UpdateTestimonials data={testimonialData} onClose={() => setOPenUpdateModal(prevState => !prevState)} />
      </ReusbaleDialog>
    </Grid>
  )
}
