import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import jwtInterceptor from "../../helpers/jwtInterceptors";

let axiosConfig = {
 headers: {
  "Authorization": localStorage.getItem("tfstoken")
 }
};
export const GetCustomerQuery = createAsyncThunk('customerQuery/getCustomerQuery', async (data) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}contact-us/getAllQuery`, data, axiosConfig)
  return response.data;

 } catch (error) {
  console.log(error)
 }
})

export const SendResponse = createAsyncThunk('contact-us/sendResponse', async (payload) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}contact-us/sendResponse`, payload, axiosConfig,)
  return response.data;

 } catch (error) {
  console.log(error)
 }
})

const initialState = {
 isLoading: false,
 data: null,
 isError: false,
 appliedFilters: {}
}

const customerQuerySlice = createSlice({
 name: "customerQuery",
 initialState,
 reducers: {
  ApplyFilters: (state, action) => {
   state.appliedFilters = action.payload
  },
  queryIsLoading: (state, action) => {
   state.isLoading = true
  }
 },
 extraReducers: (builder) => {
  builder.addCase(GetCustomerQuery.fulfilled, (state, action) => {
   state.isLoading = false;
   state.data = action.payload;
   state.isLoading = false
  });
  builder.addCase(GetCustomerQuery.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
   state.isLoading = false
  });

  builder.addCase(SendResponse.fulfilled, (state, action) => {
   state.isLoading = false;
  });
  builder.addCase(SendResponse.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  })

 }
})
export const { ApplyFilters,queryIsLoading } = customerQuerySlice.actions;
export default customerQuerySlice.reducer;