import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import jwtInterceptor from "../../helpers/jwtInterceptors";

let axiosConfig = {
 headers: {
  "Authorization": localStorage.getItem("token")
 }
};
export const GetPaymentList = createAsyncThunk('payments/getPaymentList', async (data, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}payments/getPaymentList`, data, axiosConfig)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})


const initialState = {
 isLoading: false,
 isError: false,
 paymentDetails: [],
 appliedFilters: {}
}

const managePayment = createSlice({
 name: "managePayment",
 initialState,
 reducers: {
  ApplyFilters: (state, action) => {
   state.appliedFilters = action.payload
  },
  ClearPaymentFilter: (state, action) => {
   state.appliedFilters = {}
  },
  ManagePaymentIsLoading: (state, action) => {
   state.isLoading = true
  }
 },
 extraReducers: (builder) => {
  builder.addCase(GetPaymentList.fulfilled, (state, action) => {
   state.isLoading = false;
   state.paymentDetails = action.payload
  });
  builder.addCase(GetPaymentList.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });

 },
})
export const { ApplyFilters, ManagePaymentIsLoading, ClearPaymentFilter } = managePayment.actions;

export default managePayment.reducer;