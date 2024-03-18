import { useForm, Controller } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Container, Grid, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText, Stack } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment';


const schema = yup.object().shape({
  search: yup.string(),
  status: yup.string().oneOf(['ACTIVE', 'IN-ACTIVE', ""]),
  batchNo: yup.string(),
  subscriptionType: yup.string().oneOf(['Annual', 'Half Yearly', 'Quarterly', ""]),
  subscriptionStatus: yup.string().oneOf(['ACTIVE', 'IN-ACTIVE', ""]),
  renewalDue: yup.string().oneOf(['YES', '']),
  subscriptionEndDateFrom: yup.string().nullable()
    .test({
      test: function (startDate) {
        const endDate = this.resolve(yup.ref('subscriptionEndDateTo'));
        if (startDate && endDate) {
          return startDate <= endDate;
        }
        return true;
      },
      message: 'Start date must be before or equal to end date',
    }),
  subscriptionEndDateTo: yup.string().nullable()
    .test({
      test: function (endDate) {
        const startDate = this.resolve(yup.ref('subscriptionEndDateFrom'));
        if (startDate && endDate) {
          return endDate >= startDate;
        }
        return true;
      },
      message: 'End date must be after or equal to start date',
    }),
});

export default function FilterStudents({ onClose, handleFilter }) {
  const dispatch = useDispatch();
  const appliedFilters = useSelector(state => state.students.AppliedFilters);
  const { reset, watch, control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      search: appliedFilters.search,
      status: appliedFilters.status,
      batchNo: appliedFilters.batchNo,
      subscriptionType: appliedFilters.subscriptionType,
      subscriptionStatus: appliedFilters.subscriptionStatus,
      renewalDue: appliedFilters.renewalDue,
      subscriptionEndDateFrom: appliedFilters.subscriptionEndDateFrom && moment(appliedFilters.subscriptionEndDateFrom, 'DD-MM-YYYY').format('YYYY-MM-DD'),
      subscriptionEndDateTo: appliedFilters.subscriptionEndDateTo && moment(appliedFilters.subscriptionEndDateTo, 'DD-MM-YYYY').format('YYYY-MM-DD')
    },
  });

  const ResetFilter = () => {
    reset({
      search: "",
      status: "",
      batchNo: "",
      subscriptionType: "",
      subscriptionStatus: "",
      renewalDue: "",
      subscriptionEndDateFrom: null,
      subscriptionEndDateTo: null
    })
    // onClose()
    setValue('subscriptionEndDateFrom', "");
    setValue('subscriptionEndDateTo', "");
  }

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
        <Typography variant='h5'>Filter Student</Typography>
        <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
      </Box>

      <Grid sx={{ marginTop: '20px' }}>
        <form onSubmit={handleSubmit(handleFilter)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Controller
                name="search"
                control={control}
                render={({ field }) => (
                  <TextField label="Search" {...field} error={!!errors.search} helperText={errors.search?.message} fullWidth />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="batchNo"
                control={control}
                render={({ field }) => (
                  <TextField label="Batch No" {...field} error={!!errors.batchNo} helperText={errors.batchNo?.message} fullWidth />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      {...field}
                      error={!!errors.status}
                      label="Status"
                      value={field.value || ''}  // Explicitly set the value
                    >
                      <MenuItem value="">Select Status</MenuItem>
                      <MenuItem value="ACTIVE">Active</MenuItem>
                      <MenuItem value="IN-ACTIVE">Inactive</MenuItem>
                    </Select>
                    <FormHelperText>{errors.status?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="subscriptionType"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Subscription Type</InputLabel>
                    <Select
                      {...field}
                      value={field.value || ''}  // Explicitly set the value
                      error={!!errors.subscriptionType} label="Subscription Type">
                      <MenuItem value="">Select Subscription Type</MenuItem>
                      <MenuItem value="Annual">Annual</MenuItem>
                      <MenuItem value="Half Yearly">Half Yearly</MenuItem>
                    </Select>
                    <FormHelperText>{errors.subscriptionType?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="subscriptionStatus"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Subscription Status</InputLabel>
                    <Select
                      {...field}
                      value={field.value || ''}  // Explicitly set the value
                      error={!!errors.subscriptionStatus}
                      label="Subscription Status"
                    >
                      <MenuItem value="">Select Subscription Status</MenuItem>
                      <MenuItem value="ACTIVE">Active</MenuItem>
                      <MenuItem value="IN-ACTIVE">Inactive</MenuItem>
                    </Select>
                    <FormHelperText>{errors.subscriptionStatus?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="renewalDue"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Renewal Due</InputLabel>
                    <Select
                      {...field}
                      value={field.value || ''}  // Explicitly set the value
                      error={!!errors.renewalDue} label="Renewal Due">
                      <MenuItem value="">Select Renewal Due</MenuItem>
                      <MenuItem value="YES">Yes</MenuItem>
                    </Select>
                    <FormHelperText>{errors.renewalDue?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="subscriptionEndDateFrom"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Subscription End Date From"
                    type="date"
                    error={!!errors.subscriptionEndDateFrom}
                    helperText={errors.subscriptionEndDateFrom?.message}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="subscriptionEndDateTo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Subscription End Date To"
                    type="date"
                    error={!!errors.subscriptionEndDateTo}
                    helperText={errors.subscriptionEndDateTo?.message}
                    fullWidth
                    disabled={!watch('subscriptionEndDateFrom')}
                    InputLabelProps={{
                      shrink: true,
                    }}

                  />
                )}
              />
            </Grid>


            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={() => ResetFilter()}
                >
                  Reset
                </Button>
                <Button type="submit" variant="contained" color="primary" >
                  Search
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

